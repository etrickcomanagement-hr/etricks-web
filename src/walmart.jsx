import { Reveal, Words, Magnetic, BigLink } from './ui.jsx'
import { Results } from './results.jsx'
import { PlatformLogo } from './logos.jsx'
import './ebay.css'

/* All the text on the Walmart page lives here. Edit freely. */
const MODELS = [
  ['Two-Step Dropshipping',
    'Our two-step fulfillment model focuses on sourcing products through reliable suppliers and coordinating inventory with established third-party logistics (3PL) partners.',
    'Products are processed through suitable fulfillment facilities before being shipped to customers, helping businesses maintain greater control over inventory, packaging, and delivery performance.',
    'Our team manages',
    ['Product research and supplier sourcing', 'Inventory planning and purchasing', 'Coordination with 3PL fulfillment partners', 'Product listing and pricing optimization', 'Order processing and shipment tracking', 'Returns and operational performance'],
    'This model is implemented through fulfillment arrangements that meet Walmart Marketplace policies.'],
  ['Walmart Fulfillment Services (WFS)',
    'Walmart Fulfillment Services allows eligible sellers to store inventory within Walmart’s fulfillment network, where Walmart handles order picking, packing, shipping, and supported return processes.',
    null,
    'Our team helps sellers manage',
    ['WFS onboarding and product eligibility', 'Product selection and inventory planning', 'Inventory preparation and shipment coordination', 'Listing optimization and pricing strategies', 'Stock monitoring and replenishment', 'Sales and profitability analysis'],
    'WFS provides a structured fulfillment solution for businesses looking to improve operational efficiency and support long-term growth.'],
]

const FULFILMENT = [
  'Reliable inventory storage and handling', 'Efficient order processing', 'Shipment tracking and delivery coordination',
  'Inventory accuracy and stock management', 'Returns and fulfillment support',
]

const SERVICES = [
  ['Account Setup & Store Optimization', ['Seller account application and verification guidance', 'Store configuration and product listing management', 'Listing SEO and content optimization', 'Account health and marketplace compliance']],
  ['Product Research & Sourcing', ['Product and category research', 'Competitor and pricing analysis', 'Supplier research and coordination', 'Product cost and profit margin evaluation']],
  ['Inventory & Fulfillment Management', ['3PL and WFS coordination', 'Inventory purchasing and replenishment planning', 'Order processing and shipment monitoring', 'Returns and fulfillment issue management']],
  ['Performance & Growth', ['Walmart advertising campaign management', 'Sales and conversion optimization', 'Profitability and ROI tracking', 'Performance reporting and scaling strategies']],
]

const STEPS = [
  ['Research & Business Planning', 'We evaluate the client’s investment, business registration details, product opportunities, supplier availability, and fulfillment requirements to develop a suitable Walmart business strategy.'],
  ['Store Setup & Operations', 'Our team supports the account application and setup process, product listings, supplier coordination, inventory planning, and daily store operations.'],
  ['Performance Optimization & Scaling', 'We monitor sales, operating costs, inventory turnover, and profit margins to identify opportunities for improving performance and scaling the business.'],
]

const WHY = [
  'Dedicated Walmart Marketplace management', 'Support for eligible US, Canadian, and UK-registered businesses', 'Reliable 3PL and WFS fulfillment coordination',
  'Flexible inventory and sourcing strategies', 'Transparent sales and profit reporting', 'Performance-focused store optimization', 'Sustainable long-term business growth',
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

export function WalmartPage() {
  return (
    <>
      <section className="phero eb-hero"><div className="wrap">
        <p className="mono-s">Walmart Marketplace Management &amp; Business Growth</p>
        <div className="eb-logo" aria-hidden="true"><PlatformLogo name="Walmart" /></div>
        <h1 className="serif"><Words now delay={.5} text="Launch strategically. Fulfill efficiently. Scale with eTricks." em={['eTricks.']} /></h1>
        <Reveal delay={.5}><p className="lead">We help entrepreneurs and businesses launch, manage, and grow their Walmart Marketplace stores through strategic product sourcing, reliable fulfillment partnerships, and dedicated account management. Our approach combines market research, inventory planning, competitive pricing, and performance-driven strategies to build sustainable eCommerce businesses.</p></Reveal>
        <Reveal delay={.6}><div className="eb-cta">
          <Magnetic to="/talk" className="btn btn-p" strength={.2}>Discuss your Walmart store <span className="arr">→</span></Magnetic>
          <a href="#walmart-results" className="ulink plain">See store performance <i>↓</i></a>
        </div></Reveal>
      </div></section>

      {/* market */}
      <section className="section"><div className="wrap">
        <div className="eb-roi">
          <Reveal className="eb-roi-n"><p className="mono-s">(01) Our market</p><b className="serif">US</b><span>Walmart US Marketplace</span></Reveal>
          <div className="eb-roi-t">
            <Reveal><p>We focus on the Walmart US Marketplace, helping eligible sellers establish and manage their businesses in one of the world’s leading eCommerce markets.</p></Reveal>
            <Reveal delay={.08}><p>Alongside US-registered businesses, we also assist sellers with Walmart Marketplace applications using Canadian and UK-registered business details, subject to Walmart’s eligibility, documentation, and verification requirements.</p></Reveal>
            <Reveal delay={.14}><p>From business verification and account setup to product sourcing, fulfillment coordination, and sales optimization, our team supports daily store operations and long-term business growth.</p></Reveal>
          </div>
        </div>
      </div></section>

      {/* business models */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(02) Business models" title="Two ways to sell on Walmart." em={['Walmart.']} lead="We offer two structured business models based on investment capacity, fulfillment requirements, and business objectives." />
        <div className="eb-models">
          {MODELS.map(([t, a, b, k, items, note], i) => (
            <Reveal key={t} delay={i * .1} className="eb-model eb-svc-c">
              <span className="mono-s">0{i + 1}</span>
              <h3 className="serif">{t}</h3>
              <p className="eb-strong">{a}</p>
              {b && <p>{b}</p>}
              <p className="mono-s wm-k">{k}</p>
              <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
              <p className="eb-disc">{note}</p>
            </Reveal>
          ))}
        </div>
      </div></section>

      {/* 3PL */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap eb-stab">
        <div>
          <p className="mono-s">(03) Fulfillment</p>
          <h2 className="serif h2"><Words text="Reliable 3PL and fulfillment partnerships." em={['partnerships.']} /></h2>
          <Reveal delay={.1}><p className="lead eb-lead">We work with established third-party logistics (3PL) partners to support inventory handling, order fulfillment, and shipping operations.</p></Reveal>
        </div>
        <div>
          <p className="mono-s">Our fulfillment strategy focuses on</p>
          <ul className="eb-list">{FULFILMENT.map((s, i) => <Reveal key={s} delay={i * .04}><li><i>✓</i>{s}</li></Reveal>)}</ul>
          <Reveal><p className="eb-p">These partnerships help us maintain organized operations, improve fulfillment efficiency, and provide a better customer experience.</p></Reveal>
        </div>
      </div></section>

      {/* investment + ROI */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(04) Investment & ROI" title="Recommended starting investment." em={['investment.']} />
        <div className="eb-invest">
          <Reveal className="eb-inv eb-inv-lime">
            <p className="mono-s">Walmart Marketplace</p>
            <div className="eb-inv-n"><small>Recommended initial investment</small><b className="serif wm-range">$5,000 to $10,000</b></div>
            <p className="eb-strong">For Walmart Marketplace, we recommend an initial investment of $5,000–$10,000, depending on the selected business model, product category, and inventory requirements.</p>
            <p>This budget helps businesses plan for product sourcing, initial inventory, fulfillment costs, and operational expenses. Our strategy focuses on controlled investment, product testing, performance monitoring, and gradual scaling as the business develops.</p>
          </Reveal>
          <Reveal delay={.1} className="eb-inv">
            <p className="mono-s">ROI &amp; business performance</p>
            <div className="eb-inv-n"><small>Target ROI</small><b className="serif et-lime">30–40%</b></div>
            <p>Our targeted return on investment for selected Walmart Marketplace projects is approximately 30–40%, depending on product selection, sourcing costs, fulfillment expenses, marketplace fees, and sales performance.</p>
            <p>We focus on building profitable operations through careful product selection, competitive pricing, efficient inventory management, and controlled operating costs.</p>
          </Reveal>
        </div>
        <Reveal><p className="eb-disc" style={{ marginTop: 18 }}>ROI is a performance target, not a guaranteed return. Actual results depend on market conditions, operating costs, inventory turnover, and the reporting period.</p></Reveal>
      </div></section>

      {/* services */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(05) What we manage" title="Our Walmart management services." em={['services.']} />
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
      <div id="walmart-results"><Results platform="Walmart" eyebrow="(07) Walmart portfolio" title="Documented store performance." em={['performance.']} /></div>

      {/* why eTricks */}
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <Head eyebrow="(08) Why choose eTricks" title="A strategy built for growth." em={['growth.']} lead="We combine dedicated Walmart management teams, reliable supplier networks, established 3PL partnerships, and structured operational strategies to help businesses manage their marketplace operations." />
        <div className="eb-why">
          {WHY.map((x, i) => <Reveal key={x} delay={(i % 4) * .05} className="eb-why-i"><i>0{i + 1}</i><b>{x}</b></Reveal>)}
        </div>
        <Reveal><div className="eb-close">
          <h3 className="serif">Grow your Walmart business with eTricks.</h3>
          <p>Whether you’re launching a new Walmart Marketplace store or looking to improve an existing operation, eTricks provides the management expertise and operational support needed to develop your business.</p>
          <p><a href="#walmart-results" className="eb-explore">Explore our Walmart portfolio to discover our business models, fulfillment strategies, and documented store performance. <i>↑</i></a></p>
        </div></Reveal>
      </div></section>

      <BigLink lead="Your investment. Our expertise. A strategy built for growth." label="Let's talk" />
    </>
  )
}
