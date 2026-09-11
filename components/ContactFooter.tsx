'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

export const socialLinks = [
  { name: 'X', href: 'https://x.com/micocreator', icon: '/social/x.png' },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/zen.zai.948',
    icon: '/social/facebook.png',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joshua-mico-medillen-92bb21401/',
    icon: '/social/linkedin.png',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/medillenmico-cmd',
    icon: '/social/github.png',
  },
];

export function VerticalTextLabel({ text }: { text: string }) {
  return (
    <>
      <span className="vertical-text" aria-hidden="true">
        <span className="vertical-text__track">
          <span>{text}</span>
          <span className="vertical-text__copy--incoming">{text}</span>
        </span>
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}

export function WorkingTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setNow(new Date());
    updateTime();
    const timer = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const formattedTime = now
    ? new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/New_York',
        timeZoneName: 'short',
      }).format(now)
    : '—';

  return (
    <span className="working-time" aria-live="off">
      {formattedTime}
    </span>
  );
}

type ContactFooterProps = {
  id?: string;
  className?: string;
  showHeading?: boolean;
  headingId?: string;
  navSection?: string;
};

export default function ContactFooter({
  id,
  className = '',
  showHeading = true,
  headingId = 'contact-title',
  navSection,
}: ContactFooterProps) {
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      details.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        details.classList.add('is-visible');
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    observer.observe(details);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      className={`contact ${className}`.trim()}
      id={id}
      data-nav={navSection}
      aria-labelledby={showHeading ? headingId : undefined}
    >
      <div className="contact-inner">
        {showHeading ? (
          <div className="contact-stage" data-contact-focus>
            <h2
              id={headingId}
              className="contact-heading reveal-heading"
              data-reveal
              style={{ '--delay': '40ms' } as CSSProperties}
            >
              <span>Start a </span>
              <span className="contact-heading-accent">conversation</span>
              <span> today&nbsp;:)</span>
            </h2>
          </div>
        ) : null}

        <div className="footer-details" data-reveal ref={detailsRef}>
          <div className="footer-row footer-row-primary">
            <div className="footer-detail">
              <p>Email</p>
              <a
                className="footer-link"
                href="mailto:micomedillen1997@gmail.com"
              >
                <VerticalTextLabel text="micomedillen1997@gmail.com" />
              </a>
            </div>
            <div className="footer-detail">
              <p>Get in touch</p>
              <a className="footer-link" href="/contact">
                <VerticalTextLabel text="Message me" />
              </a>
            </div>
            <div className="footer-detail footer-socials">
              <p>Socials</p>
              <div>
                {socialLinks.map((social) => (
                  <a
                    href={social.href}
                    key={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <VerticalTextLabel text={social.name} />
                    <span className="sr-only">, opens in a new tab</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-divider" aria-hidden="true" />

          <div className="footer-row footer-row-secondary">
            <div className="footer-detail">
              <p>Phone</p>
              <a className="footer-link" href="tel:+639633758604">
                <VerticalTextLabel text="+63 963 375 8604" />
              </a>
            </div>
            <div className="footer-detail footer-time">
              <p>Working Time</p>
              <WorkingTime />
            </div>
            <div className="footer-detail footer-copyright">
              <p>Copyright</p>
              <span>© 2026 Mico Medillen. All rights reserved.</span>
            </div>
          </div>
        </div>

        <p className="footer-name" aria-label="Mico Medillen">
          Mico Medillen
        </p>
      </div>
    </footer>
  );
}
