-- Create the support_messages table if it doesn't exist
CREATE TABLE IF NOT EXISTS support_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add Row Level Security (RLS)
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON support_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a function to trigger Discord notification
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

-- Create trigger to automatically send Discord notifications
DROP TRIGGER IF EXISTS support_message_discord_notification ON support_messages;
CREATE TRIGGER support_message_discord_notification
  AFTER INSERT ON support_messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_discord_on_support_message();

-- Note: You may need to enable the http extension if not already enabled
-- CREATE EXTENSION IF NOT EXISTS http; 