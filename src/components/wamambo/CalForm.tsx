'use client';

import { useEffect, useRef } from 'react';
import { Button } from '../wamambo/Button';
import SpecularButton from '../wamambo/SpecularButton';

const GOOGLE_SCHEDULE_URL =
  'https://calendar.app.google/ub4Sqs8Dez6jFeQr6';

export function CalPopup({ specular = false }: { specular?: boolean }) {
  // The booking calendar is an inline Google Calendar embed on /contact#calendly.
  // This button scrolls to it; if the user is off the contact page it just
  // navigates there. As a safety net (e.g. embed blocked), open in a new tab.
  const openBooking = () => {
    const onContact = window.location.pathname === '/contact';
    if (onContact) {
      const target = document.getElementById('calendly');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    // Not on the contact page — go there (the embed unlocks after the questionnaire).
    window.location.href = '/contact#calendly';
  };

  return (
    <>
      {specular ? (
        <SpecularButton
          type="button"
          onClick={openBooking}
          className="w-full sm:w-auto"
        >
          Book Free Strategy Call
        </SpecularButton>
      ) : (
        <Button
          type="button"
          variant="primary"
          onClick={openBooking}
          className="w-full sm:w-auto"
        >
          Book Free Strategy Call
        </Button>
      )}
    </>
  );
}

// Kept for callers that want a direct new-tab link as a fallback.
export function CalFallbackLink() {
  return (
    <a
      href={GOOGLE_SCHEDULE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="font-satoshi text-sm font-medium text-seal-500 hover:text-seal-400"
    >
      Open booking in a new tab
    </a>
  );
}

export default CalPopup;
