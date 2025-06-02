-- Account Deletion System Database Schema Updates
-- This file contains all the database changes needed for the 30-day account deletion system

-- 1. Add deletion tracking columns to profiles table
ALTER TABLE profiles 
ADD COLUMN deletion_requested_at TIMESTAMPTZ NULL,
ADD COLUMN deletion_scheduled_for TIMESTAMPTZ NULL,
ADD COLUMN deletion_reason TEXT NULL;

-- 2. Create deleted_comments table for soft-deleted comments
CREATE TABLE deleted_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    original_comment_id UUID NOT NULL,
    document_id UUID NOT NULL,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    original_created_at TIMESTAMPTZ NOT NULL,
    deleted_at TIMESTAMPTZ DEFAULT NOW(),
    permanent_deletion_scheduled_for TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 3. Enable RLS on deleted_comments table
ALTER TABLE deleted_comments ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies for deleted_comments
-- Only allow users to see their own deleted comments
CREATE POLICY "Users can view their own deleted comments" ON deleted_comments
    FOR SELECT USING (auth.uid() = user_id);

-- Only allow users to insert their own deleted comments
CREATE POLICY "Users can insert their own deleted comments" ON deleted_comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Create function to schedule account deletion
CREATE OR REPLACE FUNCTION schedule_account_deletion(user_id UUID, reason TEXT DEFAULT NULL)
RETURNS JSON AS $$
DECLARE
    deletion_date TIMESTAMPTZ;
    result JSON;
BEGIN
    -- Calculate deletion date (30 days from now)
    deletion_date := NOW() + INTERVAL '30 days';
    
    -- Update the profile with deletion information
    UPDATE profiles 
    SET 
        deletion_requested_at = NOW(),
        deletion_scheduled_for = deletion_date,
        deletion_reason = COALESCE(reason, 'User requested account deletion')
    WHERE id = user_id;
    
    -- Check if update was successful
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Profile not found for user %', user_id;
    END IF;
    
    -- Return success response
    result := json_build_object(
        'success', true,
        'message', 'Account deletion scheduled successfully',
        'deletion_scheduled_for', deletion_date,
        'days_remaining', 30
    );
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create function to cancel account deletion
CREATE OR REPLACE FUNCTION cancel_account_deletion(user_id UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    -- Remove deletion scheduling from profile
    UPDATE profiles 
    SET 
        deletion_requested_at = NULL,
        deletion_scheduled_for = NULL,
        deletion_reason = NULL
    WHERE id = user_id;
    
    -- Check if update was successful
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Profile not found for user %', user_id;
    END IF;
    
    -- Return success response
    result := json_build_object(
        'success', true,
        'message', 'Account deletion cancelled successfully'
    );
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create function to get account deletion status
CREATE OR REPLACE FUNCTION get_account_deletion_status(user_id UUID)
RETURNS JSON AS $$
DECLARE
    profile_record RECORD;
    days_remaining INTEGER;
    result JSON;
BEGIN
    -- Get profile with deletion information
    SELECT 
        deletion_requested_at,
        deletion_scheduled_for,
        deletion_reason
    INTO profile_record
    FROM profiles 
    WHERE id = user_id;
    
    -- Check if profile exists
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Profile not found for user %', user_id;
    END IF;
    
    -- If no deletion scheduled
    IF profile_record.deletion_scheduled_for IS NULL THEN
        result := json_build_object(
            'deletion_scheduled', false,
            'message', 'No account deletion scheduled'
        );
    ELSE
        -- Calculate days remaining
        days_remaining := EXTRACT(DAY FROM (profile_record.deletion_scheduled_for - NOW()));
        
        result := json_build_object(
            'deletion_scheduled', true,
            'deletion_requested_at', profile_record.deletion_requested_at,
            'deletion_scheduled_for', profile_record.deletion_scheduled_for,
            'deletion_reason', profile_record.deletion_reason,
            'days_remaining', GREATEST(0, days_remaining),
            'hours_remaining', GREATEST(0, EXTRACT(EPOCH FROM (profile_record.deletion_scheduled_for - NOW())) / 3600)
        );
    END IF;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Create function to soft delete comments
CREATE OR REPLACE FUNCTION soft_delete_comment(comment_id UUID, user_id UUID)
RETURNS JSON AS $$
DECLARE
    comment_record RECORD;
    result JSON;
BEGIN
    -- Get the comment to be deleted
    SELECT 
        id,
        document_id,
        user_id as comment_user_id,
        content,
        created_at
    INTO comment_record
    FROM comments 
    WHERE id = comment_id AND user_id = comment_user_id;
    
    -- Check if comment exists and belongs to user
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Comment not found or access denied';
    END IF;
    
    -- Insert into deleted_comments table
    INSERT INTO deleted_comments (
        original_comment_id,
        document_id,
        user_id,
        content,
        original_created_at,
        permanent_deletion_scheduled_for
    ) VALUES (
        comment_record.id,
        comment_record.document_id,
        user_id,
        comment_record.content,
        comment_record.created_at,
        NOW() + INTERVAL '30 days'
    );
    
    -- Delete the original comment
    DELETE FROM comments WHERE id = comment_id;
    
    result := json_build_object(
        'success', true,
        'message', 'Comment deleted successfully. It will be permanently removed in 30 days.'
    );
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Create function to permanently delete expired accounts and comments
CREATE OR REPLACE FUNCTION cleanup_expired_deletions()
RETURNS JSON AS $$
DECLARE
    deleted_accounts INTEGER := 0;
    deleted_comments INTEGER := 0;
    account_record RECORD;
    result JSON;
BEGIN
    -- Delete expired accounts
    FOR account_record IN 
        SELECT id 
        FROM profiles 
        WHERE deletion_scheduled_for IS NOT NULL 
        AND deletion_scheduled_for <= NOW()
    LOOP
        -- Delete user account (this will cascade to related data)
        DELETE FROM auth.users WHERE id = account_record.id;
        deleted_accounts := deleted_accounts + 1;
    END LOOP;
    
    -- Delete expired comments
    DELETE FROM deleted_comments 
    WHERE permanent_deletion_scheduled_for <= NOW();
    
    GET DIAGNOSTICS deleted_comments = ROW_COUNT;
    
    result := json_build_object(
        'success', true,
        'deleted_accounts', deleted_accounts,
        'deleted_comments', deleted_comments,
        'cleanup_date', NOW()
    );
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Create indexes for performance
CREATE INDEX idx_profiles_deletion_scheduled ON profiles(deletion_scheduled_for) 
WHERE deletion_scheduled_for IS NOT NULL;

CREATE INDEX idx_deleted_comments_permanent_deletion ON deleted_comments(permanent_deletion_scheduled_for);

CREATE INDEX idx_deleted_comments_user_id ON deleted_comments(user_id);

-- 11. Grant necessary permissions
GRANT EXECUTE ON FUNCTION schedule_account_deletion(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION cancel_account_deletion(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_account_deletion_status(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION soft_delete_comment(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION cleanup_expired_deletions() TO service_role;

-- 12. Create a scheduled job to run cleanup (this would typically be done via pg_cron or external scheduler)
-- Note: This is a comment as pg_cron setup depends on your Supabase configuration
-- SELECT cron.schedule('cleanup-expired-deletions', '0 2 * * *', 'SELECT cleanup_expired_deletions();');

COMMENT ON FUNCTION schedule_account_deletion IS 'Schedules an account for deletion in 30 days';
COMMENT ON FUNCTION cancel_account_deletion IS 'Cancels a scheduled account deletion';
COMMENT ON FUNCTION get_account_deletion_status IS 'Gets the deletion status of an account';
COMMENT ON FUNCTION soft_delete_comment IS 'Soft deletes a comment with 30-day recovery period';
COMMENT ON FUNCTION cleanup_expired_deletions IS 'Permanently deletes expired accounts and comments'; 