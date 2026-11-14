import { Reveal, Words, Magnetic, BigLink } from './ui.jsx'
import { Results } from './results.jsx'
import { PlatformLogo } from './logos.jsx'
import './ebay.css'

/* All the text on the Etsy page lives here. Edit freely. */
const REGIONS = [
  ['North America', 'USA, Canada, Mexico'],
  ['Europe', 'UK, Germany, France, Italy, Spain, Netherlands, and other supported European countries'],
  ['Asia', 'Pakistan, India, Japan, Malaysia, Singapore, and other eligible markets'],
  ['Middle East', 'UAE, Türkiye, Israel'],
  ['Oceania', 'Australia, New Zealand'],
  ['Africa', 'South Africa, Egypt, Morocco'],
  ['South America', 'Argentina, Brazil, Chile, Peru'],
]

const MODELS = [
  ['Dropshipping Model', 'We support eligible supplier-fulfilled selling arrangements, including sourcing through Amazon and AliExpress where the products and fulfillment methods comply with Etsy’s policies.', 'Our team manages product research, listing optimization, supplier coordination, and order processing.'],
  ['Supplier-Based Model', 'We collaborate with suppliers and production partners to develop, source, and fulfill Etsy-eligible products based on the client’s investment and business requirements.', 'Our focus is on product quality, reliable fulfillment, and sustainable store growth.'],
]

const SERVICES = [
  'Etsy account setup and store configuration', 'Product research and niche analysis', 'Supplier sourcing and coordination', 'SEO-focused product listings',
  'Order processing and fulfillment management', 'Customer service and dispute handling', 'Etsy Ads and promotional campaigns',
  'Store performance and account health monitoring', 'Sales, profit, and ROI reporting', 'Business scaling and growth strategies',
]

function Head({ eyebrow, title, em, lead }) {
  return (
    <div className="sec-head">
      <p className="mono-s">{eyebrow}</p>
      <h2 className="serif h2"><Words text={title} em={em} /></h2>
      {lead && <Reveal delay={.1}><p className="lead eb-lead">{lead}</p></Reveal>}
    </div>
  )
}

export function EtsyPage() {
  return (
    <>
      <section className="phero eb-hero"><div className="wrap">
        <p className="mono-s">Etsy Store Management &amp; Global Selling Solutions</p>
        <div className="eb-logo" aria-hidden="true"><PlatformLogo name="Etsy" /></div>
        <h1 className="serif"><Words now delay={.5} text="Launch globally. Manage professionally. Scale strategically." em={['strategically.']} /></h1>
        <Reveal delay={.5}><p className="lead">We help entrepreneurs establish, manage, and grow their Etsy businesses through dedicated management teams, strategic product research, reliable supplier coordination, and performance-driven operations.</p></Reveal>
        <Reveal delay={.6}><div className="eb-cta">
          <Magnetic to="/talk" className="btn btn-p" strength={.2}>Discuss your Etsy store <span className="arr">→</span></Magnetic>
          <a href="#etsy-results" className="ulink plain">See store performance <i>↓</i></a>
        </div></Reveal>
      </div></section>

      {/* global market coverage */}
      <section className="section"><div className="wrap">
        <Head eyebrow="(01) Global market coverage" title="UK and USA accounts, customers worldwide." em={['worldwide.']} lead="We currently manage UK and USA-based Etsy seller accounts, serving customers across international markets. Our team also assists eligible entrepreneurs with Etsy account setup and management across supported regions." />
        <div className="et-regions">
          {REGIONS.map(([r, c], i) => <Reveal key={r} delay={(i % 4) * .05} className="eb-why-i"><i>0{i + 1}</i><div><b>{r}</b><span>{c}</span></div></Reveal>)}
        </div>
        <Reveal><p className="eb-disc" style={{ marginTop: 22 }}>We help sellers explore worldwide selling opportunities through Etsy-supported accounts, subject to country eligibility, identity verification, payment requirements, and international shipping policies.</p></Reveal>
      </div></section>

      {/* one company, three stores */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="eb-roi">
          <Reveal className="eb-roi-n"><p className="mono-s">(02) Multi-store strategy</p><b className="serif">1 → 3</b><span>One company. Three Etsy stores.</span></Reveal>
          <div className="eb-roi-t">
            <Reveal><p>For entrepreneurs planning to establish a UK LTD or US LLC, eTricks offers a structured multi-store business strategy.</p></Reveal>
            <Reveal delay={.08}><p>Our approach supports the setup and management of up to three Etsy stores under one registered business, where permitted by Etsy’s policies.</p></Reveal>
            <Reveal delay={.14}><p>Each store can target a different niche, product category, or customer segment, creating opportunities for business diversification and long-term growth.</p></Reveal>
          </div>
        </div>
      </div></section>

      {/* business models */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(03) Business models" title="Two ways to sell on Etsy." em={['Etsy.']} />
        <div className="eb-models">
          {MODELS.map(([t, a, b], i) => (
            <Reveal key={t} delay={i * .1} className="eb-model">
              <span className="mono-s">0{i + 1}</span>
              <h3 className="serif">{t}</h3>
              <p className="eb-strong">{a}</p>
              <p>{b}</p>
            </Reveal>
          ))}
        </div>
      </div></section>

      {/* investment + ROI */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(04) Investment & ROI" title="Start with a $1,000 investment." em={['investment.']} />
        <div className="eb-invest">
          <Reveal className="eb-inv eb-inv-lime">
            <p className="mono-s">Etsy business plans</p>
            <div className="eb-inv-n"><small>Estimated starting budget</small><b className="serif">$1,000</b></div>
            <p className="eb-strong">We offer flexible Etsy business plans for eligible sellers with an estimated starting budget of $1,000.</p>
            <p>Our strategy begins with product testing, controlled investment, and performance monitoring. As the business develops, clients can gradually increase their investment based on results and growth opportunities.</p>
          </Reveal>
          <div className="et-roi2">
            <Reveal delay={.1} className="eb-inv">
              <p className="mono-s">Target ROI</p>
              <div className="eb-inv-n"><b className="serif et-lime">70–80%</b></div>
              <p>Our proposed ROI target for selected Etsy projects, depending on product selection, operating expenses, and market performance.</p>
            </Reveal>
            <Reveal delay={.16} className="eb-inv">
              <p className="mono-s">Reported historical ROI</p>
              <div className="eb-inv-n"><small>Up to</small><b className="serif et-lime">200%</b></div>
              <p>Some of our existing store operations have reportedly generated returns of up to 200% over specific reporting periods.</p>
            </Reveal>
          </div>
        </div>
        <Reveal><p className="eb-disc" style={{ marginTop: 18 }}>These figures represent targets or reported historical performance, not guaranteed returns. Actual ROI depends on investment, revenue, product costs, marketplace fees, and operating expenses.</p></Reveal>
      </div></section>

      {/* services */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(05) What we manage" title="Our Etsy management services." em={['services.']} />
        <div className="et-svc">
          {SERVICES.map((x, i) => <Reveal key={x} delay={(i % 2) * .06} className="et-svc-i"><i>{String(i + 1).padStart(2, '0')}</i><b>{x}</b></Reveal>)}
        </div>
      </div></section>

      {/* documented store performance */}
      <div id="etsy-results"><Results platform="Etsy" eyebrow="(06) Etsy portfolio" title="Documented store performance." em={['performance.']} /></div>

      {/* why eTricks */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(07) Why eTricks" title="A reliable management experience." em={['experience.']} />
        <div className="eb-two" style={{ marginTop: 0 }}>
          <Reveal><p>We combine dedicated eCommerce teams, structured store management, and transparent client reporting to help businesses manage their Etsy operations efficiently.</p></Reveal>
          <Reveal delay={.1}><p>From store setup to daily operations and performance optimization, our goal is to provide a reliable management experience focused on long-term growth.</p></Reveal>
        </div>
      </div></section>

      <BigLink lead="Build your Etsy business with eTricks." label="Let's talk" />
    </>
  )
}
