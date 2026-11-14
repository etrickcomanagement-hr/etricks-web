import { useEffect, useRef, useState } from 'react'
import { m as motion, animate, useInView, AnimatePresence } from 'framer-motion'
import { Reveal, Words, Link, ease } from './ui.jsx'
import { RESULTS } from './data.js'
import { PlatformLogo } from './logos.jsx'
import './results.css'

/* counts up to a number when it scrolls into view, e.g. £129,639 */
function Money({ to, prefix = '£' }) {
  const ref = useRef(null), inView = useInView(ref, { once: true, margin: '-60px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2.2, ease, onUpdate: (n) => setV(Math.round(n)) })
    return () => c.stop()
  }, [inView, to])
  return <b ref={ref}>{prefix}{v.toLocaleString('en-GB')}</b>
}

/* full-size view of one dashboard screenshot */
function Lightbox({ shot, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    window.__lenis && window.__lenis.stop()
    return () => { window.removeEventListener('keydown', k); window.__lenis && window.__lenis.start() }
  }, [onClose])
  return (
    <motion.div className="rs-lb" role="dialog" aria-modal="true" aria-label={shot[1]} onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}>
      <motion.figure onClick={(e) => e.stopPropagation()} initial={{ scale: .94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .96 }} transition={{ duration: .35, ease }}>
        <img src={shot[0]} alt={shot[1]} />
        <figcaption><span>{shot[1]}</span><button onClick={onClose} aria-label="Close">×</button></figcaption>
      </motion.figure>
    </motion.div>
  )
}

// Platforms that have their own page: [link, the line shown next to the results].
const EXPLORE = {
  eBay: ['/ebay', 'Explore our eBay portfolio to discover our business models, management strategies, and documented store performance.'],
  Etsy: ['/etsy', 'Explore our Etsy portfolio to discover our management strategies, store performance, and documented business results.'],
  Walmart: ['/walmart', 'Explore our Walmart portfolio to discover our business models, fulfillment strategies, and documented store performance.'],
}

// platform = show only that platform (used on a platform's own page). Without it, tabs let the visitor switch.
export function Results({ platform, eyebrow = 'Results', title = 'Real accounts. Real numbers.', em = ['numbers.'] }) {
  const [open, setOpen] = useState(null)
  const platforms = [...new Set(RESULTS.map((r) => r.platform))]
  const [tab, setTab] = useState(platforms[0])
  const active = platform || tab
  const list = RESULTS.filter((r) => r.platform === active)
  return (
    <section className="section rs"><div className="wrap">
      <div className="sec-head">
        <p className="mono-s">{eyebrow}</p>
        <h2 className="serif h2"><Words text={title} em={em} /></h2>
        <Reveal delay={.1}><p className="lead rs-lead">Figures and screenshots taken from the seller dashboards of stores our team manages. Client names stay private.</p></Reveal>
      </div>
      {!platform && platforms.length > 1 && (
        <div className="rs-tabs" role="tablist" aria-label="Platform">
          {platforms.map((pf) => (
            <button key={pf} role="tab" aria-selected={tab === pf} className={'rs-tab' + (tab === pf ? ' on' : '')} onClick={() => setTab(pf)}>
              <PlatformLogo name={pf} /><small>{RESULTS.filter((r) => r.platform === pf).length} accounts</small>
            </button>
          ))}
        </div>
      )}
      <div className="rs-grid" key={active}>
        {list.map((r, i) => (
          <Reveal key={r.id} delay={i * .12} className="rs-card">
            <div className="rs-top">
              <span className="rs-logo"><PlatformLogo name={r.platform} /></span>
              <span className="rs-tag">{r.tag}</span>
            </div>
            <div className="rs-main">
              <p className="mono-s">{r.gmvLabel}</p>
              <div className="rs-big serif"><Money to={r.gmv} prefix={r.currency || '£'} />{r.gmvUp && <em>▲ {r.gmvUp}</em>}</div>
              {r.gmvNote && <small>{r.gmvNote}</small>}
            </div>
            <div className={'rs-shots' + (r.whole ? ' whole' : '')}>
              {r.shots.map((sh, k) => (
                <button key={sh[0]} className={'rs-shot' + (k === 0 ? ' big' : '')} onClick={() => setOpen(sh)} aria-label={'View screenshot: ' + sh[1]}>
                  <img src={sh[0]} alt={sh[1]} loading="lazy" decoding="async" />
                  <span>{sh[1]} <i>⤢</i></span>
                </button>
              ))}
            </div>
            <div className="rs-stats">
              {r.stats.map(([l, v]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}
            </div>
            <ul className="rs-hl">
              {r.highlights.map(([l, v, n]) => <li key={l}><span>{l}</span><b>{v}</b><small>{n}</small></li>)}
            </ul>
            <p className="rs-src">Source: {r.source} · {r.period}</p>
          </Reveal>
        ))}
      </div>
      {!platform && EXPLORE[active] && (
        <Link to={EXPLORE[active][0]} className="rs-explore" key={'x' + active}>
          <span className="rs-explore-l"><PlatformLogo name={active} /></span>
          <span className="rs-explore-t">{EXPLORE[active][1]}</span>
          <span className="rs-explore-a">Explore our {active} portfolio <i>↗</i></span>
        </Link>
      )}
      <AnimatePresence>{open && <Lightbox shot={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div></section>
  )
}
