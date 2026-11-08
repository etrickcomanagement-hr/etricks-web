import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { NavLink, Link, Magnetic, Curtain } from './ui.jsx'
import { Home, About, ServicesPage, TeamPage, ContactPage } from './pages.jsx'
import { TalkPage } from './talk.jsx'
import { ManagementPage } from './management.jsx'
import { CONTACT } from './data.js'

const NAV = [['/', 'Home'], ['/services', 'Services'], ['/management', 'Management'], ['/about', 'About'], ['/team', 'Team'], ['/talk', 'Book a call'], ['/contact', 'Contact']]

function Nav() {
  const [sc, setSc] = useState(false), [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { const f = () => setSc(window.scrollY > 40); f(); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f) }, [])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => { window.__lenis && (open ? window.__lenis.stop() : window.__lenis.start()) }, [open])
  return (
    <>
      <header className={'nav ' + (sc ? 'scrolled' : '')}>
        <button className="pillb" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Close' : 'Menu'}</button>
        <Link to="/" className="brand" aria-label="eTricks home"><img src="/logo.png" alt="eTricks" /></Link>
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
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])
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
            <b>{h}<i className={now.getSeconds() % 2 ? 'off' : ''}>:</i>{m}</b>
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
        <div><img src="/logo.png" alt="eTricks" style={{ height: 64, marginBottom: 18 }} /><p style={{ maxWidth: '34ch' }}>Based in Pakistan. Built for global eCommerce. We launch, scale and fix online stores.</p></div>
        <div><h5>Menu</h5>{NAV.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}</div>
        <div><h5>Services</h5><Link to="/services">E-Commerce Management</Link><Link to="/services">Account Recovery</Link><Link to="/services">Company Formation</Link><Link to="/services">Web Development</Link></div>
        <div><h5>Contact</h5><a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a><a href={'https://wa.me/' + CONTACT.whatsapp}>{CONTACT.phone}</a><p>{CONTACT.city}</p>
          <div style={{ display: 'flex', gap: '4px 16px', flexWrap: 'wrap' }}>{[['Instagram', 'instagram'], ['TikTok', 'tiktok'], ['Facebook', 'facebook'], ['YouTube', 'youtube']].map(([n, k]) => <a key={k} href={CONTACT[k]} target="_blank" rel="noreferrer">{n}</a>)}</div></div>
      </div>
      <div className="giant serif">eTricks</div>
      <div className="fbottom"><span>© {new Date().getFullYear()} eTricks. All rights reserved.</span><span>Multan, Pakistan · Serving the world</span></div>
    </div></footer>
  )
}

function Cursor() {
  const [p, setP] = useState({ x: -50, y: -50 }), [big, setBig] = useState(false)
  useEffect(() => {
    const m = (e) => { setP({ x: e.clientX, y: e.clientY }); setBig(!!e.target.closest('a,button,.row,.trow,input,textarea')) }
    window.addEventListener('mousemove', m); return () => window.removeEventListener('mousemove', m)
  }, [])
  return <div className={'cursor ' + (big ? 'big' : '')} style={{ transform: `translate(${p.x - 7}px,${p.y - 7}px)` }} />
}

function Layout() {
  const { pathname } = useLocation()
  const first = useRef(pathname)
  const { scrollYProgress } = useScroll()
  useEffect(() => {
    const l = new Lenis({ duration: 1.15, smoothWheel: true })
    let id; const raf = (t) => { l.raf(t); id = requestAnimationFrame(raf) }; id = requestAnimationFrame(raf)
    window.__lenis = l
    return () => { cancelAnimationFrame(id); l.destroy() }
  }, [])
  useEffect(() => { window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <Cursor /><Nav />
      {pathname !== first.current && <Curtain id={pathname} />}
      <AnimatePresence mode="wait">
        <motion.main key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}>
          <Routes location={{ pathname }}>
            <Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} /><Route path="/talk" element={<TalkPage />} /><Route path="/management" element={<ManagementPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <a className="wa" href={'https://wa.me/' + CONTACT.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">WA</a>
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1700); return () => clearTimeout(t) }, [])
  return (
    <BrowserRouter>
      <AnimatePresence>{loading && (
        <motion.div className="pre" exit={{ y: '-100%' }} transition={{ duration: .9, ease: [.76, 0, .24, 1] }}>
          <motion.span className="pre-w" initial={{ opacity: 0, letterSpacing: '.1em' }} animate={{ opacity: 1, letterSpacing: '.7em' }} transition={{ duration: 1.5, ease: [.16, 1, .3, 1] }}>ETRICKS</motion.span>
          <motion.div className="pre-bar" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.6, ease: 'easeInOut' }} />
        </motion.div>
      )}</AnimatePresence>
      <Layout />
    </BrowserRouter>
  )
}
