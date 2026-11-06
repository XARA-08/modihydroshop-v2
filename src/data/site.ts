export const site = {
  name: 'Modi Hydroshop',
  legalName: 'Modi Hydroshop Pty Ltd',
  tagline: 'Pure Water. Pure Trust.',
  description:
    'Premium water purification & bottling. Reverse Osmosis purified still water, sparkling water, natural fruit juice, crystal ice cubes, refill services and prepared meals & catering — serving businesses, hospitality and events across Limpopo and Gauteng.',
  url: 'https://modihydroshop.pages.dev',
  locale: 'en-ZA',
  phone: '+27 68 789 5944',
  phoneDigits: '27687895944',
  phone2: '+27 63 720 2467',
  phone2Digits: '27637202467',
  email: 'lesibabdmaleka@gmail.com',
  address: {
    street: '440 Sediba Street, Phagameng',
    city: 'Modimolle',
    region: 'Limpopo',
    postalCode: '0510',
    country: 'ZA',
  },
  address2: {
    street: '250/33 Mokhatla Street, Moletsane, Kwa-Xuma',
    city: 'Soweto',
    region: 'Gauteng',
    postalCode: '1868',
    country: 'ZA',
  },
  hours: 'Mon–Fri 8am–5pm, Sat 8am–1pm',
  founded: '2020',
  social: {
    facebook: '',
    instagram: '',   // handle to be confirmed
    tiktok: '',      // handle to be confirmed
    youtube: '',     // channel to be confirmed
    linkedin: '',    // profile to be confirmed
    whatsapp: 'https://wa.me/27687895944',
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
