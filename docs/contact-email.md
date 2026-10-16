# Contact form email delivery

The Contact CTA submits through [FormSubmit](https://formsubmit.co) to `syedasaboohishafia@gmail.com`. No API keys or server environment variables are required.

## After implementation

FormSubmit must confirm you own the inbox **the first time** a real submission is sent.

1. Restart `npm run dev` if it is already running.
2. Open the Contact CTA and send a test message (your email, a subject, and a short message).
3. Check `syedasaboohishafia@gmail.com` (Inbox and Spam) for an email from FormSubmit titled something like **Activate your form**.
4. Open that email and click the confirmation link.
5. Send the form **once more**. You should see `MESSAGE SENT — THANK YOU. I'LL BE IN TOUCH SOON.` and a new message in Gmail.
6. Reply in Gmail — it should go to the visitor because `_replyto` is their address.

Until you click the activation link, FormSubmit will not deliver visitor messages. Activation is only needed once for this recipient address.
