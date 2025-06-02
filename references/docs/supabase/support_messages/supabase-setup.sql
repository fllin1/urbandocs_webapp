-- Complete setup for support messages with Discord integration

-- 1. Create the support_messages table
CREATE TABLE IF NOT EXISTS support_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

-- 3. Create policy to allow anonymous inserts (for contact form)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON support_messages;
CREATE POLICY "Allow anonymous inserts" ON support_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. Enable http extension for webhook calls
CREATE EXTENSION IF NOT EXISTS http;

-- 5. Create function to send Discord notifications
CREATE OR REPLACE FUNCTION notify_discord_on_support_message()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the Discord notification edge function
  PERFORM
    net.http_post(
      url := 'https://ofeyssipibktmbfebibo.supabase.co/functions/v1/discord-contact-notification',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.supabase_service_key', true) || '"}'::jsonb,
      body := json_build_object('record', row_to_json(NEW))::jsonb
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create trigger to automatically send Discord notifications
DROP TRIGGER IF EXISTS support_message_discord_notification ON support_messages;
CREATE TRIGGER support_message_discord_notification
  AFTER INSERT ON support_messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_discord_on_support_message();

-- 7. Test the table structure (optional - you can delete this line after verification)
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'support_messages' 
ORDER BY ordinal_position; 