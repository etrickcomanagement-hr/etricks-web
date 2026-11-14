import { Reveal, Words, Magnetic, BigLink } from './ui.jsx'
import { Results } from './results.jsx'
import { PlatformLogo } from './logos.jsx'
import './ebay.css'

/* All the text on the eBay page lives here. Edit freely. */
const MARKETS = ['United Kingdom (UK)', 'United States (USA)', 'Australia', 'Canada', 'Italy', 'Germany', 'France']

const MODELS = [
  ['Supplier-Based Dropshipping', 'Our dropshipping model focuses on working with reliable wholesale suppliers to sell products without maintaining large amounts of inventory.', 'We handle product research, supplier coordination, listing optimization, order processing, and customer support. Our strategy prioritizes reliable fulfillment, competitive pricing, and compliance with eBay’s dropshipping policies.'],
  ['White Label', 'We help businesses sell existing products under their own brand identity through suitable manufacturing and supplier partnerships.', 'Our team supports product selection, supplier coordination, branding, packaging, and listing optimization. This model offers opportunities to develop brand recognition while using established products.'],
  ['Stock-Based Selling', 'Our stock-based model focuses on purchasing and maintaining inventory for direct selling through eBay.', 'We help clients identify suitable products, manage purchasing, coordinate storage and fulfillment, and optimize product listings. This approach provides greater control over inventory availability, delivery performance, and order management.'],
  ['Private Label', 'We support businesses looking to develop their own branded product lines through manufacturer and supplier partnerships.', 'Our team assists with product research, supplier selection, product customization, branding, packaging, and marketplace launch strategies. Private labeling is suitable for entrepreneurs focused on building a long-term brand with greater product differentiation.'],
]

const INVEST = [
  ['New eBay Stores', 'Starting from', '$1,000', 'For newly created eBay stores, clients can begin with an estimated investment of $1,000.', 'Our approach focuses on controlled product testing, account development, supplier coordination, and gradual growth while working within the store’s selling limits.'],
  ['Established eBay Stores', 'Recommended', '$3,000+', 'For older stores with established selling history and suitable account limits, we recommend an investment of $3,000 or more.', 'A larger budget can support broader product selection, increased order capacity, inventory planning, and additional growth opportunities.'],
]

const STABILITY = [
  'Following eBay marketplace policies', 'Working with reliable and suitable suppliers', 'Maintaining accurate product listings',
  'Monitoring account health and seller performance', 'Managing orders and delivery timelines', 'Handling customer cases and disputes promptly',
  'Maintaining consistent and controlled account activity',
]

const SERVICES = [
  ['Account Setup & Store Optimization', ['Seller account setup and verification guidance', 'Store configuration and professional optimization', 'SEO-focused product listings', 'Account health and policy monitoring']],
  ['Product Research & Sourcing', ['Product and niche research', 'Competitor and market analysis', 'Wholesale supplier research and coordination', 'Product pricing and profit margin evaluation']],
  ['Order & Inventory Management', ['Daily order processing', 'Supplier and fulfillment coordination', 'Inventory and stock monitoring', 'Returns, refunds, and customer support']],
  ['Performance & Growth', ['eBay Promoted Listings management', 'Search ranking and listing optimization', 'Sales and conversion analysis', 'Profitability and ROI tracking', 'Store performance reporting and scaling strategies']],
]

const STEPS = [
  ['Research & Business Planning', 'We review the client’s investment, account history, selling limits, target market, and product opportunities to develop a suitable eBay business strategy.'],
  ['Store Setup & Daily Operations', 'Our team manages product research, listings, supplier coordination, orders, customer communication, and daily account activities.'],
  ['Performance Optimization & Scaling', 'We monitor sales, profit margins, account health, and market performance to identify opportunities for improving results and growing the business.'],
]

const WHY = [
  'Dedicated eBay management teams', 'Experience across seven international markets', 'Four flexible business models', 'Account health and risk management',
  'Reliable supplier and fulfillment coordination', 'Transparent sales and profit reporting', 'Performance-focused growth strategies', 'Long-term business development',
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

export function EbayPage() {
  return (
    <>
      <section className="phero eb-hero"><div className="wrap">
        <p className="mono-s">eBay Marketplace Management &amp; Business Growth</p>
        <div className="eb-logo" aria-hidden="true"><PlatformLogo name="eBay" /></div>
        <h1 className="serif"><Words now delay={.5} text="Launch smart. Manage securely. Scale with eTricks." em={['eTricks.']} /></h1>
        <Reveal delay={.5}><p className="lead">We help entrepreneurs and businesses launch, manage, and grow their eBay stores through strategic product sourcing, dedicated account management, and performance-driven selling strategies. Our approach focuses on profitable product selection, reliable suppliers, account stability, and long-term business growth.</p></Reveal>
        <Reveal delay={.6}><div className="eb-cta">
          <Magnetic to="/talk" className="btn btn-p" strength={.2}>Discuss your eBay store <span className="arr">→</span></Magnetic>
          <a href="#ebay-results" className="ulink plain">See store performance <i>↓</i></a>
        </div></Reveal>
      </div></section>

      {/* markets */}
      <section className="section"><div className="wrap">
        <Head eyebrow="(01) Our markets" title="Global eBay operations." em={['operations.']} lead="We currently manage eBay seller accounts across seven international markets, helping businesses reach customers in different regions." />
        <div className="eb-markets">
          {MARKETS.map((m, i) => <Reveal key={m} delay={i * .05} className="eb-market"><i>0{i + 1}</i><b>{m}</b></Reveal>)}
        </div>
        <div className="eb-two">
          <Reveal><p>Our team develops market-specific strategies based on customer demand, product opportunities, competition, and fulfillment requirements.</p></Reveal>
          <Reveal delay={.1}><p>From account setup to international selling and daily store management, we help businesses build structured eBay operations across these markets.</p></Reveal>
        </div>
      </div></section>

      {/* business models */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(02) Business models" title="Four ways to sell on eBay." em={['eBay.']} lead="We offer four flexible business models based on the client’s investment, store history, product category, and long-term business objectives." />
        <div className="eb-models">
          {MODELS.map(([t, a, b], i) => (
            <Reveal key={t} delay={(i % 2) * .1} className="eb-model">
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
        <Head eyebrow="(03) Investment" title="Recommended starting investment." em={['investment.']} lead="We offer flexible investment strategies based on the age, performance, and selling history of the eBay store." />
        <div className="eb-invest">
          {INVEST.map(([t, k, v, a, b], i) => (
            <Reveal key={t} delay={i * .1} className={'eb-inv ' + (i ? 'eb-inv-lime' : '')}>
              <p className="mono-s">{t}</p>
              <div className="eb-inv-n"><small>{k}</small><b className="serif">{v}</b></div>
              <p className="eb-strong">{a}</p>
              <p>{b}</p>
            </Reveal>
          ))}
        </div>
        <Reveal><p className="eb-note">Actual investment requirements depend on the business model, store condition, supplier costs, and operational needs.</p></Reveal>

        <div className="eb-roi">
          <Reveal className="eb-roi-n"><p className="mono-s">ROI &amp; business performance</p><b className="serif">30–40%</b><span>Target ROI</span></Reveal>
          <div className="eb-roi-t">
            <Reveal><p>Our targeted return on investment for selected eBay projects is approximately 30–40%, depending on the business model, product sourcing costs, marketplace fees, fulfillment expenses, and sales performance.</p></Reveal>
            <Reveal delay={.08}><p>We focus on improving profitability through product research, competitive pricing, reliable fulfillment, and efficient daily operations. With suitable investment, consistent performance, and effective account management, eBay can become a valuable long-term revenue channel for businesses.</p></Reveal>
            <Reveal delay={.14}><p className="eb-disc">ROI is a performance target, not a guaranteed return. Actual results vary depending on market conditions, store performance, operating costs, and the reporting period.</p></Reveal>
          </div>
        </div>
      </div></section>

      {/* account stability */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap eb-stab">
        <div>
          <p className="mono-s">(04) Account stability &amp; risk management</p>
          <h2 className="serif h2"><Words text="A stronger focus on account health and long-term stability." em={['stability.']} /></h2>
          <Reveal delay={.1}><p className="lead eb-lead">Account stability is an important part of our eBay management strategy. Our structured working approach is designed to minimize avoidable account issues and reduce the risk of restrictions or suspensions.</p></Reveal>
        </div>
        <div>
          <p className="mono-s">We focus on</p>
          <ul className="eb-list">{STABILITY.map((s, i) => <Reveal key={s} delay={i * .04}><li><i>✓</i>{s}</li></Reveal>)}</ul>
          <Reveal><p className="eb-p">By prioritizing account health alongside sales growth, we aim to build reliable eBay operations that can perform over the long term.</p></Reveal>
          <Reveal><p className="eb-disc">While our approach is designed to reduce operational risks, account restrictions or suspensions cannot be completely ruled out.</p></Reveal>
        </div>
      </div></section>

      {/* services */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(05) What we manage" title="Our eBay management services." em={['services.']} />
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

      {/* how we work */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(06) How we work" title="Three steps, from plan to scale." em={['scale.']} />
        <div className="prows">
          {STEPS.map(([t, d], i) => (
            <Reveal key={t} className="prow"><span className="mono-s">0{i + 1}</span><h3 className="serif">{t}</h3><p>{d}</p></Reveal>
          ))}
        </div>
      </div></section>

      {/* documented store performance */}
      <div id="ebay-results"><Results platform="eBay" eyebrow="(07) eBay portfolio" title="Documented store performance." em={['performance.']} /></div>

      {/* why eTricks */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(08) Why choose eTricks" title="Built for long-term growth." em={['growth.']} lead="We combine dedicated eBay management teams, reliable supplier networks, and structured operational strategies to help businesses manage their marketplace operations." />
        <div className="eb-why">
          {WHY.map((x, i) => <Reveal key={x} delay={(i % 4) * .05} className="eb-why-i"><i>0{i + 1}</i><b>{x}</b></Reveal>)}
        </div>
        <Reveal><div className="eb-close">
          <h3 className="serif">Grow your eBay business with eTricks.</h3>
          <p>Whether you’re starting a new eBay store, managing an established account, or planning to expand into additional markets, eTricks provides the expertise and operational support to help you develop your business.</p>
          <p>With the right investment, suitable business model, and consistent management, we aim to turn eBay into a structured and sustainable revenue channel.</p>
          <p><a href="#ebay-results" className="eb-explore">Explore our eBay portfolio to discover our business models, management strategies, and documented store performance. <i>↑</i></a></p>
        </div></Reveal>
      </div></section>

      <BigLink lead="Your store. Our expertise. Built for long-term growth." label="Let's talk" />
    </>
  )
}
