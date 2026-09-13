import { createClient } from '@supabase/supabase-js';
import { defineHandler } from 'nitro';
import { Resend } from 'resend';

const MAX_BODY_BYTES = 12_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

type ContactSubmission = {
  name: string;
  email: string;
  company: string | null;
  project_type: string;
  budget: string | null;
  message: string;
};

const json = (body: Record<string, unknown>, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });

const readString = (
  value: unknown,
  maximumLength: number,
  required: boolean,
) => {
  if (value === undefined || value === null) return required ? null : '';
  if (typeof value !== 'string') return null;

  const normalized = value.trim();
  if ((required && !normalized) || normalized.length > maximumLength) {
    return null;
  }

  return normalized;
};

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[character]!,
  );

const normalizeSupabaseUrl = (value: string) =>
  value.replace(/\/rest\/v1\/?$/i, '').replace(/\/$/, '');

const verifyTurnstile = async (token: string, secret: string) => {
  const body = new FormData();
  body.set('secret', secret);
  body.set('response', token);

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    body,
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(`Turnstile verification returned ${response.status}.`);
  }

  return (await response.json()) as {
    success?: boolean;
    action?: string;
    'error-codes'?: string[];
  };
};

const renderField = (label: string, value: string) => `
  <tr>
    <td style="padding:8px 16px 8px 0;color:#777;font-size:13px;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="padding:8px 0;color:#111;font-size:14px;line-height:1.5;">${value}</td>
  </tr>`;

const renderEmail = (
  submission: ContactSubmission,
  submittedAt: string,
) => `<!doctype html>
<html>
  <body style="margin:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;color:#111;">
    <div style="padding:32px 16px;">
      <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
        <div style="padding:24px 28px;background:#080808;color:#fff;">
          <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#c9a44c;">Build With Mico</div>
          <h1 style="margin:10px 0 0;font-size:24px;line-height:1.25;">New project inquiry</h1>
        </div>
        <div style="padding:24px 28px;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            ${renderField('Name', escapeHtml(submission.name))}
            ${renderField('Email', escapeHtml(submission.email))}
            ${renderField('Company', escapeHtml(submission.company || 'Not provided'))}
            ${renderField('Project type', escapeHtml(submission.project_type))}
            ${renderField('Budget', escapeHtml(submission.budget || 'Not provided'))}
            ${renderField('Submitted', escapeHtml(submittedAt))}
          </table>
          <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e8e8e8;">
            <div style="margin-bottom:8px;color:#777;font-size:13px;">Message</div>
            <div style="font-size:15px;line-height:1.65;white-space:pre-wrap;word-break:break-word;">${escapeHtml(submission.message)}</div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`;

export default defineHandler(async (event) => {
  if (!event.req.headers.get('content-type')?.includes('application/json')) {
    return json({ success: false, error: 'Invalid submission.' }, 415);
  }

  let input: Record<string, unknown>;

  try {
    const rawBody = await event.req.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json({ success: false, error: 'Invalid submission.' }, 413);
    }

    const parsed = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return json({ success: false, error: 'Invalid submission.' }, 400);
    }
    input = parsed as Record<string, unknown>;
  } catch {
    return json({ success: false, error: 'Invalid submission.' }, 400);
  }

  if (input.website) {
    return json({ success: true });
  }

  const name = readString(input.name, 100, true);
  const email = readString(input.email, 254, true);
  const company = readString(input.company, 150, false);
  const projectType = readString(input.project_type, 100, true);
  const budget = readString(input.budget, 100, false);
  const message = readString(input.message, 5000, true);
  const turnstileToken = readString(input.turnstileToken, 2048, true);

  if (
    name === null ||
    email === null ||
    !EMAIL_PATTERN.test(email) ||
    company === null ||
    projectType === null ||
    budget === null ||
    message === null ||
    turnstileToken === null
  ) {
    return json({ success: false, error: 'Invalid submission.' }, 400);
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;
  const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;

  if (
    !supabaseUrl ||
    !supabaseSecretKey ||
    !resendApiKey ||
    !contactToEmail ||
    !contactFromEmail ||
    !turnstileSecretKey
  ) {
    console.error('[contact] Required server configuration is missing.');
    return json(
      {
        success: false,
        error:
          'Something went wrong while sending your message. Please try again.',
      },
      500,
    );
  }

  try {
    const verification = await verifyTurnstile(
      turnstileToken,
      turnstileSecretKey,
    );

    if (!verification.success || verification.action !== 'contact_form') {
      console.warn('[contact] Turnstile verification rejected.', {
        codes: verification['error-codes'] || [],
      });
      return json(
        {
          success: false,
          error: 'Please complete the secure verification and try again.',
        },
        400,
      );
    }
  } catch (error) {
    console.error('[contact] Turnstile verification failed.', {
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return json(
      {
        success: false,
        error: 'Secure verification is unavailable. Please try again shortly.',
      },
      503,
    );
  }

  const submission: ContactSubmission = {
    name,
    email,
    company: company || null,
    project_type: projectType,
    budget: budget || null,
    message,
  };

  try {
    const supabase = createClient(
      normalizeSupabaseUrl(supabaseUrl),
      supabaseSecretKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
    const { error } = await supabase
      .schema('public')
      .from('contact_submissions')
      .insert(submission);

    if (error) {
      console.error('[contact] Supabase insert failed.', {
        code: error.code,
        message: error.message,
      });
      return json(
        {
          success: false,
          error:
            'Something went wrong while sending your message. Please try again.',
        },
        500,
      );
    }
  } catch (error) {
    console.error('[contact] Supabase request failed.', {
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return json(
      {
        success: false,
        error:
          'Something went wrong while sending your message. Please try again.',
      },
      500,
    );
  }

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: email,
      subject: `New Build With Mico inquiry — ${projectType}`,
      html: renderEmail(submission, new Date().toISOString()),
    });

    if (error) {
      console.error('[contact] Resend notification failed.', {
        name: error.name,
        message: error.message,
      });
      return json({ success: true, stored: true, emailSent: false });
    }
  } catch (error) {
    console.error('[contact] Resend request failed.', {
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return json({ success: true, stored: true, emailSent: false });
  }

  return json({ success: true, stored: true, emailSent: true });
});
