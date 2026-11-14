import { useState } from 'react'
import { m as motion, AnimatePresence } from 'framer-motion'
import { Reveal, Words, Magnetic, ease } from './ui.jsx'
import { FAQS, CONTACT } from './data.js'

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section"><div className="wrap faq-wrap">
      <div className="sec-head">
        <p className="mono-s">(06) Questions</p>
        <h2 className="serif h2"><Words text="A few things you might want to know." em={['know.']} /></h2>
        <Reveal delay={.1}><p className="lead" style={{ marginTop: 22 }}>Still unsure? Talk to a real person on our team.</p></Reveal>
      </div>
      <div className="faq">
        {FAQS.map(([q, a], i) => (
          <div key={q} className={'faq-i ' + (open === i ? 'open' : '')}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span>{q}</span><i>+</i></button>
            <AnimatePresence initial={false}>
              {open === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .5, ease }} style={{ overflow: 'hidden' }}><p className="faq-a">{a}</p></motion.div>}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div></section>
  )
}

const SOCIAL = [
  ['TikTok', 'tiktok', <path key="t" d="M16.5 3c.3 2.4 1.7 3.9 4 4.1v3.1a7 7 0 01-4-1.3v6.3a5.8 5.8 0 11-5.8-5.8c.3 0 .6 0 .9.1v3.2a2.7 2.7 0 102 2.6V3z" />],
  ['YouTube', 'youtube', <path key="y" d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z" />],
  ['Instagram', 'instagram',<path key="i" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM17.5 6a1 1 0 110 2 1 1 0 010-2z" />],
  ['Facebook', 'facebook', <path key="f" d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.95.4-1.7 1.8-1.7H17V3.8C16.6 3.7 15.6 3.6 14.6 3.6c-2.6 0-4.1 1.5-4.1 4.2v2.7H7.8v3.3h2.7V22z" />],
]

export function ContactBox() {
  const [state, setState] = useState('idle') // idle | sending | ok | error
  const submit = async (e) => {
    e.preventDefault()
    const form = e.target
    const d = Object.fromEntries(new FormData(form))
    if (d.website) return // honeypot
    if (Date.now() - (window.__etSent || 0) < 30000) { setState('error'); return } // one message per 30s
    window.__etSent = Date.now()
    setState('sending')
    try {
      const r = await fetch('https://formsubmit.co/ajax/' + CONTACT.email, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: d.name, email: d.email, phone: d.phone || 'Not provided', message: d.msg, _subject: 'New enquiry from ' + d.name + ' (etricks website)', _template: 'table' }),
      })
      const j = await r.json()
      if (!r.ok || String(j.success) === 'false') throw new Error('fail')
      form.reset(); setState('ok')
    } catch { setState('error') }
  }
  return (
    <section className="section contact" id="contact"><div className="wrap cgrid">
      <div className="c-left">
        <p className="mono-s">(07) Get in touch</p>
        <h2 className="serif c-h"><Words text="Tell us what you have in mind." em={['mind.']} /></h2>
        <Reveal delay={.1}><p className="lead">Share a little about your business and the support you need. We will take it from there.</p></Reveal>
        <Reveal delay={.15} className="c-links">
          <a href={'mailto:' + CONTACT.email}><small>Email</small><b className="serif">{CONTACT.email}</b></a>
          <a href={'https://wa.me/' + CONTACT.whatsapp} target="_blank" rel="noreferrer"><small>WhatsApp</small><b className="serif">{CONTACT.phone}</b></a>
        </Reveal>
        <div className="socials">
          {SOCIAL.map(([n, k, path]) => (
            <a key={n} href={CONTACT[k]} target="_blank" rel="noreferrer" aria-label={n} className="soc"><svg viewBox="0 0 24 24" fill="currentColor">{path}</svg></a>
          ))}
        </div>
      </div>
      <Reveal delay={.1}>
        <form onSubmit={submit} className="cform">
          <div className="f"><label htmlFor="c-name">Full name *</label><input id="c-name" name="name" required maxLength={80} placeholder="Your full name" autoComplete="name" /></div>
          <div className="f"><label htmlFor="c-email">Email address *</label><input id="c-email" name="email" type="email" required maxLength={120} placeholder="Your email address" autoComplete="email" /></div>
          <div className="f full"><label htmlFor="c-phone">Phone number (optional)</label><input id="c-phone" name="phone" type="tel" maxLength={25} pattern="[0-9+() -]{6,25}" placeholder="Your phone number" autoComplete="tel" /></div>
          <div className="f full"><label htmlFor="c-msg">Tell us about your project *</label><textarea id="c-msg" name="msg" maxLength={2000} required placeholder="Your goals, challenges or the support you're looking for..." /></div>
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
          <p className="note full">We'll use your details to respond to your enquiry.</p>
          <div className="full">
            <button type="submit" className="btn btn-p send" disabled={state === 'sending'}>{state === 'sending' ? 'Sending...' : <>Send My Enquiry <span className="arr">↗</span></>}</button>
            <div role="status" aria-live="polite">
              {state === 'ok' && <p className="msg ok-m">Thank you! Your enquiry has been sent. We will get back to you soon.</p>}
              {state === 'error' && <p className="msg err-m">Something went wrong and your enquiry was not sent. Please try again, or email us at <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a> or message us on WhatsApp.</p>}
            </div>
          </div>
        </form>
      </Reveal>
    </div></section>
  )
}
