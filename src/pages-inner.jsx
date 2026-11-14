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
          <Reveal><p className="big-p">From your first listing to your busiest sales day, running an online store takes constant attention.</p></Reveal>
          <Reveal delay={.1}><p className="lead" style={{ marginTop: 26 }}>We built eTricks to give store owners a dedicated team they can count on through it all. We keep listings up to date, track orders, and resolve day-to-day issues. With real-time reporting in your client portal, you can check how your store is doing and see what needs your attention at any moment.</p></Reveal>
        </div>
      </div></section>
      <section className="wrap"><div className="vm">
        <Reveal className="vm-c vm-lime"><p className="mono-s dark">Our vision</p><h3 className="serif">An agency the world can trust.</h3><p>To grow an eCommerce agency from Pakistan that store owners everywhere count on.</p></Reveal>
        <Reveal delay={.1} className="vm-c vm-paper"><p className="mono-s dark">Our mission</p><h3 className="serif">Smooth stores. Clear numbers.</h3><p>To keep online stores running well and give owners the information they need to make good decisions.</p></Reveal>
      <Reveal delay={.15} className="vm-os">
        <div className="vm-os-h"><p className="mono-s">The eTricks operating system</p><h3 className="serif">One way of working, behind every store.</h3></div>
        <div className="vm-os-g">
          {[['Listings', 'Every product page written, checked and kept current.'], ['Orders & stock', 'Orders tracked and stock watched, so nothing stalls.'], ['Account health', 'Problems spotted early and fixed before they cost you sales.'], ['Client portal', 'Live reporting, so you always see how your store is doing.']].map(([t, d], i) => (
            <div className="vm-os-i" key={t}><i>0{i + 1}</i><b>{t}</b><span>{d}</span></div>
          ))}
        </div>
      </Reveal></div></section>
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
export function NotFound() {
  return (<><PHero eyebrow="404" title="This page does not exist." em={['exist.']} sub="The link may be old or mistyped. The home page is a good place to start again." /><BigLink lead="Back to the start" to="/" label="Go home" /></>)
}
