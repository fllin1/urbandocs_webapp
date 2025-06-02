# MWPLU - Contact Form and Donation System Setup

## Overview

This document explains how to complete the setup for the contact form and donation system implemented in your MWPLU project.

## Contact Form Setup

### 1. Create Supabase Table

You need to create a table in your Supabase database to store contact messages:

```sql
CREATE TABLE support_messages (
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
```

### 2. Set Up Discord Integration

#### a) Database Trigger Setup

Run this SQL in your Supabase SQL editor to create automatic Discord notifications:

```sql
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

-- Enable http extension if needed
CREATE EXTENSION IF NOT EXISTS http;
```

#### b) Deploy Discord Edge Functions

```bash
# Deploy the Discord notification function
supabase functions deploy discord-contact-notification

# Deploy the test function (optional)
supabase functions deploy test-discord-webhook
```

#### c) Test Discord Integration

You can test the Discord webhook by calling:

```bash
curl -X POST 'https://ofeyssipibktmbfebibo.supabase.co/functions/v1/test-discord-webhook' \
  -H 'Authorization: Bearer YOUR_ANON_KEY'
```

### 3. Create Edge Function for Email Notifications (Optional)

Create a Supabase Edge Function to send email notifications when a contact form is submitted:

```typescript
// functions/contact-notification/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Add your email service configuration (e.g., SendGrid, Resend, etc.)
const EMAIL_API_KEY = Deno.env.get('EMAIL_API_KEY');
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL');

Deno.serve(async (req: Request) => {
  try {
    const { record } = await req.json();
    
    // Send email notification using your preferred email service
    // Example with fetch to your email service API
    
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
});
```

## Donation System Setup

### 1. Get Stripe Keys

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard:
   - Publishable key (starts with `pk_`)
   - Secret key (starts with `sk_`)

### 2. Update Stripe Configuration

In `src/js/entries/donation.js`, replace the placeholder with your actual Stripe publishable key:

```javascript
const STRIPE_PUBLISHABLE_KEY = 'pk_test_your_actual_key_here'; // Replace this
```

### 3. Set Up Supabase Edge Function

1. Add your Stripe secret key to your Supabase project environment variables:
   - Go to your Supabase project dashboard
   - Navigate to Settings > Edge Functions
   - Add environment variable: `STRIPE_SECRET_KEY` with your Stripe secret key

2. Deploy the edge function:

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy the function
supabase functions deploy create-donation-session
```

### 4. Test the Integration

1. Build your project: `npm run prod`
2. Test the donation form with Stripe's test card numbers:
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits

## Environment Variables Needed

### Supabase Edge Functions
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `EMAIL_API_KEY`: Your email service API key (for contact notifications)
- `ADMIN_EMAIL`: Email address to receive contact form submissions

## Security Notes

1. **Never commit secret keys to version control**
2. Use environment variables for all sensitive data
3. The Stripe publishable key is safe to include in client-side code
4. Supabase RLS policies protect your database from unauthorized access

## Webhook Setup (Optional)

For production, you may want to set up Stripe webhooks to handle post-payment events:

1. In your Stripe Dashboard, go to Webhooks
2. Add endpoint: `https://your-project.supabase.co/functions/v1/stripe-webhook`
3. Select events to listen for (e.g., `payment_intent.succeeded`)
4. Copy the webhook signing secret to your environment variables

## Testing

1. **Contact Form**: Submit a test message and check your Supabase database
2. **Donations**: Use Stripe test cards to verify the payment flow
3. **Success Page**: Ensure users are redirected to `/donation-success` after payment

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure your Supabase edge function includes proper CORS headers
2. **Stripe errors**: Check that your API keys are correct and not mixed up (test vs live)
3. **Build issues**: Run `npm run dev` to check for any JavaScript errors

### Debugging

- Check browser console for client-side errors
- Check Supabase edge function logs for server-side issues
- Verify Stripe webhook delivery in the Stripe Dashboard

## Production Checklist

- [ ] Replace test Stripe keys with live keys
- [ ] Set up proper email service for contact notifications
- [ ] Configure Stripe webhooks for production
- [ ] Test all functionality in production environment
- [ ] Set up monitoring for edge functions
- [ ] Verify success/cancel URLs are correct

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review Supabase function logs
3. Test with Stripe's test environment first
4. Verify all environment variables are set correctly 