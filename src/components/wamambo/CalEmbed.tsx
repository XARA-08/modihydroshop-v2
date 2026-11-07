'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '../wamambo/Button';

// Google Calendar appointment-schedule embed. The public short link
// (calendar.app.google/...) 302-redirects to this embeddable path, which
// carries no X-Frame-Options / frame-ancestors and is therefore safe to
// inline. `embed=true` strips the Google chrome for a clean in-page calendar.
const GOOGLE_SCHEDULE_EMBED =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2Fv-xPywXS_rHeREJgbZxDuGBknYCIRlUI7PXEVsj5Fihqi37z3JfH6oy2QEro4oy2QM-RF57X?embed=true';

export function CalEmbed({ height = 720 }: { height?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    // The embed is a plain iframe, so it's "ready" as soon as it mounts.
    // We only fall back to a button if it fails to load.
    const t = setTimeout(() => {
      const iframe = containerRef.current?.querySelector('iframe');
      if (iframe && iframe.offsetHeight > 0) setStatus('ready');
    }, 1500);

    const onError = () => setStatus('error');
    const el = containerRef.current?.querySelector('iframe');
    el?.addEventListener('error', onError);

    return () => {
      clearTimeout(t);
      el?.removeEventListener('error', onError);
    };
  }, []);

  // The Google Calendar iframe is cross-origin, so while the pointer is over
  // it the parent page receives no mouse events. We toggle `iframe-cursor-active`
  // on <body> so the global custom cursor (DirectionalCursor) hides its arrow
  // and restores the native cursor over the embed.
  //
  // Uses NATIVE mouseenter/mouseleave/focus/blur listeners on the iframe node.
  // React's onMouseEnter/onMouseLeave are synthesized from bubbling
  // mouseover/mouseout, which do NOT cross the cross-origin iframe boundary —
  // so they never fire here. Native listeners fire on the boundary crossing.
  const setIframeCursor = (active: boolean) => {
    if (typeof document === 'undefined') return
    document.body.classList.toggle('iframe-cursor-active', active)
  }

  useEffect(() => {
    const iframe = containerRef.current?.querySelector('iframe')
    if (!iframe) return
    const enter = () => setIframeCursor(true)
    const leave = () => setIframeCursor(false)
    iframe.addEventListener('mouseenter', enter)
    iframe.addEventListener('mouseleave', leave)
    iframe.addEventListener('focus', enter)
    iframe.addEventListener('blur', leave)
    return () => {
      iframe.removeEventListener('mouseenter', enter)
      iframe.removeEventListener('mouseleave', leave)
      iframe.removeEventListener('focus', enter)
      iframe.removeEventListener('blur', leave)
      setIframeCursor(false)
    }
  }, []);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="w-full overflow-hidden rounded-2xl bg-white"
        aria-label="Booking calendar"
      >
        <iframe
          src={GOOGLE_SCHEDULE_EMBED}
          title="Book a free 30-minute strategy call"
          width="100%"
          height={height}
          frameBorder={0}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full border-0"
          onLoad={() => setStatus('ready')}
        />
      </div>

      {status === 'loading' && (
        <div className="flex items-center justify-center gap-3 py-6 font-satoshi text-sm text-mist">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-seal-500/50 border-t-seal-500" />
          Loading calendar…
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 text-center">
          <Button
            as="a"
            href="https://calendar.app.google/ub4Sqs8Dez6jFeQr6"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            Book on Google Calendar
          </Button>
          <p className="mt-3 font-satoshi text-sm text-mist">Opens in a new tab</p>
        </div>
      )}
    </div>
  );
}

export default CalEmbed;
