import { useRef, useState } from 'react'
import { m as motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Reveal, Words } from './ui.jsx'
import { OFFICE, PILLARS, WORK_STEPS } from './data.js'

/* ---------- Multan office band ---------- */
export function OfficeBand() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <section className="wrap">
      <Reveal>
        <div className="obx" ref={ref}>
          <motion.div className="obx-bg" style={{ y }}>
            {OFFICE.img ? <img decoding="async" src={OFFICE.img} alt={'The eTricks office in ' + OFFICE.city} /> : <div className="obx-art" aria-hidden="true" />}
          </motion.div>
          <div className="obx-shade" />
          {!OFFICE.img && <div className="obx-pin" aria-hidden="true"><i /><i /><i /><b /></div>}
          <div className="obx-cap">
            <span className="mono-s">Based in</span>
            <b className="serif">{OFFICE.city}</b>
          </div>
          <span className="obx-co mono-s">{OFFICE.coords}</span>
        </div>
      </Reveal>
      {!OFFICE.img && <p className="note-s">Placeholder artwork. Add an office photo and set OFFICE.img in src/data.js.</p>}
    </section>
  )
}

/* ---------- three pillars ---------- */
const ICONS = [
  <g key="a" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="3" /><circle cx="5.5" cy="10" r="2.2" /><circle cx="18.5" cy="10" r="2.2" /><path d="M6.5 19c0-3 2.4-5 5.5-5s5.5 2 5.5 5M1.8 18c.2-2 1.6-3.4 3.7-3.4M22.2 18c-.2-2-1.6-3.4-3.7-3.4" /></g>,
  <g key="b" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19h20M10 16v3M14 16v3" /></g>,
  <g key="c" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="12" width="3.6" height="7" rx=".8" /><rect x="10.2" y="8" width="3.6" height="11" rx=".8" /><rect x="16.4" y="4" width="3.6" height="15" rx=".8" /></g>,
]
export function Pillars() {
  return (
    <section className="section" style={{ paddingBottom: 0 }}><div className="wrap">
      <div className="pillars">
        {PILLARS.map(([t, d], i) => (
          <Reveal key={t} delay={i * .1} className="pillar">
            <span className="pl-ico"><svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">{ICONS[i]}</svg></span>
            <h3 className="serif">{t}</h3>
            <p>{d}</p>
          </Reveal>
        ))}
      </div>
    </div></section>
  )
}

/* ---------- how we work: a line that fills as you scroll ---------- */
export function WorkTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const w = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const [p, setP] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setP(v))
  return (
    <section className="section"><div className="wrap">
      <div className="sec-head">
        <p className="mono-s">(03) How we work with you</p>
        <h2 className="serif h2"><Words text="Three steps, and no guesswork." em={['guesswork.']} /></h2>
      </div>
      <div className="wtl" ref={ref}>
        <div className="wtl-line"><motion.i style={{ width: w }} /></div>
        {WORK_STEPS.map(([t, d], i) => (
          <div key={t} className={'wtl-s ' + (p >= i / (WORK_STEPS.length - 1) - 0.05 ? 'on' : '')}>
            <span className="wtl-n"><i />0{i + 1}</span>
            <h3 className="serif">{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </div></section>
  )
}
