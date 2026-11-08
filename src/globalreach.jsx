import { lazy, Suspense, useState } from 'react'
import { m as motion } from 'framer-motion'
import { Link, Words, Reveal, ease } from './ui.jsx'
import { UKFlag, USFlag, AUFlag, CAFlag, SAFlag } from './showcase.jsx'

const Globe = lazy(() => import('./Globe.jsx'))

const MARKETS = [
  { code: 'UK', name: 'United Kingdom', Flag: UKFlag, city: 'London' },
  { code: 'US', name: 'United States', Flag: USFlag, city: 'New York' },
  { code: 'AU', name: 'Australia', Flag: AUFlag, city: 'Sydney' },
  { code: 'CA', name: 'Canada', Flag: CAFlag, city: 'Toronto' },
  { code: 'KSA', name: 'Saudi Arabia', Flag: SAFlag, city: 'Riyadh' },
]

export function GlobalReach() {
  const [active, setActive] = useState(null)
  return (
    <section className="section gr"><div className="wrap">
      <div className="gr-box" onMouseLeave={() => setActive(null)}>
        <div className="gr-globe"><Suspense fallback={null}><Globe active={active} /></Suspense></div>
        <div className="gr-shade" />

        <div className="gr-head">
          <motion.p className="gr-eb" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .8, ease }}><i>✦</i> Global reach</motion.p>
          <h2 className="gr-h"><Words text="One team in Multan." /><br /><Words text="12+ markets worldwide." em={['worldwide.']} delay={.2} /></h2>
          <Reveal delay={.25}><p className="gr-p">Wherever your customers are, the same dedicated team is behind your store. Hover one of our five key markets to see the route.</p></Reveal>
        </div>

        <div className="gr-cards">
          {MARKETS.map(({ code, name, Flag, city }, i) => (
            <motion.div key={code} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .8, delay: .1 + i * .08, ease }}>
              <Link to="/talk" className={'gr-card ' + (active === code ? 'on' : '')}
                onMouseEnter={() => setActive(code)} onFocus={() => setActive(code)} onBlur={() => setActive(null)} aria-label={'Talk to us about the ' + name + ' market'}>
                <Flag />
                <span className="gr-n"><b>{name}</b><small>{code} · {city}</small></span>
                <i className="gr-arrow">→</i>
              </Link>
            </motion.div>
          ))}
        </div>

        <Reveal delay={.2} className="gr-bar">
          <span className="gr-ico"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" /></svg></span>
          <b>One partner for your next market.</b>
          <Link to="/talk" className="gr-btn">Discuss your target market <span>→</span></Link>
        </Reveal>
      </div>
    </div></section>
  )
}
