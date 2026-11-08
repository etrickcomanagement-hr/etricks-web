import { m as motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Words, Magnetic, Link, ease } from './ui.jsx'
import Liquid from './Liquid.jsx'
import { LogoMarquee, Rotator, LogoRow } from './logos.jsx'
import { TalkSection } from './talk.jsx'
import GiantMarquee from './GiantMarquee.jsx'
import { GlobalReach } from './globalreach.jsx'
import { Faq, ContactBox } from './sections.jsx'
import { Statement, ServiceRows, PlatformStack, ProcessRows, Promises, TeamHover } from './blocks.jsx'

export function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]), o = useTransform(scrollYProgress, [0, .75], [1, 0])
  return (
    <>
      <section className="hero" ref={ref}>
        <Liquid /><div className="hero-shade" />
        <motion.div className="wrap hero-in" style={{ y, opacity: o }}>
          <h1 className="serif hero-h">
            <Words now delay={.45} text="We launch," /><br />
            <Words now delay={.55} text="scale & fix" /><br />
            <Words now delay={.65} text="stores on" />
            <motion.span style={{ display: 'block' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: .5 }}><Rotator /></motion.span>
          </h1>
          <div className="hero-bot">
            <motion.div className="hero-l" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8, duration: .8, ease }}>
              <p>A dedicated team for every store. We run, rescue and grow your marketplace and Shopify accounts, so you can get on with the business.</p>
              <div className="hero-cta">
                <Magnetic to="/talk" className="btn btn-p" strength={.2}>Book a free call <span className="arr">↗</span></Magnetic>
                <Link to="/services" className="ulink plain">See what we do <i>→</i></Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: .8 }}><LogoRow /></motion.div>
          </div>
        </motion.div>
      </section>
      <LogoMarquee />
      <Statement />
      <TalkSection compact />
      <ServiceRows />
      <PlatformStack />
      <ProcessRows />
      <Promises />
      <GlobalReach />
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head">
          <p className="mono-s">(05) The team</p>
          <h2 className="serif h2"><Words text="Different people. One eTricks." em={['eTricks.']} /></h2>
        </div>
        <TeamHover limit={6} />
        <div style={{ marginTop: 36 }}><Link to="/team" className="ulink">Meet the whole team <i>↗</i></Link></div>
      </div></section>
      <Faq />
      <ContactBox />
      <GiantMarquee />
    </>
  )
}
