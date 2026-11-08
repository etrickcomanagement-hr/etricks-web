import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal, Words, Magnetic, Link, ease } from './ui.jsx'
import { FOUNDER } from './data.js'

/* Portrait: black-and-lime duotone by default, full colour on hover. */
function Portrait() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  return (
    <div className="fphoto" ref={ref}>
      <motion.div className="fp-img">
        <img className="fp-color" src={FOUNDER.img} alt={FOUNDER.name + ', ' + FOUNDER.role + ' of eTricks'} />
      </motion.div>
      <div className="fp-shade" />
      <div className="fp-tag"><b className="serif">{FOUNDER.name}</b><span>{FOUNDER.role}</span></div>
      <svg className="fp-badge" viewBox="0 0 120 120" aria-hidden="true">
        <defs><path id="fpc" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs>
        <g className="fp-spin"><text><textPath href="#fpc">FOUNDER &amp; CEO · eTRICKS · FOUNDER &amp; CEO · eTRICKS ·</textPath></text></g>
        <circle cx="60" cy="60" r="5" fill="#b6ff00" />
      </svg>
    </div>
  )
}

export function FounderSpotlight() {
  return (
    <section className="section founder-sec"><div className="wrap fsplit">
      <div className="fleft"><Reveal y={50}><Portrait /></Reveal></div>
      <div className="fright">
        <p className="mono-s">(04) The founder</p>
        <h2 className="serif h2"><Words text={'Meet ' + FOUNDER.name + '.'} em={[FOUNDER.name.split(' ').pop() + '.']} /></h2>
        <Reveal delay={.1}><blockquote className="fquote serif">"{FOUNDER.quote}"</blockquote></Reveal>
        <Reveal delay={.15}><p className="lead">{FOUNDER.name}, {FOUNDER.role}, built eTricks to give store owners a team they can count on. That idea shapes how we work every day.</p></Reveal>

        <p className="mono-s" style={{ marginTop: 'clamp(50px,7vw,90px)' }}>(05) What he believes</p>
        <div className="ideo">
          {FOUNDER.principles.map(([t, d], i) => (
            <Reveal key={t} className="ideo-i" y={26}>
              <span className="mono-s">0{i + 1}</span>
              <div><h3 className="serif">{t}</h3><p>{d}</p></div>
            </Reveal>
          ))}
        </div>
        <Reveal><div className="f-cta">
          <Magnetic to="/talk" className="btn btn-p" strength={.2}>Talk to the team <span className="arr">↗</span></Magnetic>
          <Link to="/team" className="ulink plain">Meet the team <i>→</i></Link>
        </div></Reveal>
      </div>
    </div></section>
  )
}
