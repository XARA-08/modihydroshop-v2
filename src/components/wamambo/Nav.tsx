'use client';

import { StaggeredMenu } from '../wamambo/StaggeredMenu';
import CardNav from '../wamambo/CardNav';

const MOBILE_LINKS = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about Wamambo Consultancy', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Why Us', ariaLabel: 'Why founders trust us', link: '/why-us' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const MOBILE_SOCIALS = [
  { label: 'LinkedIn', link: 'https://www.linkedin.com/company/135278496/admin/page-posts/published/' },
  { label: 'Facebook', link: 'https://www.facebook.com/profile.php?id=100084755417336' },
];

const DESKTOP_CARDS = [
  {
    label: 'Company',
    links: [
      { label: 'About', href: '/about', ariaLabel: 'About Wamambo' },
      { label: 'Why Us', href: '/why-us', ariaLabel: 'Why founders trust us' },
    ],
  },
  {
    label: 'Services',
    links: [
      { label: 'All Services', href: '/services', ariaLabel: 'View our services' },
    ],
  },
  {
    label: 'Contact',
    links: [
      { label: 'Book a call', href: '/contact#workflow', ariaLabel: 'Check funding eligibility' },
    ],
  },
];

export function Nav() {
  return (
    <>
      {/* Desktop floating CardNav */}
      <div className="hidden md:block">
        <CardNav
          logo="/brand/wamambo-w-mark.png"
          logoAlt="Wamambo Consultancy"
          items={DESKTOP_CARDS}
          ctaHref="/contact#workflow"
          ctaLabel="Check eligibility"
        />
      </div>

      {/* Mobile nav — React Bits StaggeredMenu owns the bar (scrolls with page;
          pins only while the overlay menu is open) */}
      <div className="md:hidden">
        <StaggeredMenu
          position="right"
          items={MOBILE_LINKS as any}
          socialItems={MOBILE_SOCIALS as any}
          displaySocials
          displayItemNumbering
          logoUrl="/brand/wamambo-w-mark.png"
          colors={['#0B1B3A', '#2D7DD2']}
          accentColor="#2D7DD2"
          menuButtonColor="#F8FAFC"
          openMenuButtonColor="#F8FAFC"
          changeMenuColorOnOpen={false}
          className=""
          onMenuOpen={() => {}}
          onMenuClose={() => {}}
        />
      </div>
    </>
  );
}

export default Nav;
