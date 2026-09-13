'use client';

import { useEffect, useRef } from 'react';

const TURNSTILE_SCRIPT_ID = 'cloudflare-turnstile-script';
const TURNSTILE_SCRIPT_URL =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      appearance: 'interaction-only';
      size: 'flexible';
      theme: 'dark';
      callback: (token: string) => void;
      'error-callback': () => void;
      'expired-callback': () => void;
      'timeout-callback': () => void;
    },
  ) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileWidgetProps = {
  siteKey?: string;
  resetSignal: number;
  onError: () => void;
  onExpire: () => void;
  onVerify: (token: string) => void;
};

export default function TurnstileWidget({
  siteKey,
  resetSignal,
  onError,
  onExpire,
  onVerify,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !siteKey) return;

    let disposed = false;
    const renderWidget = () => {
      if (disposed || !window.turnstile || widgetIdRef.current) return;

      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: siteKey,
        action: 'contact_form',
        appearance: 'interaction-only',
        size: 'flexible',
        theme: 'dark',
        callback: onVerify,
        'error-callback': onError,
        'expired-callback': onExpire,
        'timeout-callback': onExpire,
      });
    };

    let script = document.getElementById(
      TURNSTILE_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (window.turnstile) {
      renderWidget();
    } else {
      if (!script) {
        script = document.createElement('script');
        script.id = TURNSTILE_SCRIPT_ID;
        script.src = TURNSTILE_SCRIPT_URL;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }

      script.addEventListener('load', renderWidget);
      script.addEventListener('error', onError);
    }

    return () => {
      disposed = true;
      script?.removeEventListener('load', renderWidget);
      script?.removeEventListener('error', onError);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = undefined;
      }
    };
  }, [onError, onExpire, onVerify, siteKey]);

  useEffect(() => {
    if (resetSignal && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetSignal]);

  if (!siteKey) {
    return (
      <p className="turnstile-unavailable" role="alert">
        Secure verification is temporarily unavailable.
      </p>
    );
  }

  return (
    <div
      className="turnstile-widget"
      ref={containerRef}
      aria-label="Secure anti-spam verification"
    />
  );
}
