# ai-production-partner

## Contact Form

The contact form posts to `/api/contact` and sends email through Resend.

Required production environment variables:

```sh
RESEND_API_KEY=...
CONTACT_TO_EMAIL=amnart.gl@gmail.com
CONTACT_FROM_EMAIL="AI Production Partner <contact@your-verified-domain.com>"
```

`CONTACT_FROM_EMAIL` must use a sender address from a domain verified in Resend. If the API is unavailable, the form shows a pre-filled email fallback so the visitor can still send the same message directly.
