'use client';
/* oxlint-disable next/no-img-element -- Small local social assets do not need responsive image handling. */

import { useCallback, useState, type FormEvent } from 'react';
import ContactFooter, {
  socialLinks,
  VerticalTextLabel,
} from '../../components/ContactFooter';
import TurnstileWidget from '../../components/TurnstileWidget';

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

const projectOptions = [
  'Website / Funnel',
  'GoHighLevel System',
  'Automation',
  'AI Agent',
  '3D / Motion Website',
  'CRM / Pipeline',
  'Other',
];

const budgetOptions = [
  'Under $500',
  '$500–$1,000',
  '$1,000–$2,500',
  '$2,500+',
  'Not sure yet',
];

export default function ContactPage() {
  const [formState, setFormState] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileState, setTurnstileState] = useState<
    'loading' | 'ready' | 'error' | 'unavailable'
  >(turnstileSiteKey ? 'loading' : 'unavailable');
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
    setTurnstileState('ready');
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
    setTurnstileState('loading');
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
    setTurnstileState('error');
  }, []);

  const resetTurnstile = () => {
    setTurnstileToken(null);
    setTurnstileState(turnstileSiteKey ? 'loading' : 'unavailable');
    setTurnstileResetSignal((current) => current + 1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formState === 'submitting') return;

    if (!turnstileToken) {
      setFormError('Please complete the secure verification and try again.');
      setFormState('error');
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    setFormError(null);
    setFormState('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') || ''),
          email: String(data.get('email') || ''),
          company: String(data.get('company') || ''),
          project_type: String(data.get('projectType') || ''),
          budget: String(data.get('budget') || ''),
          message: String(data.get('message') || ''),
          website: String(data.get('website') || ''),
          turnstileToken,
        }),
      });
      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            'Something went wrong while sending your message. Please try again.',
        );
      }

      form.reset();
      setFormError(null);
      setFormState('success');
      resetTurnstile();
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : 'Something went wrong while sending your message. Please try again.',
      );
      setFormState('error');
      resetTurnstile();
    }
  };

  return (
    <div className="contact-page-shell">
      <a className="skip-link" href="#contact-form">
        Skip to contact form
      </a>

      <nav className="contact-page-nav" aria-label="Contact page navigation">
        <a className="contact-page-brand" href="/">
          Built by Mico
        </a>
        <a className="contact-back-link" href="/">
          <VerticalTextLabel text="Back home" />
          <span aria-hidden="true">↖</span>
        </a>
      </nav>

      <aside className="social-rail" aria-label="Mico's social profiles">
        {socialLinks.map((social) => (
          <a
            href={social.href}
            key={social.name}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.name}, opens in a new tab`}
            title={social.name}
          >
            <img src={social.icon} alt="" width="24" height="24" />
          </a>
        ))}
      </aside>

      <main className="contact-page-main">
        <header className="contact-page-intro">
          <p className="contact-eyebrow">Get in touch</p>
          <h1>
            Tell me what you’re <span>building.</span>
          </h1>
          <p>
            Share the goal, the gap, and where you need the system to take over.
          </p>
        </header>

        <form
          className="editorial-form"
          id="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="form-line">
            <label htmlFor="name">My name is</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </div>

          <div className="form-line">
            <label htmlFor="company">I’m from</label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Company / Business"
              autoComplete="organization"
            />
          </div>

          <div className="form-line">
            <label htmlFor="email">You can reach me at</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-line">
            <label htmlFor="projectType">I need help with</label>
            <select
              id="projectType"
              name="projectType"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select project type
              </option>
              {projectOptions.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-line">
            <label htmlFor="budget">My budget is</label>
            <select id="budget" name="budget" defaultValue="">
              <option value="" disabled>
                Select budget
              </option>
              {budgetOptions.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-line form-line-message">
            <label htmlFor="message">Here’s my message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell me what you’re building…"
              rows={3}
              required
            />
          </div>

          <div className="turnstile-row">
            <TurnstileWidget
              siteKey={turnstileSiteKey}
              resetSignal={turnstileResetSignal}
              onVerify={handleTurnstileVerify}
              onExpire={handleTurnstileExpire}
              onError={handleTurnstileError}
            />
          </div>

          <div className="form-submit-row">
            <span>And I’m ready to</span>
            <button
              type="submit"
              disabled={formState === 'submitting' || !turnstileToken}
            >
              <VerticalTextLabel
                text={
                  formState === 'submitting' ? 'Sending...' : 'Send Message'
                }
              />
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          <p
            className="contact-form-status"
            data-state={formState}
            aria-live="polite"
          >
            {formState === 'success' ? (
              <>
                <strong>Message received.</strong>
                <br />
                Thanks for reaching out. Your project details have been sent
                successfully.
              </>
            ) : turnstileState === 'unavailable' ? (
              'Secure verification is temporarily unavailable. Please try again later.'
            ) : turnstileState === 'error' ? (
              'Secure verification could not complete. Please refresh and try again.'
            ) : formState === 'error' ? (
              formError
            ) : formState === 'submitting' ? (
              'Sending your project details…'
            ) : turnstileState === 'loading' ? (
              'Completing secure verification…'
            ) : (
              'Your project details will be sent securely.'
            )}
          </p>
        </form>
      </main>

      <ContactFooter className="contact-page-footer" showHeading={false} />
    </div>
  );
}
