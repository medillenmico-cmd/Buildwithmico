import type { CSSProperties, ReactNode } from 'react';

type Tool = {
  name: string;
  icon?: string;
  mark?: ReactNode;
};

type ToolGroup = {
  title: string;
  className: string;
  columns: number;
  tools: Tool[];
};

function HighLevelMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 27V12m0 0-3 3m3-3 3 3M16 27V7m0 0-3 3m3-3 3 3M26 27V3m0 0-3 3m3-3 3 3" />
      <path d="M3 27h26" />
    </svg>
  );
}

function ManyChatMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M9 7.5c-3.4 0-6 2.8-6 6.2 0 2.6 1.4 4.8 3.7 5.8L5.8 24l4.1-3.2h2.4c3.4 0 6.1-2.7 6.1-6.1S15.7 7.5 12.3 7.5H9Z" />
      <path d="M18.3 11.2h3.8c3.8 0 6.9 3 6.9 6.7 0 2.7-1.6 5-4 6.1l.8 4-4-3.1h-3.7c-2.6 0-4.9-1.5-6-3.7" />
    </svg>
  );
}

const toolGroups: ToolGroup[] = [
  {
    title: 'Automation',
    className: 'platform-group--automation',
    columns: 3,
    tools: [
      { name: 'n8n', icon: '/tool-icons/n8n.svg' },
      { name: 'Zapier', icon: '/tool-icons/zapier.svg' },
      { name: 'Make', icon: '/tool-icons/make.svg' },
    ],
  },
  {
    title: 'CRM & Funnels',
    className: 'platform-group--crm',
    columns: 1,
    tools: [{ name: 'GoHighLevel', mark: <HighLevelMark /> }],
  },
  {
    title: 'Backend & Data',
    className: 'platform-group--backend',
    columns: 2,
    tools: [
      { name: 'Supabase', icon: '/tool-icons/supabase.svg' },
      { name: 'Google Sheets', icon: '/tool-icons/googlesheets.svg' },
    ],
  },
  {
    title: 'Web & Deployment',
    className: 'platform-group--web',
    columns: 3,
    tools: [
      { name: 'Vercel', icon: '/tool-icons/vercel.svg' },
      { name: 'GitHub', icon: '/tool-icons/github.svg' },
      { name: 'WordPress', icon: '/tool-icons/wordpress.svg' },
    ],
  },
  {
    title: 'Messaging / Forms / Payments',
    className: 'platform-group--messaging',
    columns: 5,
    tools: [
      { name: 'Resend', icon: '/tool-icons/resend.svg' },
      { name: 'Calendly', icon: '/tool-icons/calendly.svg' },
      { name: 'Stripe', icon: '/tool-icons/stripe.svg' },
      { name: 'Typeform', icon: '/tool-icons/typeform.svg' },
      { name: 'ManyChat', mark: <ManyChatMark /> },
    ],
  },
];

export default function PlatformsTools() {
  return (
    <section
      className="platforms-tools content-section"
      id="platforms-tools"
      data-nav="work"
      aria-labelledby="platforms-tools-title"
    >
      <div className="platforms-eyebrow" data-reveal>
        <span aria-hidden="true" />
        <h2 id="platforms-tools-title">Platforms &amp; Tools</h2>
        <span aria-hidden="true" />
      </div>

      <div className="platforms-grid">
        {toolGroups.map((group, groupIndex) => (
          <section
            className={`platform-group ${group.className}`}
            key={group.title}
            data-reveal
            style={{ '--delay': `${70 + groupIndex * 65}ms` } as CSSProperties}
            aria-labelledby={`platform-group-${groupIndex}`}
          >
            <div className="platform-group-heading">
              <h3 id={`platform-group-${groupIndex}`}>{group.title}</h3>
              <span aria-hidden="true" />
            </div>
            <ul
              className="platform-card-grid"
              style={{ '--tool-columns': group.columns } as CSSProperties}
            >
              {group.tools.map((tool) => (
                <li className="platform-card" key={tool.name}>
                  <span className="platform-icon" aria-hidden="true">
                    {tool.icon ? (
                      <span
                        className="platform-icon-image"
                        style={{ backgroundImage: `url(${tool.icon})` }}
                      />
                    ) : (
                      tool.mark
                    )}
                  </span>
                  <span className="platform-name">{tool.name}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="platforms-footer" data-reveal>
        <span className="platforms-divider" aria-hidden="true" />
        <p>
          <span aria-hidden="true" />
          The right tools. A stronger tomorrow.
          <span aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
