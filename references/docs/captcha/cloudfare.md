# How to Add Cloudflare Turnstile to Your Website

## Complete Step-by-Step Guide

### Introduction

In this guide, you'll learn how to protect your website from bots and spam by implementing Cloudflare Turnstile, a privacy-focused CAPTCHA alternative. We'll cover everything from setting up your Cloudflare account to implementing the widget on your website and validating responses.

### Prerequisites

- A Cloudflare account
- A website with Supabase authentication
- Basic knowledge of HTML, CSS, and JavaScript

## Step 1: Create a Cloudflare Turnstile Widget

1. Log into your Cloudflare dashboard at [dash.cloudflare.com](https://dash.cloudflare.com)
2. In the sidebar, scroll down and click on **"Security"**
3. Select **"Turnstile"**
4. Click the **"Add Site"** button
5. Fill out the form:
   - **Name**: Enter a descriptive name (e.g., "My Website Authentication")
   - **Domains**: Add your website domain(s)
   - **Widget Type**: Choose between:
     - Visible (standard CAPTCHA experience)
     - Invisible (runs in background)
     - Non-Interactive (automatically validates without user action)
   - **Widget Mode**: Select between "Always Passes" (for development) or "Managed" (for production)
6. Click **"Create"**
7. You'll receive two important keys:
   - **Site Key**: Used in your frontend code (public)
   - **Secret Key**: Used in your backend validation (private)
8. Copy both keys to a secure location

## Step 2: Add Turnstile to Your HTML Form

1. Open your website's login or registration page HTML
2. Add the Turnstile script before the closing `</body>` tag
3. Add the Turnstile widget inside your form, before the submit button
4. Replace `YOUR_SITE_KEY` with the Site Key from Step 1

## Step 3: Create the Backend Validation Endpoint

On Supabase, go to the side-bar :

1. Authentication > Attack Protection
2. Enable Captcha protection
3. Choose Tunstile by Cloudflare (for [hCAPTCHA](./hcaptcha.md))
4. Enter your *Captcha secret*=`YOUR_SECRET_KEY`

## Step 4: Connect the Frontend JavaScript

1. Create a JavaScript file or add to your existing script: [turnstile.js](./tunstile.js)
2. Modify paths and URLs based on your actual deployment

## Step 5: Style Your Turnstile Widget (Optional)

Add CSS to match your site's design

## Step 6: Test the Integration

1. Load your website and navigate to the form
2. Complete the Turnstile challenge
3. Submit the form
4. Check the browser console for any errors
5. Verify that your validation endpoint is being called
6. Confirm that authentication only proceeds after successful validation

## Step 7: Switch to Production Mode

1. Return to the Cloudflare dashboard
2. Navigate to **"Security"** > **"Turnstile"**
3. Select your widget
4. Change **"Widget Mode"** from "Always Passes" to "Managed"
5. Click **"Save"**

## Step 8: Monitor and Customize

1. View analytics in the Cloudflare dashboard
2. Customize widget appearance with additional data attributes:
   - `data-theme`: "light" or "dark"
   - `data-size`: "normal" or "compact"
   - `data-language`: Two-letter ISO code (e.g., "en", "fr")

## Conclusion

Congratulations! You've successfully integrated Cloudflare Turnstile with your Supabase authentication. Your website is now protected against bots and spam while providing a user-friendly experience.

### Troubleshooting Tips

- If validation fails, check your secret key
- Ensure your domains match between Cloudflare and your deployment
- Test in incognito mode to avoid cache issues
- Check browser console for JavaScript errors
- Verify network requests in developer tools

### Next Steps

- Implement Turnstile on other forms
- Explore additional security measures
- Set up rate limiting for your API endpoints

Remember to subscribe to our channel for more web development tutorials!
