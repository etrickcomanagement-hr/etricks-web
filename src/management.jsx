import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, Words, Reveal, Magnetic, ease } from './ui.jsx'
import { PlatformLogo } from './logos.jsx'
import { Faq } from './sections.jsx'
import { BigLink } from './ui.jsx'
import { MANAGE_PLATFORMS, WHY_TEAM, ACTIVITY } from './data.js'

/* ---------- live-looking store activity card (sample) ---------- */
function ActivityCard() {
  const [n, setN] = useState(4)
  useEffect(() => { const t = setInterval(() => setN((x) => x + 1), 2400); return () => clearInterval(t) }, [])
  const rows = [0, 1, 2, 3].map((k) => ({ id: n - k, item: ACTIVITY[(n - k) % ACTIVITY.length], age: k }))
  const ago = ['just now', '2 min ago', '12 min ago', '1 hour ago']
  return (
    <div className="act" aria-label="Sample store activity">
      <div className="act-h"><span><i className="dot" /> Store activity</span><small>Sample</small></div>
      <div className="act-l">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map(({ id, item, age }) => (
            <motion.div key={id} layout className="act-r" initial={{ opacity: 0, y: -22, scale: .96 }} animate={{ opacity: 1 - age * .18, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24 }} transition={{ duration: .6, ease }}>
              <i /><div><b>{item[0]}</b><small>{item[1]}</small></div><em>{ago[age]}</em>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- numbered platform list that opens on hover or tap ---------- */
function PlatformList() {
  const [open, setOpen] = useState(0)
  return (
    <div className="mpl" role="list">
      {MANAGE_PLATFORMS.map(([name, desc, points], i) => (
        <div key={name} role="listitem" className={'mpl-i ' + (open === i ? 'on' : '')} onMouseEnter={() => setOpen(i)}>
          <button className="mpl-h" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span className="mpl-n">0{i + 1}</span>
            <span className="mpl-lg"><PlatformLogo name={name} /></span>
            <span className="mpl-t"><b>{name}</b><small>{desc}</small></span>
            <span className="mpl-a" aria-hidden="true">↗</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.ul className="mpl-b" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .45, ease }}>
                {points.map((p) => <li key={p}><i />{p}</li>)}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ))}
      <p className="mpl-f">Find the support your store needs.</p>
    </div>
  )
}

const ICONS = [
  <g key="a" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="3" /><circle cx="5.5" cy="10" r="2.2" /><circle cx="18.5" cy="10" r="2.2" /><path d="M6.5 19c0-3 2.4-5 5.5-5s5.5 2 5.5 5M1.8 18c.2-2 1.6-3.4 3.7-3.4M22.2 18c-.2-2-1.6-3.4-3.7-3.4" /></g>,
  <g key="b" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></g>,
  <g key="c" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4M8.5 15l2.2 2.2 4.3-4.4" /></g>,
  <g key="d" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v11H11l-4.5 4v-4H4z" /><path d="M8 9.5h8M8 12.5h5" /></g>,
]

export function ManagementPage() {
  return (
    <>
      {/* hero: promise on the left, platforms on the right */}
      <section className="mg-hero">
        <div className="mg-glow" />
        <div className="wrap mg-grid">
          <div className="mg-l">
            <p className="mono-s">E-commerce management</p>
            <h1 className="serif mg-h"><Words now delay={.4} text="Your stores." /><br /><Words now delay={.7} text="Our daily focus." em={['daily', 'focus.']} /></h1>
            <Reveal delay={.9}><p className="lead">Hands-on support for the platforms your business runs on. Listings, orders, stock and customer messages, handled every day by people who know your store.</p></Reveal>
            <Reveal delay={1.05}><div className="mg-cta">
              <Magnetic to="/talk" className="btn btn-p" strength={.2}>Discuss your store <span className="arr">→</span></Magnetic>
              <Link to="/services" className="ulink plain">All services <i>→</i></Link>
            </div></Reveal>
            <Reveal delay={1.2}><ActivityCard /></Reveal>
          </div>
          <Reveal delay={.5} y={50}><PlatformList /></Reveal>
        </div>
      </section>

      {/* why eTricks */}
      <section className="section"><div className="wrap mg-why">
        <div className="mg-why-l">
          <p className="mono-s">Why eTricks</p>
          <h2 className="serif h2"><Words text="The team behind your business." em={['business.']} /></h2>
          <Reveal delay={.1}><p className="lead" style={{ marginTop: 24 }}>Every department has its own dedicated people, and every project has a team assigned to it. We bring their work together so your store gets steady attention and you always know who is handling what.</p></Reveal>
        </div>
        <div className="mg-why-g">
          {WHY_TEAM.map(([t, d], i) => (
            <Reveal key={t} delay={i * .08} className="mg-card">
              <div className="mg-ci"><span className="pl-ico"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">{ICONS[i]}</svg></span><em>0{i + 1}</em></div>
              <h3 className="serif">{t}</h3><p>{d}</p>
            </Reveal>
          ))}
        </div>
      </div></section>

      <Faq />
      <BigLink lead="Want a team to run your store?" label="Let's talk" />
    </>
  )
}
