import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal, Words, Magnetic, BigLink, Link, ease } from './ui.jsx'
import Liquid from './Liquid.jsx'
import { LogoMarquee, Rotator, LogoRow } from './logos.jsx'
import { TalkSection } from './talk.jsx'
import { FounderSpotlight } from './founder.jsx'
import { OfficeBand, Pillars, WorkTimeline } from './aboutblocks.jsx'
import { MarketsShowcase } from './showcase.jsx'
import GiantMarquee from './GiantMarquee.jsx'
import { GlobalReach } from './globalreach.jsx'
import { Faq, ContactBox } from './sections.jsx'
import { Statement, ServiceRows, PlatformStack, ProcessRows, Promises, TeamHover } from './blocks.jsx'
import { TeamCards } from './teamprofile.jsx'
import { PLATFORMS } from './data.js'

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
            <Words now delay={1.5} text="We launch," /><br />
            <Words now delay={1.62} text="scale & fix" /><br />
            <Words now delay={1.74} text="stores on" />
            <motion.span style={{ display: 'block' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3, duration: .6 }}><Rotator /></motion.span>
          </h1>
          <div className="hero-bot">
            <motion.div className="hero-l" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 1, ease }}>
              <p>A dedicated team for every store. We run, rescue and grow your marketplace and Shopify accounts, so you can get on with the business.</p>
              <div className="hero-cta">
                <Magnetic to="/talk" className="btn btn-p" strength={.2}>Book a free call <span className="arr">↗</span></Magnetic>
                <Link to="/services" className="ulink plain">See what we do <i>→</i></Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 1 }}><LogoRow /></motion.div>
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

function PHero({ eyebrow, title, em, sub }) {
  return (
    <section className="phero"><div className="wrap">
      <p className="mono-s">{eyebrow}</p>
      <h1 className="serif"><Words now delay={.5} text={title} em={em} /></h1>
      {sub && <Reveal delay={.5}><p className="lead">{sub}</p></Reveal>}
    </div></section>
  )
}

export function About() {
  return (
    <>
      <PHero eyebrow="About eTricks" title="Based in Pakistan. Built for global eCommerce." em={['eCommerce.']} sub="From our office in Multan we help sellers open online stores, run them every day and decide what to do next." />
      <OfficeBand />
      <Pillars />
      <section className="section"><div className="wrap split">
        <div><p className="mono-s">(01) Our story</p><h2 className="serif h2"><Words text="Why we built eTricks." em={['eTricks.']} /></h2></div>
        <div>
          <Reveal><p className="big-p">Launching a store is the easy bit. After that come the stale listings, the orders that need chasing and the problems nobody warned you about.</p></Reveal>
          <Reveal delay={.1}><p className="lead" style={{ marginTop: 26 }}>We built eTricks so store owners would have a team they can rely on for exactly that work: hands-on management, a dedicated team and clear reporting, every week.</p></Reveal>
        </div>
      </div></section>
      <section className="wrap"><div className="vm">
        <Reveal className="vm-c vm-lime"><p className="mono-s dark">Our vision</p><h3 className="serif">An agency the world can trust.</h3><p>To grow an eCommerce agency from Pakistan that store owners everywhere count on.</p></Reveal>
        <Reveal delay={.1} className="vm-c vm-paper"><p className="mono-s dark">Our mission</p><h3 className="serif">Smooth stores. Clear numbers.</h3><p>To keep online stores running well and give owners the information they need to make good decisions.</p></Reveal>
      </div></section>
      <MarketsShowcase />
      <WorkTimeline />
      <FounderSpotlight />
      <BigLink />
    </>
  )
}

export function ServicesPage() {
  return (<><PHero eyebrow="Services" title="The right support for your next step." em={['step.']} sub="Every store has its own goals and its own problems. We start by understanding yours." /><ServiceRows title="Services" intro="Pick one, or let us run it all." /><PlatformStack /><ProcessRows /><Faq /><BigLink /></>)
}
export function TeamPage() {
  return (<><PHero eyebrow="The team" title="Different people. One eTricks." em={['eTricks.']} sub="The people who bring their skills, ideas and care to every project." /><section className="wrap" style={{ paddingBottom: 40 }}><TeamCards /></section><BigLink lead="Want to work with us?" /></>)
}
export function ContactPage() {
  return (<><PHero eyebrow="Contact" title="Let's talk about your business." em={['business.']} /><ContactBox /></>)
}
