import { useState } from 'react'
import { m as motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Reveal, Words, Magnetic, Link, Silhouette, Counter, ScrubText, ease } from './ui.jsx'
import { SERVICES, STEPS, MARKETS, TEAM, PROMISES, PLATFORMS, PLATFORM_DETAIL } from './data.js'
import Shape3D from './Shape3DLazy.jsx'
import { PlatformLogo } from './logos.jsx'

/* ---------- Who we are: light "paper" panel, big serif scrub text ---------- */
export function Statement() {
  return (
    <section className="paper-wrap">
      <div className="paper">
        <Shape3D shape="blob" className="st-blob" speed={.6} />
        <div className="wrap">
          <p className="mono-s dark">(01) Who we are</p>
          <ScrubText className="stmt serif" from={0.16} text="Opening an online store takes a weekend. Keeping it healthy takes a team. We are that team: the people behind your listings, your orders, your account health and your next move." />
          <div className="figs">
            {[[10, 'Marketplaces managed'], [12, 'Markets served'], [20, 'Regions for company formation'], [10, 'Dedicated team per store']].map(([n, l]) => (
              <Reveal key={l} className="fig"><span className="serif"><Counter to={n} suffix="+" /></span><small>{l}</small></Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Services: numbered editorial rows (Fantasy / Clay) ---------- */
export function ServiceRows({ title = 'What we do', intro }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="section"><div className="wrap">
      <div className="sec-head">
        <p className="mono-s">(02) {title}</p>
        <h2 className="serif h2"><Words text={intro || 'Six ways we move your store forward.'} em={['forward.', 'all.']} /></h2>
      </div>
      <div className="rows">
        {SERVICES.map((s, i) => (
          <div key={s.n} className={'row ' + (open === i ? 'open' : '')}>
            <button className="row-h" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span className="row-n">{s.n}</span>
              <span className="row-t serif">{s.t}</span>
              <span className="row-c" aria-hidden="true">+</span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div className="row-b" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .55, ease }}>
                  <div className="row-bi">
                    {s.subtitle && <h4 className="row-sub">{s.subtitle}</h4>}
                    <p>{s.d}</p>
                    {s.tags.length > 0 && <div className="tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>}
                    {s.sub && (
                      <div className="row-subs">
                        {s.sub.map(([t, d]) => <div className="row-subi" key={t}><b>{t}</b><span>{d}</span></div>)}
                      </div>
                    )}
                    {s.note && <div className="row-note"><b>{s.note[0]}</b><span>{s.note[1]}</span></div>}
                    <Link to={s.cta[1]} className="ulink">{s.cta[0]} <i>↗</i></Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div></section>
  )
}

/* ---------- Platforms: stacking colour panels (Clay) ---------- */
const TONES = ['t-lime', 't-tiktok', 't-paper', 't-etsy', 't-sage', 't-dark', 't-lime2']
export function PlatformStack() {
  return (
    <section className="section" style={{ paddingBottom: 0 }}><div className="wrap">
      <div className="sec-head">
        <p className="mono-s">(03) Platforms</p>
        <h2 className="serif h2"><Words text="One team. Every marketplace you sell on." em={['on.']} /></h2>
      </div>
      <div className="stack">
        {PLATFORMS.map((p, i) => {
          const d = PLATFORM_DETAIL[p]
          return (
            <article key={p} className={'sp ' + TONES[i]} style={{ '--i': i }}>
              <div className="sp-l">
                <span className="mono-s">{String(i + 1).padStart(2, '0')} / {String(PLATFORMS.length).padStart(2, '0')}</span>
                <h3 className="sp-logo" aria-label={p}><PlatformLogo name={p} /></h3>
                <p>{d.line}</p>
              </div>
              <div className="sp-r">
                <ul>{d.points.map((pt, k) => <li key={pt}><i>{String(k + 1).padStart(2, '0')}</i>{pt}</li>)}</ul>
                <Link to="/contact" className="sp-a">Get help with {p} <i>↗</i></Link>
              </div>
            </article>
          )
        })}
      </div>
    </div></section>
  )
}

/* ---------- Process: big editorial lines ---------- */
export function ProcessRows() {
  return (
    <section className="section"><div className="wrap">
      <div className="sec-head">
        <p className="mono-s">(04) How we work</p>
        <h2 className="serif h2"><Words text="A clear plan, a named team, no surprises." em={['surprises.']} /></h2>
      </div>
      <div className="prows">
        {STEPS.map(([t, d], i) => (
          <Reveal key={t} className="prow">
            <span className="mono-s">0{i + 1}</span>
            <h3 className="serif">{t}</h3>
            <p>{d}</p>
          </Reveal>
        ))}
      </div>
    </div></section>
  )
}

/* ---------- Why: three promises ---------- */
export function Promises() {
  return (
    <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
      <div className="promises">
        {PROMISES.map(([t, d], i) => (
          <Reveal key={t} delay={i * .1} className="promise"><span className="mono-s">0{i + 1}</span><h3 className="serif">{t}</h3><p>{d}</p></Reveal>
        ))}
      </div>
    </div></section>
  )
}

/* ---------- Markets: giant outlined names ---------- */
export function MarketsBig() {
  const [hot, setHot] = useState(null)
  return (
    <section className="section has3d">
      <Shape3D shape="jack" className="mk-jack" />
      <div className="wrap">
      <div className="sec-head">
        <p className="mono-s">(05) Markets</p>
        <h2 className="serif h2"><Words text="From Multan to your customers." em={['customers.']} /></h2>
      </div>
      <div className="mkbig" onMouseLeave={() => setHot(null)}>
        {MARKETS.map(([n, c], i) => (
          <Reveal key={n} delay={i * .05} y={30}>
            <div className={'mkrow ' + (hot === c ? 'on' : hot ? 'dim' : '')} onMouseEnter={() => setHot(c)}>
              <span className="serif">{n}</span><em>{c}</em>
            </div>
          </Reveal>
        ))}
      </div>
    </div></section>
  )
}

/* ---------- Team: names list, portrait follows cursor ---------- */
export function TeamHover({ limit }) {
  const list = limit ? TEAM.slice(0, limit) : TEAM
  const [hov, setHov] = useState(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 160, damping: 20 }), sy = useSpring(y, { stiffness: 160, damping: 20 })
  return (
    <div className="thover" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - r.left + 28); y.set(e.clientY - r.top - 110) }} onMouseLeave={() => setHov(null)}>
      {list.map((m, i) => (
        <Reveal key={i} delay={i * .04} y={20}>
          <div className={'trow ' + (hov === i ? 'on' : '')} onMouseEnter={() => setHov(i)}>
            <span className="t-i">0{i + 1}</span><b className="serif">{m.n}</b><em>{m.r}</em><span className="t-a">↗</span>
          </div>
        </Reveal>
      ))}
      <AnimatePresence>
        {hov !== null && (
          <motion.div className="tcard" style={{ x: sx, y: sy }} initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .8 }} transition={{ duration: .25 }}>
            <div className="tc-pic">{list[hov].img ? <img src={list[hov].img} alt={list[hov].n} decoding="async" /> : <Silhouette />}</div><b>{list[hov].n}</b><span>{list[hov].r}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
