import { useEffect, useRef, useState } from 'react'
import { m as motion, animate, useInView } from 'framer-motion'
import { Reveal, Words, ease } from './ui.jsx'
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

/* redrawn sales trend: a simple line + soft fill */
function Trend({ points, id }) {
  const W = 600, H = 150, max = Math.max(...points)
  const xy = points.map((p, i) => [(i / (points.length - 1)) * W, H - 8 - (p / max) * (H - 24)])
  const line = xy.map(([x, y], i) => (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1)).join(' ')
  return (
    <svg className="rs-trend" viewBox={'0 0 ' + W + ' ' + H} preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b6ff00" stopOpacity=".32" /><stop offset="1" stopColor="#b6ff00" stopOpacity="0" /></linearGradient></defs>
      <motion.path d={line + ' L' + W + ' ' + H + ' L0 ' + H + ' Z'} fill={'url(#' + id + ')'} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: .9 }} />
      <motion.path d={line} fill="none" stroke="#b6ff00" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 2, ease: [.76, 0, .24, 1] }} />
    </svg>
  )
}

export function Results() {
  return (
    <section className="section rs"><div className="wrap">
      <div className="sec-head">
        <p className="mono-s">Results</p>
        <h2 className="serif h2"><Words text="Real accounts. Real numbers." em={['numbers.']} /></h2>
        <Reveal delay={.1}><p className="lead rs-lead">Figures taken from the seller dashboards of stores our team manages. Client names stay private.</p></Reveal>
      </div>
      <div className="rs-grid">
        {RESULTS.map((r, i) => (
          <Reveal key={r.id} delay={i * .12} className="rs-card">
            <div className="rs-top">
              <span className="rs-logo"><PlatformLogo name={r.platform} /></span>
              <span className="rs-tag">{r.tag}</span>
            </div>
            <div className="rs-main">
              <p className="mono-s">{r.gmvLabel}</p>
              <div className="rs-big serif"><Money to={r.gmv} />{r.gmvUp && <em>▲ {r.gmvUp}</em>}</div>
              {r.gmvNote && <small>{r.gmvNote}</small>}
            </div>
            <Trend points={r.trend} id={'rs-g-' + r.id} />
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
    </div></section>
  )
}
