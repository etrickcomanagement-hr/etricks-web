// ====== EDIT THESE: contact details & team ======
export const CONTACT = {
  email: 'hello@etricks.co',
  phone: '+92 314 829 1326',
  whatsapp: '923148291326',
  city: 'Multan, Pakistan',
  instagram: 'https://www.instagram.com/etricks.co',
  tiktok: 'https://www.tiktok.com/@etricks.co',
  facebook: 'https://www.facebook.com/etricks.co/',
  youtube: 'https://www.youtube.com/@eTricksbyshahmohsin',
}

// Call booking: which weekdays (0 = Sun ... 6 = Sat) and time slots to offer. Times are Pakistan time.
export const BOOKING = {
  days: [1, 2, 3, 4, 5, 6],
  howManyDays: 8,
  slots: ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'],
  tz: 'Pakistan time (PKT)',
}

// About page. Put an office photo in /public and set OFFICE.img = '/office.webp' to replace the artwork.
export const OFFICE = { img: '/office.webp', city: 'Multan, Pakistan', coords: '30.1575° N · 71.5249° E' }

export const PILLARS = [
  ['Dedicated store teams', 'People assigned to your store by name, who learn your catalogue and stay.'],
  ['Hands-on store management', 'Listings, orders and issues handled every day, not once a month.'],
  ['Clear client reporting', 'Plain-language updates on what was done and what comes next.'],
]

export const WORK_STEPS = [
  ['Agree the scope', 'We write down what we will do, who does it and what it costs, before any work starts.'],
  ['Assign a dedicated team', 'A named team and one coordinator take ownership of your store.'],
  ['Share progress regularly', 'You get honest updates on a steady rhythm, with a clear next step each time.'],
]

// Management page
export const MANAGE_PLATFORMS = [
  ['Amazon', 'Listing optimisation, inventory watch and advertising support.', ['Listing creation and optimisation', 'Inventory and order handling', 'Account health monitoring', 'Advertising support']],
  ['eBay', 'Bulk listings, orders and the daily tasks that keep a store tidy.', ['eBay Seller Account Setup & Verification', 'eBay Listing Creation & Optimisation', 'Stock, Fulfilment & Buyer Support', 'Seller Performance & Sales Reporting']],
  ['TikTok Shop', 'Shop set-up, product uploads and help with content and orders.', ['Shop set-up and uploads', 'Content and creator coordination', 'Campaign and promotion planning', 'Order and returns support']],
  ['Etsy', 'Listings and shop management that keep your brand voice intact.', ['Etsy Shop Setup & Verification', 'Etsy Listing Creation & SEO', 'Order Management & Buyer Support', 'Shop Analytics & Sales Optimisation']],
  ['Walmart', 'Catalogue updates, stock checks and everyday store operations.', ['Catalogue and item set-up', 'Compliance and quality checks', 'Inventory updates', 'Sales and returns reporting']],
  ['Shopify', 'A branded storefront that is quick to browse and simple to run.', ['Theme and store set-up', 'Products and collections', 'Apps and automations', 'Speed and conversion tuning']],
  ['Temu', 'Seller set-up, listings and order coordination.', ['Seller account set-up', 'Listing and pricing management', 'Order flow monitoring', 'Regular performance updates']],
]

export const WHY_TEAM = [
  ['Dedicated department teams', 'Listings, operations, support and growth each have their own specialists.'],
  ['A team for your project', 'Named people who understand your store and what matters most to it.'],
  ['Coordinated daily work', 'One coordinator keeps tasks and departments moving in step.'],
  ['Clear communication', 'Regular updates and one clear point of contact.'],
]

export const ACTIVITY = [
  ['New order received', 'Order queued for packing'],
  ['Payment confirmed', 'Funds cleared on the platform'],
  ['Order shipped', 'Label printed and handed over'],
  ['Tracking updated', 'Customer notified automatically'],
  ['Listing refreshed', 'Title and photos improved'],
  ['Stock level synced', 'Low-stock alert resolved'],
  ['Customer message answered', 'Replied within the target time'],
]

export const PLATFORMS = ['Amazon', 'TikTok Shop', 'eBay', 'Etsy', 'Walmart', 'Shopify', 'Temu']

// sub = small cards under the description, note = a highlighted line (like pricing), cta = [button text, link]
export const SERVICES = [
  { n: '01', t: 'E-Commerce Management', ico: '◎',
    d: 'The daily grind of running a store, handled. Listings, orders, stock, customer messages and weekly reporting, run by a team that knows your catalogue.',
    tags: ['Listings', 'Orders', 'Inventory', 'Reporting'],
    cta: ['See how management works', '/management'] },
  { n: '02', t: 'Account Recovery', ico: '↺',
    d: 'Suspended, restricted or flagged? We trace the cause, write the appeal and rebuild trust with the marketplace.',
    tags: ['Appeals', 'Root-cause fixes', 'Reinstatement'],
    cta: ['Talk to us about this', '/contact'] },
  { n: '03', t: 'Company Formation', ico: '▣', subtitle: 'UK Ltd & US LLC Formation',
    d: 'Set up a UK limited company or a US LLC for your eCommerce business. We guide you through the registration requirements, help prepare your formation documents, and explain the next steps once your company is registered.',
    sub: [
      ['UK Ltd', 'Get support with your Companies House registration, including company details, director and shareholder information, and registered office requirements.'],
      ['US LLC', 'Get support with state registration, including formation paperwork, member details, and registered agent requirements.'],
    ],
    note: ['Formation packages start at $300 USD.', 'We confirm your package inclusions and applicable fees before you proceed.'],
    tags: [],
    cta: ['Get a Formation Quote', '/contact'] },
  { n: '04', t: 'Software & Automation', ico: '⌘',
    d: 'We build custom software around how your business works. From client portals and team dashboards to automated approvals and reporting, we connect your tools and take repetitive tasks off your team’s plate, so everyone can see what’s done and what needs their attention.',
    tags: [],
    cta: ['Tell Us What You Want to Automate', '/contact'] },
  { n: '05', t: 'Web & Software Development', ico: '◇',
    d: 'We build websites, online stores, web and mobile apps, and custom software for businesses across industries. Whether you’re launching something new or upgrading an existing platform, we develop it around how your business works and what your customers need.',
    tags: ['Websites', 'eCommerce', 'Web & Mobile Apps', 'Custom Software'],
    cta: ['Discuss Your Project', '/contact'] },
  { n: '06', t: 'Marketing & Consulting', ico: '↗',
    d: 'We help businesses across industries reach the right audience and turn interest into enquiries or sales. From planning your marketing strategy to running paid campaigns and managing your social media, we handle the day-to-day work and show you what’s performing.',
    sub: [
      ['Digital Marketing', 'Campaign strategy, paid advertising, audience targeting, and performance reporting.'],
      ['Social Media Management', 'Content planning, post design and copywriting, scheduling, and tracking what your audience responds to.'],
    ],
    tags: ['Paid Ads', 'Social Media', 'Content Strategy'],
    cta: ['Discuss Your Marketing Goals', '/contact'] },
]

export const PLATFORM_DETAIL = {
  Amazon: { line: 'Marketplace depth, done carefully.', points: ['Listing creation and optimisation', 'Inventory and order handling', 'Account health monitoring', 'Suspension appeals and reinstatement'] },
  'TikTok Shop': { line: 'Where content meets checkout.', points: ['Shop setup and product uploads', 'Content and creator support', 'Campaign and promotion planning', 'Order and returns management'] },
  eBay: { line: 'Steady, tidy store operations.', points: ['eBay Seller Account Setup & Verification', 'eBay Listing Creation & Optimisation', 'Stock, Fulfilment & Buyer Support', 'Seller Performance & Sales Reporting'] },
  Etsy: { line: 'A shop that keeps your brand voice.', points: ['Etsy Shop Setup & Verification', 'Etsy Listing Creation & SEO', 'Order Management & Buyer Support', 'Shop Analytics & Sales Optimisation'] },
  Walmart: { line: 'Built for strict marketplace rules.', points: ['Seller onboarding support', 'Catalogue and item set-up', 'Compliance and quality checks', 'Reporting on sales and returns'] },
  Shopify: { line: 'Your own storefront, running well.', points: ['Store setup and theme tuning', 'Product and collection management', 'App and automation set-up', 'Conversion and speed improvements'] },
  Temu: { line: 'Selling on a fast-moving platform.', points: ['Seller account set-up', 'Listing and pricing management', 'Order flow monitoring', 'Regular performance updates'] },
}

export const STEPS = [
  ['Understand', 'We look at your store, your numbers and what you want it to become, before touching a thing.'],
  ['Plan & assign', 'We agree the scope in writing and put a named team on your account.'],
  ['Run & coordinate', 'Day-to-day work happens quietly in the background, with one point of contact for you.'],
  ['Report & improve', 'Regular, plain-language updates, with a clear next step every time.'],
]

export const MARKETS = [['United Kingdom', 'UK'], ['United States', 'USA'], ['Australia', 'AU'], ['Canada', 'CA'], ['Saudi Arabia', 'KSA']]

export const PROMISES = [
  ['A named team', 'You will always know who is working on your store and who to ask.'],
  ['No black boxes', 'Everything we do is logged and reported, in language you do not need a degree to read.'],
  ['Ready for the long run', 'We are built for ongoing care, not a quick launch and a goodbye.'],
]

// Founder / CEO. Edit the name, quote and principles here.
export const FOUNDER = {
  name: 'Shah Mohsin', // TODO: confirm spelling
  role: 'Founder & CEO',
  img: '/ceo.webp',
  quote: 'I started eTricks because I wanted store owners to know who is working on their business, what has been done and where we need their input.',
  principles: [
    ['Know who is working on your business', 'Every client should be able to name the people behind their store, and reach them.'],
    ['Show the work', 'What has been done, what is next and where we need your input, said plainly and on a regular rhythm.'],
    ['Build a team, not a queue', 'Launching is only the start. Stores need people who stay, learn the catalogue and sweat the details.'],
    ['Make decisions on real numbers', 'Our job is to keep stores running smoothly and give owners the information they need to choose well.'],
    ['Earn trust from Pakistan, worldwide', 'We want to be the eCommerce agency from Pakistan that store owners everywhere count on.'],
  ],
}

export const TEAM = [
  // dept = the section they belong to.
  // summary / about / handles / focus / talkAbout are written from each person's role. Edit freely.
  // facts is optional: add real details like [['Experience', '6 years'], ['Platforms', 'Amazon, eBay']] and they appear in the profile.
  { n: 'Shah Mohsin', r: 'Founder & CEO', dept: 'Leadership', img: '/team-mohsin.webp', facts: [],
    summary: 'Sets the direction and keeps every client relationship personal.',
    about: 'Shah Mohsin founded eTricks so store owners would always know who is working on their business, what has been done and where their input is needed. He sets the direction of the company, keeps the standard high across every department and stays close to client relationships as the agency grows from Multan to markets worldwide.',
    handles: [
      ['Vision and strategy', 'Where eTricks is heading, and which markets and services come next.'],
      ['Client relationships', 'Stays close to clients so the service stays personal as the team grows.'],
      ['Team direction', 'Aligns the department teams around clear goals and one standard of work.'],
      ['Quality and trust', 'Makes sure clients always know who is handling what.'],
    ],
    focus: ['Strategy', 'Client relationships', 'Growth', 'Culture'],
    talkAbout: ['Long-term plans and partnerships', 'Anything you want escalated', 'Feedback on how we work'] },

  { n: 'Syed Shahraz', r: 'Operations Manager', dept: 'Operations', img: '/team-shahraz.webp', facts: [],
    summary: 'Keeps the daily work moving across every department.',
    about: 'Syed Shahraz looks after how the work gets done day to day. He coordinates the department teams, keeps tasks moving and makes sure every project has an owner, so clients get steady attention and clear updates.',
    handles: [
      ['Daily operations', "Keeps each store's routine tasks on schedule."],
      ['Cross-team coordination', 'Connects listings, support, growth and development so nothing falls between teams.'],
      ['Process and quality', 'Checks that work meets the agreed standard before it reaches a client.'],
      ['Reporting rhythm', 'Makes sure regular updates reach clients on time.'],
    ],
    focus: ['Operations', 'Coordination', 'Quality', 'Delivery'],
    talkAbout: ['Timelines and progress', 'Who is handling which task', 'Process and workflow improvements'] },

  { n: 'Talha Syed', r: 'Head of E-Commerce Operations', dept: 'E-Commerce', img: '/team-talha.webp', facts: [],
    summary: 'Leads the teams that run client stores across the marketplaces.',
    about: 'Talha Syed leads eTricks e-commerce operations. His teams manage client stores across Amazon, eBay, TikTok Shop, Etsy, Walmart, Shopify and Temu: listings, orders, stock and account health, so owners can focus on the business.',
    handles: [
      ['Marketplace store management', 'Daily store tasks across every platform we manage.'],
      ['Listings and catalogue', 'Creation, optimisation and regular updates.'],
      ['Orders and inventory', 'Keeps orders flowing and stock in sync.'],
      ['Account health', 'Monitors performance and leads recovery cases when an account is restricted.'],
    ],
    focus: ['Marketplaces', 'Listings', 'Orders', 'Account health'],
    talkAbout: ['Running or fixing a store on any platform', 'Listing and catalogue problems', 'Suspended or restricted accounts'] },

  { n: 'Muhammad Hamza', r: 'Business Development Manager & Team Leader', dept: 'Growth', img: '/team-hamza.webp', facts: [],
    summary: 'First point of contact for new clients, and leads his project team.',
    about: 'Muhammad Hamza is usually the first person a new client speaks to. He listens to what a business needs, shapes a clear scope and proposal, and leads the team that takes the work forward once it starts.',
    handles: [
      ['New enquiries', 'Understands your store, goals and challenges in the first conversation.'],
      ['Scope and proposals', 'Turns your needs into a clear plan, price and next steps.'],
      ['Market planning', 'Helps decide which platforms and markets fit your business.'],
      ['Team leadership', 'Leads a project team and keeps it aligned with the client.'],
    ],
    focus: ['Business development', 'Proposals', 'Market planning', 'Team leadership'],
    talkAbout: ['Starting a project with eTricks', 'Choosing platforms and markets', 'Pricing and scope'] },

  { n: 'Team Leader', r: 'Team Leader & Trainer', dept: 'Training', img: '/team-trainer.webp', facts: [], // TODO: add this person's name
    summary: 'Leads a project team and trains every new member.',
    about: 'Leads a team day to day and trains new members, so the standard of work stays the same on every account, no matter who is handling it.',
    handles: [
      ['Team leadership', 'Guides a project team through the daily work.'],
      ['Training and onboarding', 'Brings new team members up to the eTricks standard.'],
      ['Playbooks and standards', 'Keeps the way we work consistent and written down.'],
      ['Quality coaching', 'Reviews work and coaches the team to improve.'],
    ],
    focus: ['Training', 'Onboarding', 'Standards', 'Coaching'],
    talkAbout: ['How our team is trained', 'Standards and quality on your account', 'Joining the team'] },
]

export const FAQS = [
  ['What can eTricks help me with?', 'Running your online store day to day, recovering suspended accounts, setting up a company, building custom software, web development and marketing. If you are not sure which you need, we will work it out with you.'],
  ['Do you work with new sellers or established brands?', 'Both. Some clients are launching their first store, others are running several and need dependable hands. We start by learning where you are.'],
  ['Can I hire you for just one task?', 'Yes. You can bring us in for a single project or keep us for ongoing support. Scope, responsibilities and pricing are agreed before we start.'],
  ['Who will actually handle my project?', 'A dedicated team for your account, with one coordinator who keeps you updated and pulls in specialists whenever needed.'],
  ['Which platforms and markets do you cover?', 'Amazon, TikTok Shop, eBay, Etsy, Walmart, Shopify, Temu and more, for sellers in the UK, USA, Australia, Canada and Saudi Arabia.'],
  ['How do we get started, and what does it cost?', 'Book a free consultation and tell us about your goals. We reply with a proposal covering the work, the price and the next steps. Cost depends on scope and how much support you want.'],
]
