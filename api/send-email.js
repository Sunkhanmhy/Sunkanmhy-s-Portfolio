const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const FORWARD_TO = 'sunkanmhy@icloud.com';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FORM_LABELS = {
  contactForm: 'Contact form submission',
  newsletterForm: 'Newsletter subscription',
  quoteForm: 'Get a quote request'
};

function escapeHtml(value){
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtml(formName, fields){
  const rows = Object.entries(fields)
    .filter(([key]) => !key.startsWith('_'))
    .map(([key, value]) => `<tr><td style="padding:6px 12px;font-weight:600;">${escapeHtml(key)}</td><td style="padding:6px 12px;">${escapeHtml(value)}</td></tr>`)
    .join('');
  return `<h2>${escapeHtml(FORM_LABELS[formName] || 'New portfolio form submission')}</h2><table>${rows}</table>`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Email service is not configured' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const { formName, fields } = body || {};

  if (!fields || typeof fields !== 'object') {
    res.status(400).json({ error: 'Missing form fields' });
    return;
  }
  if (fields._honey) {
    res.status(200).json({ ok: true });
    return;
  }

  const senderEmail = typeof fields.email === 'string' ? fields.email.trim() : '';
  if (senderEmail && !EMAIL_PATTERN.test(senderEmail)) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }

  const subject = FORM_LABELS[formName] || 'New portfolio form submission';

  try {
    const resendRes = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Sunkanmhy Portfolio <onboarding@resend.dev>',
        to: [FORWARD_TO],
        reply_to: senderEmail || undefined,
        subject,
        html: buildHtml(formName, fields)
      })
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      res.status(502).json({ error: 'Email provider rejected the request', detail });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected error sending email' });
  }
};
