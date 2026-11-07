import { site } from '@/data/site';

export function whatsappHref(message?: string): string {
  const number = site.phoneDigits;
  const text = encodeURIComponent(
    message ?? "Hi Modi Hydroshop, I'd like to learn more about your products."
  );
  return `https://wa.me/${number}?text=${text}`;
}
