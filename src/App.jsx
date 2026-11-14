import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { m as motion, useScroll, AnimatePresence, LazyMotion } from 'framer-motion'
import { NavLink, Link, Magnetic, Curtain } from './ui.jsx'
import { CONTACT } from './data.js'

// Each page is its own chunk, so the first visit only downloads what it needs.
const importHome = () => import('./pages.jsx')
const importInner = () => import('./pages-inner.jsx')
const importTalk = () => import('./talk.jsx')
const importManagement = () => import('./management.jsx')
const Home = lazy(() => importHome().then((m) => ({ default: m.Home })))
const About = lazy(() => importInner().then((m) => ({ default: m.About })))
const ServicesPage = lazy(() => importInner().then((m) => ({ default: m.ServicesPage })))
const TeamPage = lazy(() => importInner().then((m) => ({ default: m.TeamPage })))
const NotFound = lazy(() => importInner().then((m) => ({ default: m.NotFound })))
const ContactPage = lazy(() => importInner().then((m) => ({ default: m.ContactPage })))
const TalkPage = lazy(() => importTalk().then((m) => ({ default: m.TalkPage })))
const ManagementPage = lazy(() => importManagement().then((m) => ({ default: m.ManagementPage })))

// Title and description for each page (shown in the browser tab and in search results).
const SITE = 'https://etricks.co'
const SEO = {
  '/': ['eTricks | We Launch, Scale & Fix Your E-Commerce Stores', 'eTricks is a Pakistan-based eCommerce agency. We launch, scale and fix online stores across Amazon, TikTok Shop, eBay, Etsy, Walmart, Shopify and Temu.'],
  '/services': ['Services | eTricks', 'E-commerce management, account recovery, company formation, software, web development and marketing from one team.'],
  '/management': ['E-Commerce Management | eTricks', 'Daily store management across Amazon, eBay, TikTok Shop, Etsy, Walmart, Shopify and Temu by a dedicated team.'],
  '/about': ['About | eTricks', 'eTricks is an eCommerce agency based in Multan, Pakistan, working with sellers in the UK, US, Australia, Canada and Saudi Arabia.'],
  '/team': ['Team | eTricks', 'Meet the people behind eTricks and what each of them looks after.'],
  '/talk': ['Book a Call | eTricks', 'Book a free 30-minute call with the eTricks team about your store.'],
  '/contact': ['Contact | eTricks', 'Tell eTricks about your business and the support you need. Email, WhatsApp or the contact form.'],
}
function useSeo(pathname) {
  useEffect(() => {
    const known = SEO[pathname]
    const [title, desc] = known || ['Page not found | eTricks', SEO['/'][1]]
    document.title = title
    const set = (sel, attr, val) => { const el = document.head.querySelector(sel); if (el) el.setAttribute(attr, val) }
    const url = SITE + (pathname === '/' ? '/' : pathname)
    set('meta[name="description"]', 'content', desc)
    set('meta[property="og:title"]', 'content', title); set('meta[property="og:description"]', 'content', desc); set('meta[property="og:url"]', 'content', url)
    set('meta[name="twitter:title"]', 'content', title); set('meta[name="twitter:description"]', 'content', desc)
    set('link[rel="canonical"]', 'href', url)
    set('meta[name="robots"]', 'content', known ? 'index, follow' : 'noindex')
  }, [pathname])
}

const NAV = [['/', 'Home'], ['/services', 'Services'], ['/management', 'Management'], ['/about', 'About'], ['/team', 'Team'], ['/talk', 'Book a call'], ['/contact', 'Contact']]

function Nav() {
  const [sc, setSc] = useState(false), [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { const f = () => setSc(window.scrollY > 40); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => { window.__lenis && (open ? window.__lenis.stop() : window.__lenis.start()) }, [open])
  return (
    <>
      <header className={'nav ' + (sc ? 'scrolled' : '')}>
        <button className="pillb" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Close' : 'Menu'}</button>
        <Link to="/" className="brand" aria-label="eTricks home"><img src="/logo.webp" alt="eTricks" width="45" height="46" fetchPriority="high" decoding="async" /></Link>
        <Link to="/talk" className="pillb lime">Book a call <span>↗</span></Link>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="menu" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: .8, ease: [.76, 0, .24, 1] }}>
            <nav>
              {NAV.map(([to, l], i) => (
                <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'on' : '')}>
                  <i>0{i + 1}</i><span className="serif">{l}</span>
                </NavLink>
              ))}
            </nav>
            <div className="menu-f">
              <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a>
              <a href={'https://wa.me/' + CONTACT.whatsapp}>{CONTACT.phone}</a>
              <span>{CONTACT.city}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const CLOCKS = [['Multan · PK', 'Asia/Karachi'], ['London', 'Europe/London'], ['New York', 'America/New_York'], ['Toronto', 'America/Toronto'], ['Riyadh', 'Asia/Riyadh'], ['Sydney', 'Australia/Sydney']]

function WorldClocks() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 10000); return () => clearInterval(t) }, [])
  const fmt = (tz) => {
    try { return new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(now) } catch { return '--:--' }
  }
  return (
    <div className="clocks" aria-label="Local times in our markets">
      {CLOCKS.map(([n, tz]) => {
        const [h, m] = fmt(tz).split(':')
        return (
          <div className="clock" key={tz}>
            <small>{n}</small>
            <b>{h}<i>:</i>{m}</b>
          </div>
        )
      })}
    </div>
  )
}

function Footer() {
  return (
    <footer className="foot"><div className="wrap">
      <WorldClocks />
      <div className="fgrid">
        <div><img src="/logo.webp" alt="eTricks" width="62" height="64" loading="lazy" decoding="async" style={{ height: 64, width: "auto", marginBottom: 18 }} /><p style={{ maxWidth: '34ch' }}>Based in Pakistan. Built for global eCommerce. We launch, scale and fix online stores.</p></div>
        <div><h5>Menu</h5>{NAV.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}</div>
        <div><h5>Services</h5><Link to="/services">E-Commerce Management</Link><Link to="/services">Account Recovery</Link><Link to="/services">Company Formation</Link><Link to="/services">Web &amp; Software Development</Link></div>
        <div><h5>Contact</h5><a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a><a href={'https://wa.me/' + CONTACT.whatsapp}>{CONTACT.phone}</a><p>{CONTACT.city}</p>
          <div style={{ display: 'flex', gap: '4px 16px', flexWrap: 'wrap' }}>{[['Instagram', 'instagram'], ['TikTok', 'tiktok'], ['Facebook', 'facebook'], ['YouTube', 'youtube']].map(([n, k]) => <a key={k} href={CONTACT[k]} target="_blank" rel="noreferrer">{n}</a>)}</div></div>
      </div>
      <div className="giant serif">eTricks</div>
      <div className="fbottom"><span>© {new Date().getFullYear()} eTricks. All rights reserved.</span><span>Multan, Pakistan · Serving the world</span></div>
    </div></footer>
  )
}

function Cursor() {
  const el = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return
    const pos = { x: -50, y: -50 }, tgt = { x: -50, y: -50 }
    let raf = 0, big = false
    const frame = () => {
      pos.x += (tgt.x - pos.x) * 0.5; pos.y += (tgt.y - pos.y) * 0.5
      el.current.style.transform = `translate3d(${pos.x - 7}px,${pos.y - 7}px,0)`
      raf = requestAnimationFrame(frame)
    }
    const m = (e) => {
      tgt.x = e.clientX; tgt.y = e.clientY
      const b = !!e.target.closest('a,button,.row,.trow,input,textarea')
      if (b !== big) { big = b; el.current.classList.toggle('big', b) }
    }
    window.addEventListener('mousemove', m, { passive: true })
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', m) }
  }, [])
  return <div ref={el} className="cursor" />
}

function Layout() {
  const { pathname } = useLocation()
  const first = useRef(pathname)
  useSeo(pathname)
  const { scrollYProgress } = useScroll()
  useEffect(() => {
    const l = new Lenis({ duration: 1.15, smoothWheel: true })
    let id; const raf = (t) => { l.raf(t); id = requestAnimationFrame(raf) }; id = requestAnimationFrame(raf)
    window.__lenis = l
    return () => { cancelAnimationFrame(id); l.destroy() }
  }, [])
  useEffect(() => { window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0) }, [pathname])
  useEffect(() => {
    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 1500))
    const id = idle(() => { importInner(); importTalk(); importManagement() })
    return () => (window.cancelIdleCallback || clearTimeout)(id)
  }, [])
  return (
    <>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <Cursor /><Nav />
      {pathname !== first.current && <Curtain id={pathname} />}
      <motion.main key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .3, delay: .12 }}>
        <Suspense fallback={<div style={{ minHeight: '100svh' }} />}>
          <Routes location={{ pathname }}>
            <Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} /><Route path="/talk" element={<TalkPage />} /><Route path="/management" element={<ManagementPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>
      <Footer />
      <a className="wa" href={'https://wa.me/' + CONTACT.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">WA</a>
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(() => { try { return !sessionStorage.getItem('et-seen') } catch { return true } })
  useEffect(() => {
    if (!loading) return
    try { sessionStorage.setItem('et-seen', '1') } catch { /* private mode */ }
    const t = setTimeout(() => setLoading(false), 750)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <BrowserRouter><LazyMotion features={() => import('./motionFeatures.js').then((r) => r.default)}>
      <AnimatePresence>{loading && (
        <motion.div className="pre" exit={{ y: '-100%' }} transition={{ duration: .6, ease: [.76, 0, .24, 1] }}>
          <motion.span className="pre-w" initial={{ opacity: 0, letterSpacing: '.1em' }} animate={{ opacity: 1, letterSpacing: '.6em' }} transition={{ duration: .7, ease: [.16, 1, .3, 1] }}>ETRICKS</motion.span>
          <motion.div className="pre-bar" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: .7, ease: 'easeInOut' }} />
        </motion.div>
      )}</AnimatePresence>
      <Layout />
    </LazyMotion></BrowserRouter>
  )
}
