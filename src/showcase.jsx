import { useRef } from 'react'
import { m as motion, useScroll, useTransform } from 'framer-motion'
import { Link, Words, ease } from './ui.jsx'
import Shape3D from './Shape3DLazy.jsx'

/* ---------- flags (simple vector drawings) ---------- */
function UKFlag() {
  return (
    <svg viewBox="0 0 60 30" className="flag" aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30 0V30M0 15H60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}
function USFlag() {
  const stars = []
  for (let r = 0; r < 9; r++) for (let c = 0; c < (r % 2 ? 5 : 6); c++) stars.push([(r % 2 ? 6.3 + c * 12.6 : 3.2 + c * 12.6), 3.1 + r * 5.6])
  return (
    <svg viewBox="0 0 190 100" className="flag" aria-hidden="true">
      <rect width="190" height="100" fill="#fff" />
      {[...Array(7)].map((_, i) => <rect key={i} y={i * 15.38} width="190" height="7.69" fill="#B22234" />)}
      <rect width="76" height="53.8" fill="#3C3B6E" />
      {stars.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.7" fill="#fff" />)}
    </svg>
  )
}

function star(cx, cy, r, n = 5) {
  return Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * i) / n - Math.PI / 2, rr = i % 2 ? r * 0.42 : r
    return (cx + rr * Math.cos(a)).toFixed(2) + ',' + (cy + rr * Math.sin(a)).toFixed(2)
  }).join(' ')
}
function AUFlag() {
  return (
    <svg viewBox="0 0 60 30" className="flag" aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <g transform="scale(.5)">
        <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6" /><path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2" />
        <path d="M30 0V30M0 15H60" stroke="#fff" strokeWidth="10" /><path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" />
      </g>
      <polygon points={star(15, 23, 4.2, 7)} fill="#fff" />
      <polygon points={star(46, 6, 2.2, 7)} fill="#fff" /><polygon points={star(52, 14, 2.2, 7)} fill="#fff" />
      <polygon points={star(46, 24, 2.2, 7)} fill="#fff" /><polygon points={star(39, 14, 2.2, 7)} fill="#fff" />
      <polygon points={star(47.5, 16, 1.2, 5)} fill="#fff" />
    </svg>
  )
}
function CAFlag() {
  return (
    <svg viewBox="0 0 60 30" className="flag" aria-hidden="true">
      <rect width="60" height="30" fill="#D52B1E" />
      <rect x="15" width="30" height="30" fill="#fff" />
      <path d="M30 5l2.1 4.3 2.7-.9-1 6 2.7-2.2.9 2.1-3.9 3.3.7 1.9-4-.7V25h-1.4v-4.2l-4 .7.7-1.9-3.9-3.3.9-2.1 2.7 2.2-1-6 2.7.9z" fill="#D52B1E" />
    </svg>
  )
}
function SAFlag() {
  return (
    <svg viewBox="0 0 60 40" className="flag" aria-hidden="true">
      <rect width="60" height="40" fill="#006C35" />
      <path d="M10 14q3.2-5 6.4 0t6.4 0 6.4 0 6.4 0 6.4 0 6.4 0" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="13" y="29" width="34" height="1.8" rx=".9" fill="#fff" /><rect x="11" y="27.6" width="3" height="4.6" rx="1" fill="#fff" />
    </svg>
  )
}

const CARDS = [
  { code: 'UK', name: ['United', 'Kingdom', '(UK)'], Flag: UKFlag, text: 'We manage TikTok Shop, eBay, Etsy, Amazon and Shopify stores for UK sellers, with full compliance, creative optimisation and steady growth.' },
  { code: 'US', name: ['United', 'States', '(US)'], Flag: USFlag, text: 'We manage TikTok Shop, eBay, Etsy, Walmart, Amazon and Shopify stores for US sellers, with full compliance, creative optimisation and steady growth.' },
  { code: 'AU', name: ['Australia', '(AU)'], Flag: AUFlag, text: 'We manage TikTok Shop, eBay, Etsy, Amazon and Shopify stores for Australian sellers, with local compliance, creative optimisation and steady growth.' },
  { code: 'CA', name: ['Canada', '(CA)'], Flag: CAFlag, text: 'We manage Amazon, eBay, Etsy, Walmart and Shopify stores for Canadian sellers, with full compliance, careful listings and steady growth.' },
  { code: 'KSA', name: ['Saudi', 'Arabia', '(KSA)'], Flag: SAFlag, text: 'We manage Amazon and Shopify stores for sellers in Saudi Arabia, with marketplace compliance, clear listings and steady growth.' },
]

function Photo({ src, alt, className, from = 0, speed = 40, delay = 0 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])
  return (
    <motion.div ref={ref} className={'sc-photo ' + className}
      initial={{ clipPath: 'inset(100% 0 0 0 round 30px)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0 0 0 round 30px)', opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1.3, delay, ease: [.76, 0, .24, 1] }}>
      <motion.img src={src} alt={alt} loading="lazy" decoding="async" style={{ y }} initial={{ scale: 1.25 }} whileInView={{ scale: 1.08 }} viewport={{ once: true }} transition={{ duration: 1.8, delay, ease }} />
    </motion.div>
  )
}

export function MarketsShowcase() {
  return (
    <section className="section scs"><div className="wrap">
      <div className="sc-grid">
        {/* left: collage */}
        <div className="sc-collage">
          <Shape3D shape="bubble" className="sc-bubble" speed={.6} />
          <svg className="sc-arc" viewBox="0 0 500 620" aria-hidden="true">
            <motion.path d="M-30 600 C 60 560 150 520 230 420 C 270 370 290 330 300 280" fill="none" stroke="#b6ff00" strokeWidth="52" strokeLinecap="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1.8, ease: [.76, 0, .24, 1] }} />
          </svg>
          <Photo src="/about-a.webp" alt="Colleagues working together in a bright office" className="sc-a" speed={36} />
          <Photo src="/about-b.webp" alt="A team gathered around a laptop, smiling" className="sc-b" speed={-28} delay={.25} />
          <motion.div className="sc-badge" initial={{ scale: 0, rotate: -90 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ type: 'spring', stiffness: 160, damping: 14, delay: .9 }}>
            <span className="sc-ring" />
            <span className="sc-disc"><img src="/logo.webp" alt="eTricks" /></span>
          </motion.div>
        </div>

        {/* right: copy and market cards */}
        <div className="sc-copy">
          <Shape3D shape="jack" className="sc-jack" speed={.8} />
          <motion.p className="sc-eb" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .8, ease }}><i>✦</i> About us</motion.p>
          <h2 className="sc-h"><Words text="Our Markets" em={['Markets']} /></h2>
          <motion.p className="sc-p" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .9, delay: .15, ease }}>
            We help brands grow across the world's most valuable eCommerce markets, with a tailored plan for every country and platform. Our five key markets are below.
          </motion.p>
          <div className="sc-cards">
            {CARDS.map(({ code, name, Flag, text }, i) => (
              <motion.article key={code} className="mcard"
                initial={{ opacity: 0, x: 90 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 1, delay: .2 + i * .18, ease }}>
                <div className="mc-l"><Flag /><b>{name.map((n) => <span key={n}>{n}</span>)}</b></div>
                <div className="mc-r"><p>{text}</p></div>
              </motion.article>
            ))}
          </div>
          <motion.div className="sc-btn" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8, delay: .6, ease }}>
            <Link to="/services" className="sc-more">Discover More</Link>
            <Link to="/services" className="sc-go" aria-label="Discover more">↗</Link>
          </motion.div>
        </div>
      </div>
      <div className="sc-ghost serif" aria-hidden="true">About</div>
    </div></section>
  )
}

export { UKFlag, USFlag, AUFlag, CAFlag, SAFlag }
