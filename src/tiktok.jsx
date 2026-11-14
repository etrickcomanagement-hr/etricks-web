import { Reveal, Words, Magnetic, BigLink } from './ui.jsx'
import { Results } from './results.jsx'
import { PlatformLogo } from './logos.jsx'
import './ebay.css'

/* All the text on the TikTok Shop page lives here. Edit freely. */
const MARKETS = [
  ['United Kingdom (UK)', 'We help eligible UK-based businesses establish and manage their TikTok Shops, focusing on product research, competitive pricing, supplier coordination, and performance-driven growth strategies.'],
  ['United States (USA)', 'Our team supports eligible US-based sellers with store setup, product sourcing, listing optimization, creator collaborations, and sales growth strategies.'],
]

const MODELS = [
  ['Dropshipping', 'A supplier-fulfilled business model that allows sellers to offer products without maintaining their own warehouse inventory.', 'Our team focuses on product research, supplier coordination, listing optimization, order processing, and fulfillment management.', 'This model is suitable for sellers looking to test eligible products with controlled upfront inventory costs, subject to TikTok Shop’s fulfillment and seller policies.'],
  ['White Label', 'Sell existing products manufactured by suppliers under your own brand identity.', 'We help businesses identify suitable products, coordinate branding and packaging, optimize product listings, and develop strategies to establish their brand presence.', 'White labeling offers opportunities to build brand recognition without developing an entirely new product from scratch.'],
  ['Two-Step Dropshipping', 'A fulfillment approach where products are sourced and transferred to a suitable local warehouse or fulfillment partner before being shipped to customers.', 'Our team coordinates supplier sourcing, inventory planning, warehouse arrangements, and order fulfillment.', 'This approach can help improve delivery reliability and provide greater control over fulfillment, depending on the chosen logistics setup.'],
  ['Private Label', 'Build a distinctive brand by developing or customizing products with manufacturers.', 'We support product research, supplier selection, product development coordination, branding, packaging, and marketplace launch strategies.', 'Private labeling is designed for businesses focused on long-term brand development, product differentiation, and sustainable growth.'],
]

const SERVICES = [
  ['Store Setup & Optimization', ['Seller account setup and verification guidance', 'Store configuration and product category selection', 'Product listing creation and SEO optimization', 'Store health and policy compliance monitoring']],
  ['Product Research & Supplier Management', ['Trending product and competitor research', 'Supplier sourcing and verification', 'Pricing and profit margin analysis', 'Inventory and fulfillment coordination']],
  ['Marketing & Sales Growth', ['TikTok Shop Ads campaign management', 'Affiliate marketing and creator collaborations', 'Product promotion and campaign planning', 'Conversion rate and sales performance optimization']],
  ['Daily Store Operations', ['Order processing and tracking', 'Customer service and return management', 'Inventory and supplier coordination', 'Store performance monitoring and reporting']],
]

const STEPS = [
  ['Research & Planning', 'We analyze market demand, competitors, product opportunities, and the client’s investment to select a suitable business model.'],
  ['Launch & Test', 'Our team sets up the store, prepares product listings, coordinates suppliers, and tests products and marketing strategies.'],
  ['Optimize & Scale', 'We monitor sales, advertising costs, fulfillment performance, and profit margins to identify growth opportunities and support informed scaling decisions.'],
]

const INDICATORS = [
  'Total sales and gross merchandise value (GMV)', 'Product sourcing and fulfillment costs', 'Advertising expenses and return on ad spend (ROAS)',
  'Gross and net profit margins', 'Return on investment (ROI)', 'Order volume and conversion rates',
]

const WHY = [
  'Dedicated TikTok Shop management teams', 'Experience with UK and USA markets', 'Multiple business models', 'Supplier and fulfillment coordination',
  'Affiliate and advertising management', 'Transparent reporting and performance monitoring', 'Flexible business growth strategies',
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

export function TikTokPage() {
  return (
    <>
      <section className="phero eb-hero"><div className="wrap">
        <p className="mono-s">TikTok Shop Management &amp; Business Growth</p>
        <div className="eb-logo" aria-hidden="true"><PlatformLogo name="TikTok Shop" /></div>
        <h1 className="serif"><Words now delay={.5} text="Launch your store. Reach more customers. Scale with eTricks." em={['eTricks.']} /></h1>
        <Reveal delay={.5}><p className="lead">We help entrepreneurs and brands launch, manage, and grow their TikTok Shop businesses through strategic product research, reliable supplier partnerships, content-driven marketing, and dedicated store management. From setting up a new store to managing daily operations and scaling sales, our team provides end-to-end solutions tailored to each client’s business goals and investment.</p></Reveal>
        <Reveal delay={.6}><div className="eb-cta">
          <Magnetic to="/talk" className="btn btn-p" strength={.2}>Discuss your TikTok Shop <span className="arr">→</span></Magnetic>
          <a href="#tiktok-results" className="ulink plain">See store performance <i>↓</i></a>
        </div></Reveal>
      </div></section>

      {/* markets */}
      <section className="section"><div className="wrap">
        <Head eyebrow="(01) Our markets" title="UK and USA." em={['USA.']} lead="We currently focus on two major TikTok Shop markets." />
        <div className="eb-models">
          {MARKETS.map(([t, d], i) => (
            <Reveal key={t} delay={i * .1} className="eb-model"><span className="mono-s">0{i + 1}</span><h3 className="serif">{t}</h3><p>{d}</p></Reveal>
          ))}
        </div>
        <Reveal><p className="eb-note">Both markets offer opportunities to reach customers through TikTok’s content-driven shopping ecosystem.</p></Reveal>
      </div></section>

      {/* business models */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(02) Business models" title="Four ways to sell on TikTok Shop." em={['Shop.']} lead="We offer four flexible business models based on investment capacity, product category, and long-term business objectives." />
        <div className="eb-models">
          {MODELS.map(([t, a, b, c], i) => (
            <Reveal key={t} delay={(i % 2) * .1} className="eb-model">
              <span className="mono-s">0{i + 1}</span>
              <h3 className="serif">{t}</h3>
              <p className="eb-strong">{a}</p>
              <p>{b}</p>
              <p>{c}</p>
            </Reveal>
          ))}
        </div>
      </div></section>

      {/* budget */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="eb-roi">
          <Reveal className="eb-roi-n"><p className="mono-s">(03) Starting budget</p><b className="serif">$2,000</b><span>Estimated, for both UK and USA markets</span></Reveal>
          <div className="eb-roi-t">
            <Reveal><p>We offer TikTok Shop business plans for eligible sellers with an estimated starting budget of $2,000 for both UK and USA markets.</p></Reveal>
            <Reveal delay={.08}><p>Our approach focuses on starting with a manageable investment, testing product demand, monitoring store performance, and gradually increasing the budget as opportunities develop.</p></Reveal>
            <Reveal delay={.14}><p className="eb-disc">The actual investment required depends on the selected business model, product costs, inventory requirements, marketing expenses, and fulfillment arrangements. White Label and Private Label models may require additional capital.</p></Reveal>
          </div>
        </div>
      </div></section>

      {/* services */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(04) What we manage" title="Our TikTok Shop management services." em={['services.']} />
        <div className="eb-svc">
          {SERVICES.map(([t, items], i) => (
            <Reveal key={t} delay={(i % 2) * .1} className="eb-svc-c">
              <span className="mono-s">0{i + 1}</span>
              <h3 className="serif">{t}</h3>
              <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div></section>

      {/* growth strategy */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(05) Our growth strategy" title="Research, launch, then scale." em={['scale.']} />
        <div className="prows">
          {STEPS.map(([t, d], i) => (
            <Reveal key={t} className="prow"><span className="mono-s">Step {i + 1}</span><h3 className="serif">{t}</h3><p>{d}</p></Reveal>
          ))}
        </div>
      </div></section>

      {/* performance & profitability */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap eb-stab">
        <div>
          <p className="mono-s">(06) Performance &amp; profitability</p>
          <h2 className="serif h2"><Words text="Measured on performance, not sales volume alone." em={['alone.']} /></h2>
          <Reveal delay={.1}><p className="lead eb-lead">We focus on measurable business performance rather than sales volume alone.</p></Reveal>
        </div>
        <div>
          <p className="mono-s">Our team monitors key indicators including</p>
          <ul className="eb-list">{INDICATORS.map((s, i) => <Reveal key={s} delay={i * .04}><li><i>✓</i>{s}</li></Reveal>)}</ul>
          <Reveal><p className="eb-p">Through structured reporting and performance analysis, clients can track their store’s progress and make informed investment decisions.</p></Reveal>
        </div>
      </div></section>

      {/* documented store performance */}
      <div id="tiktok-results"><Results platform="TikTok Shop" eyebrow="(07) TikTok Shop portfolio" title="Documented store performance." em={['performance.']} /></div>

      {/* why eTricks */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(08) Why choose eTricks" title="Built for growth." em={['growth.']} lead="We combine dedicated eCommerce teams, market-specific strategies, supplier coordination, and performance-focused management to support TikTok Shop sellers." />
        <div className="eb-why">
          {WHY.map((x, i) => <Reveal key={x} delay={(i % 4) * .05} className="eb-why-i"><i>0{i + 1}</i><b>{x}</b></Reveal>)}
        </div>
        <Reveal><div className="eb-close">
          <h3 className="serif">Build and scale your TikTok Shop with eTricks.</h3>
          <p>Whether you’re launching your first TikTok Shop, exploring a new business model, or planning to expand an existing store, eTricks provides the operational support and expertise to help you move forward.</p>
          <p><a href="#tiktok-results" className="eb-explore">Explore our TikTok Shop portfolio and discover our management approach, business models, and documented store performance. <i>↑</i></a></p>
        </div></Reveal>
      </div></section>

      <BigLink lead="Your business. Our strategy. Built for growth." label="Let's talk" />
    </>
  )
}
