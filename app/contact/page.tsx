'use client';
/* oxlint-disable next/no-img-element -- Small local social assets do not need responsive image handling. */

import { useState, type FormEvent } from 'react';
import ContactFooter, {
  socialLinks,
  VerticalTextLabel,
} from '../../components/ContactFooter';

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formState === 'submitting') return;

    const form = event.currentTarget;
    const data = new FormData(form);

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
        }),
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error('Contact submission was not stored.');
      }

      form.reset();
      setFormState('success');
    } catch {
      setFormState('error');
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

          <div className="form-submit-row">
            <span>And I’m ready to</span>
            <button type="submit" disabled={formState === 'submitting'}>
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
            ) : formState === 'error' ? (
              'Something went wrong while sending your message. Please try again.'
            ) : formState === 'submitting' ? (
              'Sending your project details…'
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
