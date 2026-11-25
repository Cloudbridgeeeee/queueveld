import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FOUNDERS, NAV, site } from '@/data/site';
import { useReveal } from '@/lib/motion';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-[21px] font-bold ${light ? 'text-white' : 'text-ink'}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <rect width="32" height="32" rx="9" fill={light ? '#F2A93B' : '#14233B'} />
        <path d="M6 22c4 0 5-10 10-10s6 6 10 6" stroke={light ? '#14233B' : '#F2A93B'} strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="16" cy="12" r="2.6" fill={light ? '#14233B' : '#EEF2F4'} />
      </svg>
      QueueVeld
    </span>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 12);
    f();
    addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);
  return (
    <header className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${scrolled ? 'bg-mist/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : 'bg-transparent'}`}>
      <Container className="flex h-[70px] items-center justify-between">
        <Link to="/" aria-label="QueueVeld home"><Logo /></Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${isActive ? 'bg-white text-ink' : 'text-ink-2 hover:text-ink'}`}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/demo" className="btn-ghost py-2.5">Open the demo</Link>
          <Link to="/contact" className="btn-primary py-2.5">Request a pilot</Link>
        </div>
        <button className="rounded-full p-2 lg:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </Container>
      {open && (
        <div className="border-t border-line bg-mist lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((n) => <NavLink key={n.to} to={n.to} className="rounded-xl px-3 py-3 text-lg font-medium">{n.label}</NavLink>)}
            <Link to="/demo" className="btn-ghost mt-2">Open the demo</Link>
            <Link to="/contact" className="btn-primary">Request a pilot</Link>
          </Container>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-white/75">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed">Appointment capacity planning for hospitals, outpatient clinics and diagnostic centres.</p>
          <p className="mt-4 text-sm">Founded by {FOUNDERS.map((f) => f.name).join(' and ')}.</p>
        </div>
        {[
          ['Product', [['/product', 'Features'], ['/how-it-works', 'How it works'], ['/pricing', 'Pricing'], ['/demo', 'Live demo']]],
          ['Company', [['/about', 'About and founders'], ['/contact', 'Contact'], ['/security', 'Security']]],
          ['Legal', [['/privacy', 'Privacy notice'], ['/terms', 'Terms of use']]],
        ].map(([h, links]) => (
          <div key={h as string}>
            <h3 className="font-sans text-sm font-semibold text-white">{h as string}</h3>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {(links as string[][]).map(([to, l]) => <li key={to}><Link to={to!} className="transition-colors hover:text-saffron">{l}</Link></li>)}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col justify-between gap-2 border-t border-white/10 py-6 text-sm sm:flex-row">
        <span>© {new Date().getFullYear()} QueueVeld. Lagos, Nigeria.</span>
        <a href={`mailto:${site.email}`} className="hover:text-saffron">{site.email}</a>
      </Container>
    </footer>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  useReveal(pathname);
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <Navbar />
      <main id="main" className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}

export function PageHero({ title, lead, children }: { title: string; lead: string; children?: ReactNode }) {
  return (
    <section className="border-b border-line pt-16 pb-14 sm:pt-24">
      <Container>
        <h1 className="reveal max-w-3xl text-[2.6rem] leading-[1.05] font-bold sm:text-[3.6rem]">{title}</h1>
        <p className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-ink-2" style={{ '--d': '80ms' } as React.CSSProperties}>{lead}</p>
        {children}
      </Container>
    </section>
  );
}

export function SectionHead({ title, lead, id }: { title: string; lead?: string; id?: string }) {
  return (
    <div className="max-w-2xl" id={id}>
      <h2 className="reveal text-[2rem] leading-[1.1] font-bold sm:text-[2.6rem]">{title}</h2>
      {lead && <p className="reveal mt-4 text-[17px] leading-relaxed text-ink-2">{lead}</p>}
    </div>
  );
}
