'use client';
/* oxlint-disable next/no-img-element -- Native lazy-loaded images avoid a Vinext client renderer conflict. */
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions -- Pointer movement only drives decorative tilt on linked project cards. */

import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import SiteIntro from '../components/SiteIntro';
import ContactFooter, {
  socialLinks,
  VerticalTextLabel,
} from '../components/ContactFooter';

const pointerFrames = new WeakMap<HTMLElement, number>();

const aboutPhraseGroups = [
  [
    'I design connected lead systems',
    'in GoHighLevel (GHL),',
    'a platform that brings websites,',
    'customer relationship management (CRM),',
    'automation, and booking into one place.',
  ],
  [
    'That starts with the page people see—',
    'and continues through the steps they do not:',
    'qualification, tagging, and routing,',
    'follow-up and pipeline tracking,',
    'and the path to a booked call.',
  ],
  [
    'I work with service businesses',
    'that want one clear operating flow',
    'instead of disconnected tools',
    'and manual handoffs.',
  ],
];

const aboutStatement = aboutPhraseGroups.flat().join(' ');

const metrics = [
  {
    value: 10,
    label: 'Full-System Funnels',
    copy: 'Built to connect the page, lead capture, follow-up, and booking path.',
    icon: 'FLOW',
  },
  {
    value: 15,
    label: 'Automations & AI Agents',
    copy: 'Designed to route, nurture, respond, and keep the next action visible.',
    icon: 'AI',
  },
  {
    value: 1,
    label: 'Years of Overall Experience',
    copy: 'Hands-on work across websites, funnels, CRM setup, automation, and lead journeys.',
    icon: 'EXP',
  },
];

const stages = [
  {
    title: 'Capture',
    copy: 'A focused page or form collects the details needed for the next step.',
    capability: 'Websites & Funnels',
    capabilityCopy: 'One audience, one message, and one clear action.',
  },
  {
    title: 'Qualify',
    copy: 'Fields, tags, and rules sort the lead by fit, intent, or request.',
    capability: 'AI Agents',
    capabilityCopy:
      'Useful answers and qualification when the workflow calls for them.',
  },
  {
    title: 'Follow Up',
    copy: 'Email, SMS, and automated tasks keep the conversation moving.',
    capability: 'Automations',
    capabilityCopy: 'Triggers, reminders, and internal alerts.',
  },
  {
    title: 'Track',
    copy: 'Pipeline stages and activity history show what happened and who acts next.',
    capability: 'CRM & Pipelines',
    capabilityCopy: 'Visible stages, ownership, routing, and lead history.',
  },
  {
    title: 'Book',
    copy: 'Calendar routing, confirmations, and reminders create a direct path to the call.',
    capability: 'Booking Systems',
    capabilityCopy: 'Scheduling, confirmations, and reminders.',
  },
];

type ServiceIconName =
  | 'website'
  | 'funnel'
  | 'automation'
  | 'pipeline'
  | 'calendar'
  | 'system';

const services: Array<{
  title: string;
  copy: string;
  icon: ServiceIconName;
}> = [
  {
    title: 'GoHighLevel Websites',
    copy: 'Responsive, conversion-focused websites built inside GoHighLevel to present your offer clearly and guide visitors toward action.',
    icon: 'website',
  },
  {
    title: 'Sales Funnels',
    copy: 'Landing pages and funnel journeys shaped around one audience, one offer, and one clear conversion goal.',
    icon: 'funnel',
  },
  {
    title: 'AI Automations',
    copy: 'AI-assisted replies, lead follow-ups, reminders, and workflows that reduce manual chasing and keep conversations moving.',
    icon: 'automation',
  },
  {
    title: 'CRM Pipeline Setup',
    copy: 'Organized stages, tags, routing, and lead records that make every opportunity and next action easier to track.',
    icon: 'pipeline',
  },
  {
    title: 'Calendar Booking',
    copy: 'Scheduling flows with routing, confirmations, and reminders that give qualified leads a direct path to a call.',
    icon: 'calendar',
  },
  {
    title: 'Full GoHighLevel System Setup',
    copy: 'A connected build combining your website, funnel, automation, CRM pipeline, and calendar into one operating system.',
    icon: 'system',
  },
];

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl: string;
  automationUrl?: string;
  image: string;
  video?: string;
  width: number;
  height: number;
};

const projects: Project[] = [
  {
    title: 'Helivanta Energy Solar Savings Funnel',
    category: 'GoHighLevel Solar Savings Funnel',
    description:
      'A solar savings funnel that captures bill details, educates homeowners, and guides qualified leads toward a consultation.',
    tags: [
      'GoHighLevel',
      'Savings Calculator',
      'Lead Qualification',
      'Booking',
    ],
    liveUrl:
      'https://sites.leadconnectorhq.com/preview/i7fFGURl5B1NConqQ6qa?notrack=true',
    automationUrl:
      'https://drive.google.com/drive/folders/1uqOfU8LQLuCz7xueRlBbNM53GKlTAI6A',
    image: '/project-helivanta.png',
    video: '/helivanta-walkthrough.mp4',
    width: 606,
    height: 475,
  },
  {
    title: 'Luminara Dental Appointment Funnel',
    category: 'GoHighLevel Dental Landing Page & Booking Experience',
    description:
      'A dental consultation funnel that builds trust, answers patient concerns, and guides visitors toward an appointment.',
    tags: [
      'GoHighLevel',
      'Dental Funnel',
      'Responsive Design',
      'Appointment Journey',
    ],
    liveUrl: 'https://sites.leadconnectorhq.com/preview/LMHNdzHdP8GnYTpBwwy9',
    automationUrl:
      'https://drive.google.com/drive/folders/1BOODmM7bRGlNSUW00-E2K8iK68Y830dn',
    image: '/project-dental.png',
    video: '/project-luminara.mp4',
    width: 809,
    height: 530,
  },
  {
    title: 'BestForm Method',
    category: 'GoHighLevel Fitness Lead Magnet Funnel',
    description:
      'A 7-day home workout guide funnel that captures busy Filipino men and routes them toward an online consultation.',
    tags: [
      'GoHighLevel',
      'Lead Magnet',
      'Conversion Copy',
      'Consultation Path',
    ],
    liveUrl: 'https://sites.leadconnectorhq.com/preview/HbrhsbY14xzoXwhiF6pY',
    image: '/project-fitness.png',
    video: '/project-bestform.mp4',
    width: 676,
    height: 480,
  },
  {
    title: 'Real Estate Buyer Lead Funnel',
    category: 'Buyer Qualification Funnel',
    description:
      'A responsive buyer funnel that captures budget, location, property type, and timeline before the CRM handoff.',
    tags: [
      'Funnel Strategy',
      'Lead Qualification',
      'Responsive Build',
      'CRM Handoff',
    ],
    liveUrl: 'https://preview-1778861583501295042.vibepreview.com/',
    image: '/project-real-estate.avif',
    width: 1200,
    height: 800,
  },
  {
    title: 'Ecommerce Product Offer Page',
    category: 'Conversion-Focused Offer Page',
    description:
      'A product page structured around education, benefits, trust, and one primary purchase action.',
    tags: ['Offer Strategy', 'UI/UX', 'Responsive Build', 'CRO'],
    liveUrl: 'https://preview-1778867556934363050.vibepreview.com/',
    image: '/project-ecommerce.png',
    width: 503,
    height: 329,
  },
];

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    manuallyPaused.current = reducedMotion.matches;

    const play = () => {
      void video
        .play()
        .then(() => setIsPaused(false))
        .catch(() => setIsPaused(true));
    };

    if (reducedMotion.matches) {
      video.pause();
      setIsPaused(true);
      const holdFirstFrame = () => {
        video.currentTime = Math.min(0.04, video.duration || 0.04);
      };
      if (video.readyState >= 1) holdFirstFrame();
      else
        video.addEventListener('loadedmetadata', holdFirstFrame, {
          once: true,
        });
    } else {
      play();
    }

    const syncPlayback = (isVisible = true) => {
      if (document.hidden || !isVisible) {
        video.pause();
        setIsPaused(true);
      } else if (!manuallyPaused.current) {
        play();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => syncPlayback(entry.isIntersecting),
      { threshold: 0.08 },
    );
    const onVisibilityChange = () =>
      syncPlayback(
        video.getBoundingClientRect().bottom > 0 &&
          video.getBoundingClientRect().top < window.innerHeight,
      );
    observer.observe(video);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      manuallyPaused.current = false;
      void video
        .play()
        .then(() => setIsPaused(false))
        .catch(() => setIsPaused(true));
    } else {
      manuallyPaused.current = true;
      video.pause();
      setIsPaused(true);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className="hero-video"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/hero-robot-premium.mp4" type="video/mp4" />
      </video>
      <button
        className="motion-toggle"
        type="button"
        onClick={togglePlayback}
        aria-label={
          isPaused ? 'Play background motion' : 'Pause background motion'
        }
        aria-pressed={!isPaused}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          {isPaused ? (
            <path d="M5 3.25 12 8l-7 4.75z" />
          ) : (
            <path d="M4.5 3.25h2.25v9.5H4.5zm4.75 0h2.25v9.5H9.25z" />
          )}
        </svg>
        <span>{isPaused ? 'Play motion' : 'Pause motion'}</span>
      </button>
    </>
  );
}

function ProjectVideo({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const manuallyPaused = useRef(false);
  const isInViewport = useRef(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    manuallyPaused.current = reducedMotion.matches;

    const play = () => {
      if (manuallyPaused.current || document.hidden) return;
      void video.play().catch(() => setIsPaused(true));
    };

    if (reducedMotion.matches) video.pause();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewport.current = entry.isIntersecting;
        if (!entry.isIntersecting || document.hidden) {
          video.pause();
          return;
        }
        play();
      },
      { threshold: 0.55 },
    );

    const onVisibilityChange = () => {
      if (document.hidden || !isInViewport.current) video.pause();
      else play();
    };

    observer.observe(video);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      manuallyPaused.current = false;
      void video.play().catch(() => setIsPaused(true));
    } else {
      manuallyPaused.current = true;
      video.pause();
    }
  };

  return (
    <div className="project-video-shell">
      <video
        ref={videoRef}
        className="project-video"
        muted
        loop
        playsInline
        preload="metadata"
        poster={project.image}
        aria-label={`${project.title} website walkthrough`}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          if (progressRef.current) {
            const progress = video.duration
              ? video.currentTime / video.duration
              : 0;
            progressRef.current.style.transform = `scaleX(${progress})`;
          }
        }}
      >
        <source src={project.video} type="video/mp4" />
      </video>
      <span className="corner corner-tl" aria-hidden="true" />
      <span className="corner corner-br" aria-hidden="true" />
      <div className="project-video-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
      <button
        className="project-video-toggle"
        type="button"
        onClick={togglePlayback}
        aria-label={`${isPaused ? 'Play' : 'Pause'} ${project.title} project video`}
        aria-pressed={!isPaused}
      >
        <svg viewBox="0 0 18 18" aria-hidden="true">
          {isPaused ? (
            <path d="M6 4.25 13 9l-7 4.75z" />
          ) : (
            <path d="M5.25 4.25h2.5v9.5h-2.5zm5 0h2.5v9.5h-2.5z" />
          )}
        </svg>
      </button>
    </div>
  );
}

function MetricGrid() {
  const [counts, setCounts] = useState([0, 0, 0]);
  const gridRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCounts(metrics.map((metric) => metric.value));
      return;
    }

    const grid = gridRef.current;
    if (!grid) return;
    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || counted.current) return;
        counted.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1000, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCounts(metrics.map((metric) => Math.round(metric.value * eased)));
          if (progress < 1) animationFrame = requestAnimationFrame(tick);
        };
        animationFrame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(grid);
    return () => {
      observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="metric-grid" ref={gridRef}>
      {metrics.map((metric, index) => (
        <article
          className="metric-card"
          key={metric.label}
          data-reveal
          style={{ '--delay': `${index * 90}ms` } as CSSProperties}
        >
          <div className="metric-value" aria-hidden="true">
            {counts[index]}
            <span>+</span>
          </div>
          <h3>
            <span className="sr-only">{metric.value}+ </span>
            {metric.label}
          </h3>
          <p>{metric.copy}</p>
        </article>
      ))}
    </div>
  );
}

function FinalCtaVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isNearViewport = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let hasLoaded = false;

    const syncPlayback = () => {
      if (reducedMotion.matches || document.hidden || !isNearViewport.current) {
        video.pause();
        return;
      }

      if (!hasLoaded) {
        hasLoaded = true;
        video.load();
      }
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport.current = entry.isIntersecting;
        syncPlayback();
      },
      { rootMargin: '240px 0px', threshold: 0 },
    );

    const onVisibilityChange = () => syncPlayback();
    const onMotionPreferenceChange = () => syncPlayback();

    observer.observe(video);
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', onMotionPreferenceChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionPreferenceChange);
      video.pause();
    };
  }, []);

  return (
    <>
      <p className="sr-only">
        A connected lead journey from lead generation to website capture, CRM
        automation, AI qualification, booking, and client conversion.
      </p>
      <video
        ref={videoRef}
        className="final-cta-video"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/cta-motion-graphics.mp4" type="video/mp4" />
      </video>
    </>
  );
}

function AboutSpotlightText() {
  return (
    <p className="about-spotlight" aria-label={aboutStatement}>
      {aboutPhraseGroups.map((phrases, sentenceIndex) => (
        <span
          className="spotlight-sentence"
          aria-hidden="true"
          key={`sentence-${sentenceIndex}`}
        >
          {phrases.map((phrase, phraseIndex) => (
            <span
              className="spotlight-phrase"
              key={`${sentenceIndex}-${phraseIndex}`}
            >
              {phrase}{' '}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}

function ServiceIcon({ name }: { name: ServiceIconName }) {
  const paths: Record<ServiceIconName, ReactNode> = {
    website: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 8h18M7 6h.01M10 6h.01M7 12h10M7 16h7" />
      </>
    ),
    funnel: <path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z" />,
    automation: (
      <>
        <path d="m12 3 1.1 3.1L16 7.2l-2.9 1.1L12 11.5l-1.1-3.2L8 7.2l2.9-1.1L12 3Z" />
        <path d="M5 13v3a3 3 0 0 0 3 3h2M19 11v-1a3 3 0 0 0-3-3" />
        <path d="m7 11-2 2-2-2M17 13l2-2 2 2" />
      </>
    ),
    pipeline: (
      <>
        <rect x="3" y="5" width="5" height="5" rx="1" />
        <rect x="16" y="14" width="5" height="5" rx="1" />
        <path d="M8 7.5h5a3 3 0 0 1 3 3v3.5M12 5v5M9.5 7.5 12 10l2.5-2.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18m-13 5 2.5 2.5L16 12" />
      </>
    ),
    system: (
      <>
        <rect x="9" y="3" width="6" height="5" rx="1" />
        <rect x="3" y="16" width="6" height="5" rx="1" />
        <rect x="15" y="16" width="6" height="5" rx="1" />
        <path d="M12 8v4M6 16v-2h12v2" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function AnimatedSectionHeading({
  id,
  text,
  accentWords = [],
  lineBreakAfterWords = [],
  className = 'display-heading',
}: {
  id: string;
  text: string;
  accentWords?: string[];
  lineBreakAfterWords?: number[];
  className?: string;
}) {
  const accents = new Set(accentWords.map((word) => word.toLowerCase()));
  const lineBreaks = new Set(lineBreakAfterWords);
  let characterOffset = 0;

  return (
    <h2
      id={id}
      className={`${className} reveal-heading animated-heading`}
      data-reveal
      aria-label={text}
    >
      {text.split(/\s+/).map((word, wordIndex) => {
        const characters = Array.from(word);
        const wordOffset = characterOffset;
        characterOffset += characters.length + 1;
        const accented = accents.has(word.toLowerCase());

        return (
          <Fragment key={`${word}-${wordIndex}`}>
            <span className="heading-word-group" aria-hidden="true">
              {characters.map((character, characterIndex) => (
                <span
                  className="heading-character-mask"
                  key={`${character}-${characterIndex}`}
                >
                  <span
                    className={`heading-character${accented ? ' heading-character-accent' : ''}`}
                    style={
                      {
                        '--character-delay': `${Math.min((wordOffset + characterIndex) * 28, 980)}ms`,
                      } as CSSProperties
                    }
                  >
                    {character}
                  </span>
                </span>
              ))}
            </span>
            {lineBreaks.has(wordIndex + 1) ? <br aria-hidden="true" /> : null}
          </Fragment>
        );
      })}
    </h2>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState('home');
  const [introRevealing, setIntroRevealing] = useState(false);
  const [showFullName, setShowFullName] = useState(false);
  const brandClickCountRef = useRef(0);
  const projectTrackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${window.location.search}`,
      );
    }

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const resetFrame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => window.cancelAnimationFrame(resetFrame);
  }, []);

  const handleBrandClick = () => {
    brandClickCountRef.current += 1;

    if (brandClickCountRef.current === 3) {
      brandClickCountRef.current = 0;
      setShowFullName(false);
      document.getElementById('home')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      });
      window.history.replaceState(null, '', '#home');
      return;
    }

    setShowFullName((current) => !current);
  };

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (reduced) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const repeatableItems = document.querySelectorAll<HTMLElement>(
      '.animated-heading[data-reveal], .reveal-copy[data-reveal]',
    );
    const oneTimeItems = Array.from(revealItems).filter(
      (item) => !item.matches('.animated-heading, .reveal-copy'),
    );

    const oneTimeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            oneTimeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );

    const repeatableObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            item.classList.add('is-visible');
            return;
          }

          item.classList.remove('is-visible');
          item.dataset.revealFrom =
            entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0)
              ? 'above'
              : 'below';
        });
      },
      { threshold: 0.12, rootMargin: '-2% 0px -9% 0px' },
    );

    oneTimeItems.forEach((item) => oneTimeObserver.observe(item));
    repeatableItems.forEach((item) => repeatableObserver.observe(item));

    return () => {
      oneTimeObserver.disconnect();
      repeatableObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const navTargets = document.querySelectorAll<HTMLElement>('[data-nav]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible)
          setActiveNav((visible.target as HTMLElement).dataset.nav || 'about');
      },
      { threshold: [0.12, 0.3, 0.55], rootMargin: '-12% 0px -55% 0px' },
    );
    navTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const system = document.querySelector<HTMLElement>('#system');
    const spotlight = document.querySelector<HTMLElement>('.about-spotlight');
    const spotlightPhrases = spotlight
      ? Array.from(spotlight.querySelectorAll<HTMLElement>('.spotlight-phrase'))
      : [];
    const contact = document.querySelector<HTMLElement>('#contact');
    const recedingTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '#main-content > section:not(#final-cta)',
      ),
    );
    let spotlightStart = 0;
    let spotlightRange = 1;
    let frame = 0;

    const measureSpotlight = () => {
      if (!spotlight) return;
      const containerRect = spotlight.getBoundingClientRect();
      const documentTop = window.scrollY + containerRect.top;
      spotlightStart = documentTop - window.innerHeight * 0.78;
      spotlightRange = Math.max(
        containerRect.height + window.innerHeight * 0.42,
        1,
      );
    };

    const update = () => {
      frame = 0;
      if (system) {
        const rect = system.getBoundingClientRect();
        const progress = Math.min(
          Math.max(
            (window.innerHeight * 0.72 - rect.top) /
              Math.max(rect.height * 0.84, 1),
            0,
          ),
          1,
        );
        system.style.setProperty('--system-progress', `${progress * 100}%`);
        const cards = system.querySelectorAll<HTMLElement>('.system-card');
        cards.forEach((card, index) => {
          const start = index / cards.length;
          const end = (index + 1) / cards.length;
          card.classList.toggle(
            'is-active',
            progress >= start && progress < end,
          );
          card.classList.toggle('is-complete', progress >= end);
        });
      }
      if (spotlightPhrases.length) {
        const progress = Math.min(
          Math.max((window.scrollY - spotlightStart) / spotlightRange, 0),
          1,
        );
        const activeIndex = Math.min(
          Math.floor(progress * spotlightPhrases.length),
          spotlightPhrases.length - 1,
        );

        spotlightPhrases.forEach((phrase, index) => {
          phrase.classList.toggle('is-active', index === activeIndex);
          phrase.classList.toggle('is-past', index < activeIndex);
        });
      }
      if (contact && recedingTargets.length) {
        const contactRect = contact.getBoundingClientRect();
        const compactViewport = window.innerWidth <= 820;
        const focusStart = window.innerHeight * (compactViewport ? 0.68 : 0.92);
        const progress = Math.min(
          Math.max(
            (focusStart - contactRect.top) /
              Math.max(window.innerHeight * 0.5, 1),
            0,
          ),
          1,
        );
        const blur = progress * (compactViewport ? 1.6 : 4.5);
        const opacity = 1 - progress * (compactViewport ? 0.78 : 0.84);
        recedingTargets.forEach((target) => {
          target.style.opacity = `${opacity}`;
          target.style.filter = `blur(${blur}px)`;
          target.style.transform = `translate3d(0, ${progress * -6}px, 0)`;
        });
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    measureSpotlight();
    update();
    document.fonts?.ready.then(() => {
      measureSpotlight();
      onScroll();
    });
    const onResize = () => {
      measureSpotlight();
      onScroll();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (frame) cancelAnimationFrame(frame);
      recedingTargets.forEach((target) => {
        target.style.removeProperty('opacity');
        target.style.removeProperty('filter');
        target.style.removeProperty('transform');
      });
    };
  }, []);

  const tilt = (event: ReactMouseEvent<HTMLElement>) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches)
      return;
    const card = event.currentTarget;
    const clientX = event.clientX;
    const clientY = event.clientY;
    const previousFrame = pointerFrames.get(card);
    if (previousFrame) cancelAnimationFrame(previousFrame);
    pointerFrames.set(
      card,
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width;
        const y = (clientY - rect.top) / rect.height;
        card.style.setProperty('--rx', `${(0.5 - y) * 2.8}deg`);
        card.style.setProperty('--ry', `${(x - 0.5) * 2.8}deg`);
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
        pointerFrames.delete(card);
      }),
    );
  };

  const untilt = (event: ReactMouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const previousFrame = pointerFrames.get(card);
    if (previousFrame) cancelAnimationFrame(previousFrame);
    pointerFrames.delete(card);
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  const scrollProjects = (direction: -1 | 1) => {
    const track = projectTrackRef.current;
    if (!track) return;
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>('.project-card'),
    );
    if (!cards.length) return;
    const trackLeft = track.getBoundingClientRect().left;
    const positions = cards.map(
      (card) =>
        card.getBoundingClientRect().left - trackLeft + track.scrollLeft,
    );
    const currentIndex = positions.reduce(
      (closest, position, index) =>
        Math.abs(position - track.scrollLeft) <
        Math.abs(positions[closest] - track.scrollLeft)
          ? index
          : closest,
      0,
    );
    const nextIndex = Math.min(
      cards.length - 1,
      Math.max(0, currentIndex + direction),
    );
    track.scrollTo({
      left: positions[nextIndex],
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };

  return (
    <>
      <SiteIntro onReveal={() => setIntroRevealing(true)} />
      <div
        className={`site-shell ${introRevealing ? 'intro-revealing' : 'intro-pending'}`}
      >
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <button
            className="brand-name-toggle"
            type="button"
            onClick={handleBrandClick}
            aria-pressed={showFullName}
            aria-label="Toggle name; every third activation returns to home"
          >
            <span aria-live="polite">
              {showFullName ? 'Joshua Mico Medillen' : 'Built by Mico'}
            </span>
          </button>
          <div className="nav-links">
            {[
              ['about', 'About'],
              ['work', 'Work'],
              ['contact', 'Contact'],
            ].map(([id, label]) => (
              <a
                key={id}
                className={activeNav === id ? 'is-active' : ''}
                href={`#${id}`}
                aria-current={activeNav === id ? 'location' : undefined}
              >
                <VerticalTextLabel text={label} />
              </a>
            ))}
          </div>
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

        <main id="main-content" tabIndex={-1}>
          <section
            className="hero"
            id="home"
            data-nav="home"
            aria-labelledby="hero-title"
          >
            <div className="hero-stage">
              <HeroVideo />
              <div className="hero-shade" aria-hidden="true" />
              <div className="hero-copy">
                <div className="title-mask">
                  <h1 id="hero-title">
                    From First Click to <span>Booked Call</span>
                  </h1>
                </div>
                <p className="hero-description">
                  I build the website, funnel, CRM, and automations behind one
                  connected lead journey—so every inquiry has a clear next step.
                </p>
                <a className="hero-cta" href="#work">
                  <VerticalTextLabel text="View my work" />
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3.25 8h8.5M8.5 4.75 11.75 8 8.5 11.25" />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          <section
            className="about content-section"
            id="about"
            data-nav="about"
            aria-labelledby="about-title"
          >
            <div className="about-layout">
              <figure className="portrait-frame" data-reveal>
                <div className="portrait-grid" aria-hidden="true" />
                <img
                  src="/mico-portrait.png"
                  alt="Mico, GoHighLevel systems builder"
                  width="960"
                  height="1280"
                  sizes="(max-width: 820px) calc(100vw - 48px), min(42vw, 620px)"
                  loading="lazy"
                  decoding="async"
                />
                <span className="portrait-index" aria-hidden="true">
                  1+ Years of Overall Experience
                </span>
                <span
                  className="portrait-corner portrait-corner-a"
                  aria-hidden="true"
                />
                <span
                  className="portrait-corner portrait-corner-b"
                  aria-hidden="true"
                />
              </figure>
              <div className="about-content">
                <AnimatedSectionHeading
                  id="about-title"
                  text="I'm Mico. I build what happens after the click."
                  accentWords={['after', 'the', 'click.']}
                />
                <div className="about-copy">
                  <AboutSpotlightText />
                </div>
              </div>
            </div>
          </section>

          <section
            className="system content-section"
            id="system"
            data-nav="about"
            aria-labelledby="system-title"
          >
            <div className="system-heading">
              <AnimatedSectionHeading
                id="system-title"
                text="One journey. Every step connected."
                accentWords={['connected.']}
              />
              <p className="section-description reveal-copy" data-reveal>
                Each stage receives the context collected before it, so leads
                move forward without manual handoffs or repeated questions.
              </p>
            </div>
            <div className="journey-console" data-reveal>
              <div className="journey-intro">
                <h3>Five stages. One operating flow.</h3>
                <p>Capture → Qualify → Follow Up → Track → Book</p>
              </div>
              <div className="system-path">
                <div className="path-track" aria-hidden="true">
                  <span />
                </div>
                {stages.map((stage, index) => (
                  <article
                    className="system-card"
                    key={stage.title}
                    style={{ '--stage': index } as CSSProperties}
                  >
                    <div className="stage-copy">
                      <h3>{stage.title}</h3>
                      <p>{stage.copy}</p>
                    </div>
                    <div className="stage-capability">
                      <strong>{stage.capability}</strong>
                      <span>{stage.capabilityCopy}</span>
                    </div>
                  </article>
                ))}
              </div>
              <div className="full-system-capability">
                <h3>Full GoHighLevel Systems</h3>
                <p>
                  The page, customer relationship management (CRM), automation,
                  AI agents, and booking flow are planned as one build.
                </p>
              </div>
            </div>
          </section>

          <section
            className="work content-section"
            id="work"
            data-nav="work"
            aria-labelledby="work-title"
          >
            <div className="section-heading-row work-heading">
              <div>
                <AnimatedSectionHeading
                  id="work-title"
                  text="Real builds. Visible proof."
                  accentWords={['proof.']}
                />
              </div>
              <p className="section-description reveal-copy" data-reveal>
                Browse live funnels and landing pages built around a specific
                offer, audience, and next action.
              </p>
            </div>
            <div className="project-track-header" data-reveal>
              <p id="project-track-help">
                <span className="project-instruction-desktop">
                  Scroll or use the arrow buttons to browse projects.
                </span>
                <span className="project-instruction-mobile">
                  Swipe to browse projects. The next card stays in view.
                </span>
              </p>
              <div
                className="project-track-controls"
                aria-label="Project navigation"
              >
                <button
                  type="button"
                  onClick={() => scrollProjects(-1)}
                  aria-label="Show previous project"
                >
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="m12.5 4.5-5.5 5.5 5.5 5.5M7.5 10H17" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollProjects(1)}
                  aria-label="Show next project"
                >
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="m7.5 4.5 5.5 5.5-5.5 5.5M12.5 10H3" />
                  </svg>
                </button>
              </div>
            </div>
            <section
              className="project-track"
              ref={projectTrackRef}
              aria-label="Project showcase"
              aria-describedby="project-track-help"
              data-reveal
            >
              {projects.map((project, index) => {
                const hasVideo = Boolean(project.video);
                const media = (
                  <div className="project-media">
                    <span className="corner corner-tl" aria-hidden="true" />
                    <span className="corner corner-br" aria-hidden="true" />
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      width={project.width}
                      height={project.height}
                      sizes="(max-width: 820px) calc(100vw - 64px), min(54vw, 650px)"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <span className="view-label">
                      Open live preview
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M5 11 11 5M6 5h5v5" />
                      </svg>
                    </span>
                  </div>
                );
                return (
                  <article
                    className={`project-card tilt-card${hasVideo ? ' project-card-video' : ''}`}
                    key={project.title}
                    onMouseMove={tilt}
                    onMouseLeave={untilt}
                    style={
                      {
                        '--delay': `${Math.min(index, 3) * 80}ms`,
                      } as CSSProperties
                    }
                  >
                    {hasVideo ? (
                      <ProjectVideo project={project} />
                    ) : (
                      <a
                        className="project-media-link"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open the live preview for ${project.title} in a new tab`}
                      >
                        {media}
                      </a>
                    )}
                    <div className="project-case-body">
                      <p className="project-category">{project.category}</p>
                      <h3>{project.title}</h3>
                      <p className="project-description">
                        {project.description}
                      </p>
                      <ul
                        className="project-tags"
                        aria-label={`Scope for ${project.title}`}
                      >
                        {project.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      <div className="project-actions">
                        <a
                          className="project-action project-action-primary"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <VerticalTextLabel text="View live site" />
                          <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M5 11 11 5M6 5h5v5" />
                          </svg>
                          <span className="sr-only">Opens in a new tab.</span>
                        </a>
                        {project.automationUrl && (
                          <a
                            className="project-action project-action-secondary"
                            href={project.automationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <VerticalTextLabel text="View automation" />
                            <svg viewBox="0 0 16 16" aria-hidden="true">
                              <path d="M5 11 11 5M6 5h5v5" />
                            </svg>
                            <span className="sr-only">Opens in a new tab.</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
            <div className="work-cta" data-reveal>
              <p>Have a funnel, CRM, or follow-up gap to fix?</p>
              <a href="/contact">
                <VerticalTextLabel text="Tell me about your system" />
                <span aria-hidden="true">↘</span>
              </a>
            </div>
          </section>

          <section
            className="services content-section"
            id="services"
            data-nav="work"
            aria-labelledby="services-title"
          >
            <div className="section-heading-row">
              <div>
                <AnimatedSectionHeading
                  id="services-title"
                  text="Services I offer."
                  accentWords={['offer.']}
                />
              </div>
              <p className="section-description reveal-copy" data-reveal>
                Focused GoHighLevel builds that connect the experience people
                see with the follow-up, tracking, and booking system behind it.
              </p>
            </div>
            <div className="services-grid">
              {services.map((service, index) => (
                <article
                  className={`service-card${index === services.length - 1 ? ' service-card-featured' : ''}`}
                  data-reveal
                  key={service.title}
                  style={
                    {
                      '--delay': `${Math.min(index, 2) * 70}ms`,
                    } as CSSProperties
                  }
                >
                  <div className="service-icon">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className="numbers numbers-compact content-section"
            id="numbers"
            data-nav="work"
            aria-labelledby="numbers-title"
          >
            <div className="section-heading-row">
              <div>
                <AnimatedSectionHeading
                  id="numbers-title"
                  text="A practical record of building."
                  accentWords={['building.']}
                />
              </div>
              <p className="section-description reveal-copy" data-reveal>
                Hands-on work across funnel builds, automations, AI agents, and
                connected GoHighLevel systems.
              </p>
            </div>
            <MetricGrid />
          </section>

          <section
            className="final-cta content-section"
            id="final-cta"
            data-nav="contact"
            aria-labelledby="final-cta-title"
          >
            <div className="final-cta-heading-wrap">
              <AnimatedSectionHeading
                id="final-cta-title"
                className="final-cta-heading"
                text="Let's Build a System That Moves."
                accentWords={['Moves.']}
                lineBreakAfterWords={[4]}
              />
            </div>
            <div className="final-cta-media">
              <div className="final-cta-video-stage" data-reveal>
                <FinalCtaVideo />
              </div>
            </div>
          </section>
        </main>
        <ContactFooter id="contact" navSection="contact" />
      </div>
    </>
  );
}
