export const site = {
  name: 'Modi Hydroshop',
  legalName: 'Modi Hydroshop Pty Ltd',
  tagline: 'Pure Water. Pure Trust.',
  description:
    'Premium water purification & bottling. Reverse Osmosis purified still water, sparkling water, natural fruit juice, crystal ice cubes, and refill services — serving businesses, hospitality and events across Limpopo and Gauteng.',
  url: 'https://modihydroshop.pages.dev',
  locale: 'en-ZA',
  phone: '+27 63 720 2467',
  phoneDigits: '27637202467',
  email: 'info@modihydroshop.co.za',
  address: {
    street: 'Plot 42, Walkerville Industrial',
    city: 'Walkerville',
    region: 'Gauteng',
    postalCode: '1876',
    country: 'ZA',
  },
  hours: 'Mon–Fri 8am–5pm, Sat 8am–1pm',
  founded: '2020',
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    whatsapp: 'https://wa.me/27637202467',
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Services', href: '/services' },
    { label: 'Quality', href: '/quality' },
    { label: 'About', href: '/about' },
    { label: 'Clients', href: '/clients' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

export const waLink = (message = "Hi Modi Hydroshop, I'd like a quote.") =>
  `https://wa.me/${site.phoneDigits}?text=${encodeURIComponent(message)}`;
