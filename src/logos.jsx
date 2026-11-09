import { useEffect, useState } from 'react'
import { m as motion, AnimatePresence } from 'framer-motion'
import { PLATFORMS } from './data.js'

/* Simple wordmark-style marks for the platforms we work with (names shown in each brand's colours). */
const Spark = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" style={{ marginLeft: 4 }}>
    {[0, 60, 120, 180, 240, 300].map((a) => <rect key={a} x="11" y="1" width="2.4" height="8" rx="1.2" fill="#ffc220" transform={`rotate(${a} 12 12)`} />)}
  </svg>
)

const MARKS = {
  Amazon: () => (
    <span className="lg" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
      <b style={{ fontWeight: 600, letterSpacing: '-.04em' }}>amazon</b>
      <svg viewBox="0 0 80 14" width="3.3em" height=".5em" aria-hidden="true" style={{ marginTop: '-.22em' }}><path d="M4 3c18 9 46 9 68 0" fill="none" stroke="#ff9900" strokeWidth="3.4" strokeLinecap="round" /><path d="M66 1l8 2-5 6" fill="none" stroke="#ff9900" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  ),
  eBay: () => (
    <span className="lg" style={{ fontWeight: 700, letterSpacing: '-.06em', gap: 0 }}>
      <b style={{ color: '#e53238' }}>e</b><b style={{ color: '#0064d2' }}>b</b><b style={{ color: '#f5af02' }}>a</b><b style={{ color: '#86b817' }}>y</b>
    </span>
  ),
  'TikTok Shop': () => (
    <span className="lg">
      <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
        <path d="M17 3.2c.3 2.3 1.6 3.7 3.8 3.9v3a7 7 0 01-3.8-1.2v6.2a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v3.2a2.5 2.5 0 101.7 2.3V3.2z" fill="#25f4ee" transform="translate(-.6 -.4)" />
        <path d="M17 3.2c.3 2.3 1.6 3.7 3.8 3.9v3a7 7 0 01-3.8-1.2v6.2a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v3.2a2.5 2.5 0 101.7 2.3V3.2z" fill="#fe2c55" transform="translate(.6 .4)" />
        <path d="M17 3.2c.3 2.3 1.6 3.7 3.8 3.9v3a7 7 0 01-3.8-1.2v6.2a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v3.2a2.5 2.5 0 101.7 2.3V3.2z" fill="currentColor" />
      </svg>
      <b style={{ fontWeight: 600, letterSpacing: '-.03em' }}>TikTok Shop</b>
    </span>
  ),
  Walmart: () => (
    <span className="lg"><b style={{ color: '#2a86e8', fontWeight: 600, letterSpacing: '-.04em' }}>Walmart</b><Spark /></span>
  ),
  Shopify: () => (
    <span className="lg">
      <svg viewBox="0 0 24 26" width=".95em" height="1em" aria-hidden="true">
        <path d="M4 7.5L5.6 24l11.8-2.6L19 7.5z" fill="#95bf47" /><path d="M8 7.5C8 4 9.6 2 12 2s4 2 4 5.5" fill="none" stroke="#95bf47" strokeWidth="2" /><path d="M12.6 12.4c-2-.9-3.4-.2-3.4 1 0 2 3.5 1.6 3.5 4 0 1.2-1 2-2.6 1.7" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <b style={{ fontWeight: 600, letterSpacing: '-.04em', color: 'var(--shop, #c9e08a)' }}>shopify</b>
    </span>
  ),
  Etsy: () => (
    <span className="lg"><b style={{ color: '#f1641e', fontFamily: 'var(--serif)', fontWeight: 400, letterSpacing: '-.02em' }}>Etsy</b></span>
  ),
  Temu: () => (
    <span className="lg"><b style={{ color: '#fb7701', fontWeight: 800, letterSpacing: '.02em' }}>TEMU</b></span>
  ),
}

export function PlatformLogo({ name }) { const M = MARKS[name]; return M ? <M /> : <span className="lg">{name}</span> }

/* continuously moving logo strip */
export function LogoMarquee() {
  const items = [...PLATFORMS, ...PLATFORMS]
  return (
    <div className="lmq" aria-label="Platforms we manage">
      <div className="lmq-track">
        {items.map((p, i) => (
          <span className="lmq-i" key={i}><PlatformLogo name={p} /><i className="lmq-dot" /></span>
        ))}
        {items.map((p, i) => (
          <span className="lmq-i" key={'b' + i} aria-hidden="true"><PlatformLogo name={p} /><i className="lmq-dot" /></span>
        ))}
      </div>
    </div>
  )
}

/* the platform name in the headline keeps changing */
export function Rotator({ delay = 2600 }) {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((n) => (n + 1) % PLATFORMS.length), delay); return () => clearInterval(t) }, [delay])
  return (
    <span className="rot" aria-live="polite" aria-label={PLATFORMS[i]}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={PLATFORMS[i]} className="rot-in" initial={{ y: '105%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-105%', opacity: 0 }} transition={{ duration: .6, ease: [.16, 1, .3, 1] }}>
          <PlatformLogo name={PLATFORMS[i]} />
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* small static row of logos for the hero */
export function LogoRow() {
  return (
    <div className="lrow">
      <span className="mono-s" style={{ margin: 0 }}>We run stores on</span>
      <div className="lrow-l">{PLATFORMS.map((p) => <PlatformLogo key={p} name={p} />)}</div>
    </div>
  )
}
