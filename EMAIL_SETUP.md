# Email Configuration Setup

This document explains how to set up email functionality for the contact form.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Contact Form Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail_address@gmail.com
SMTP_PASS=your_app_password
CONTACT_EMAIL=info.horizonixxinternational@gmail.com
```

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password as `SMTP_PASS`

3. **Configure Environment Variables**:
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USER`: Your Gmail address
   - `SMTP_PASS`: The app password generated above
   - `CONTACT_EMAIL`: The email where inquiries should be sent

## Email Template

When a contact form is submitted, an email will be sent with:

- **Subject**: "New Website Inquiry"
- **Content**: Formatted HTML email with all form fields
- **Reply-To**: Set to the customer's email address

## Testing

1. Fill out the contact form on `/contact`
2. Check that the email is received at the configured `CONTACT_EMAIL`
3. Verify that the reply-to address is set correctly

## Troubleshooting

- **Authentication Error**: Check that 2FA is enabled and app password is correct
- **Connection Error**: Verify SMTP settings and network connectivity
- **Rate Limiting**: The form has built-in rate limiting (5 submissions per hour per IP)