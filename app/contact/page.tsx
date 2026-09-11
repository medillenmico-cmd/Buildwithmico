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
  const [draftReady, setDraftReady] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (String(data.get('website') || '').trim()) return;

    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const company = String(data.get('company') || '').trim();
    const projectType = String(data.get('projectType') || '').trim();
    const budget = String(data.get('budget') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent(
      `${projectType || 'Project'} inquiry from ${name}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company / Business: ${company || 'Not provided'}`,
        `Project type: ${projectType}`,
        `Budget: ${budget || 'Not provided'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    );

    setDraftReady(true);
    window.location.href = `mailto:micomedillen1997@gmail.com?subject=${subject}&body=${body}`;
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
            <button type="submit">
              <VerticalTextLabel text="Send Message" />
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          <p className="contact-form-status" aria-live="polite">
            {draftReady
              ? 'Your email draft is ready. Send it from your email app to complete your message.'
              : 'Submitting opens a prefilled email draft in your email app.'}
          </p>
        </form>
      </main>

      <ContactFooter className="contact-page-footer" showHeading={false} />
    </div>
  );
}
