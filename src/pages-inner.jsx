import { Reveal, Words, BigLink } from './ui.jsx'
import { FounderSpotlight } from './founder.jsx'
import { OfficeBand, Pillars, WorkTimeline } from './aboutblocks.jsx'
import { MarketsShowcase } from './showcase.jsx'
import { Faq, ContactBox } from './sections.jsx'
import { ServiceRows, PlatformStack, ProcessRows } from './blocks.jsx'
import { TeamCards } from './teamprofile.jsx'

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
