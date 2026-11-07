'use client';

import { useState, FormEvent } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

type State = 'idle' | 'submitting' | 'success' | 'error';

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function NewsletterForm() {
  const [state, setState] = useState<State>('idle');
  const [email, setEmail] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!WEB3FORMS_KEY) {
      // No backend key configured — gracefully fall back to mailto.
      window.location.href = `mailto:info@wamamboconsultancy.co.za?subject=Newsletter%20Signup&body=${encodeURIComponent(
        `Please subscribe ${email} to the Wamambo insights newsletter.`,
      )}`;
      return;
    }

    setState('submitting');
    try {
      const data = new FormData();
      data.append('access_key', WEB3FORMS_KEY);
      data.append('email', email);
      data.append('subject', 'Newsletter Signup — Wamambo Consultancy');
      data.append('from_name', 'Wamambo Website');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        setState('success');
        setEmail('');
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div
        className="flex items-center justify-center gap-3 font-satoshi text-body-lg text-ink max-w-md mx-auto"
        role="status"
      >
        <CheckCircle size={20} className="text-seal-500" aria-hidden="true" />
        You&apos;re in. Watch your inbox for the next one.
      </div>
    );
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
      onSubmit={handleSubmit}
      noValidate
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.co.za"
        required
        className="flex-1 border border-ink/20 bg-paper px-5 py-4 font-satoshi text-body-base text-ink placeholder:text-ink/30 focus:outline-none focus:border-seal-500 transition-colors rounded-lg"
      />
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="px-8 py-4 bg-seal-500 text-navy-950 font-satoshi font-semibold text-label tracking-wide rounded-lg hover:bg-seal-400 hover:shadow-[0_0_20px_rgba(212,175,106,0.4)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        {state === 'submitting' ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            <span>Subscribing…</span>
          </>
        ) : (
          <span>Subscribe</span>
        )}
      </button>
      {state === 'error' && (
        <p
          className="flex items-center gap-2 font-satoshi text-body-sm text-error sm:col-span-2"
          role="alert"
        >
          <AlertCircle size={16} aria-hidden="true" />
          Something went wrong — email us at info@wamamboconsultancy.co.za
        </p>
      )}
    </form>
  );
}
