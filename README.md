# Sunkanmhy-s-Portfolio
Sunkanmhy's Portfolio

## Form email delivery

Contact, quote, and newsletter forms POST to `/api/send-email`, a serverless
function that sends through the Resend API and forwards every submission to
sunkanmhy@icloud.com.

Deploy on Vercel and set the environment variable:

```
RESEND_API_KEY=your_resend_api_key
```

See `.env.example` for local development.

