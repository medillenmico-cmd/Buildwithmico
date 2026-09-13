'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

const INTRO_SESSION_KEY = 'buildwithmico:intro-seen';
const COUNT_DURATION = 1000;
const BRAND_REVEAL_DURATION = 300;
const BRAND_HOLD = 500;
const EXIT_DURATION = 450;
const FAILSAFE_DURATION = 2800;

type SiteIntroProps = {
  onReveal: () => void;
};

export default function SiteIntro({ onReveal }: SiteIntroProps) {
  const [isMounted, setIsMounted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'brand' | 'exiting'>(
    'counting',
  );
  const revealRef = useRef(onReveal);

  useEffect(() => {
    revealRef.current = onReveal;
  }, [onReveal]);

  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;
    const shell = document.querySelector<HTMLElement>('.site-shell');
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    let hasSeenIntro = false;

    try {
      hasSeenIntro = window.sessionStorage.getItem(INTRO_SESSION_KEY) === '1';
    } catch {
      // Storage can be unavailable in strict privacy modes. The intro still works.
    }

    if (prefersReducedMotion || hasSeenIntro) {
      const skipTimer = window.setTimeout(() => {
        revealRef.current();
        setIsMounted(false);
      }, 0);
      return () => window.clearTimeout(skipTimer);
    }

    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      // A blocked sessionStorage should never block access to the portfolio.
    }

    const previousBodyOverflow = body.style.overflow;
    const previousRootOverflow = root.style.overflow;

    shell?.setAttribute('inert', '');
    body.style.overflow = 'hidden';
    root.style.overflow = 'hidden';

    let animationFrame = 0;
    let brandTimer = 0;
    let exitTimer = 0;
    let failSafeTimer = 0;
    let released = false;

    const release = () => {
      if (released) return;
      released = true;
      body.style.overflow = previousBodyOverflow;
      root.style.overflow = previousRootOverflow;
      shell?.removeAttribute('inert');
    };

    const finish = () => {
      setProgress(100);
      setPhase('brand');
      brandTimer = window.setTimeout(
        () => {
          setPhase('exiting');
          revealRef.current();
          exitTimer = window.setTimeout(
            () => {
              release();
              setIsMounted(false);
            },
            prefersReducedMotion ? 140 : EXIT_DURATION,
          );
        },
        BRAND_REVEAL_DURATION + BRAND_HOLD,
      );
    };

    const startedAt = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const nextProgress = Math.min(elapsed / COUNT_DURATION, 1);
      setProgress(Math.round(nextProgress * 100));
      if (nextProgress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
        return;
      }
      finish();
    };
    animationFrame = window.requestAnimationFrame(tick);

    failSafeTimer = window.setTimeout(() => {
      revealRef.current();
      release();
      setIsMounted(false);
    }, FAILSAFE_DURATION);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(brandTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(failSafeTimer);
      release();
    };
  }, []);

  if (!isMounted) return null;

  return (
    <output
      className={`site-intro site-intro--minimal is-${phase}`}
      aria-live="polite"
      aria-label={
        phase === 'counting' ? 'Loading portfolio' : 'Portfolio ready'
      }
    >
      <div className="intro-count" aria-hidden={phase !== 'counting'}>
        <span
          className="intro-count__ring"
          style={
            { '--intro-progress': `${progress * 3.6}deg` } as CSSProperties
          }
        >
          <span>{progress}%</span>
        </span>
      </div>
      <div className="intro-brand" aria-hidden={phase === 'counting'}>
        <strong>Portfolio</strong>
        <span>by Mico Medillen</span>
      </div>
    </output>
  );
}
