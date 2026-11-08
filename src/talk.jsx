import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Words, Reveal, Magnetic, ease } from './ui.jsx'
import { CONTACT, BOOKING } from './data.js'

/* ---------- the spinning orb ---------- */
function polygon(sides, r) {
  return Array.from({ length: sides }, (_, i) => {
    const a = (Math.PI * 2 * i) / sides - Math.PI / 2
    return (r * Math.cos(a)).toFixed(2) + ',' + (r * Math.sin(a)).toFixed(2)
  }).join(' ')
}

function Orb({ onOpen }) {
  const layers = useMemo(() => Array.from({ length: 26 }, (_, i) => ({ i, pts: polygon(7, 96 - i * 1.5), rot: i * 7.4, op: 0.22 + (i / 26) * 0.55 })), [])
  return (
    <button className="orb" onClick={onOpen} aria-label="Talk to eTricks: pick a time for a free call">
      <span className="orb-glow" />
      <svg viewBox="-100 -100 200 200" className="orb-svg" aria-hidden="true">
        <g className="orb-spin">
          {layers.map((l) => (
            <polygon key={l.i} points={l.pts} fill="none" stroke="#b6ff00" strokeWidth=".35" strokeOpacity={l.op} transform={`rotate(${l.rot})`} />
          ))}
        </g>
        <g className="orb-spin2">
          {layers.filter((l) => l.i % 3 === 0).map((l) => (
            <circle key={l.i} r={90 - l.i * 2.3} fill="none" stroke="#b6ff00" strokeWidth=".25" strokeOpacity=".16" />
          ))}
        </g>
      </svg>
      <span className="orb-c">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></svg>
        <b>Talk to eTricks</b>
        <small>TAP TO BEGIN</small>
      </span>
      {[...Array(14)].map((_, i) => <i key={i} className="orb-p" style={{ '--a': i * 25.7 + 'deg', '--d': 4 + (i % 5) + 's', '--r': 52 + (i % 4) * 9 + '%' }} />)}
    </button>
  )
}

/* ---------- booking dialog ---------- */
function nextDays() {
  const out = []
  const d = new Date(); d.setHours(0, 0, 0, 0)
  for (let k = 1; out.length < BOOKING.howManyDays && k < 30; k++) {
    const x = new Date(d); x.setDate(d.getDate() + k)
    if (BOOKING.days.includes(x.getDay())) out.push(x)
  }
  return out
}
const fmtDay = (d) => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
const fmtLong = (d) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

function BookingDialog({ onClose }) {
  const days = useMemo(nextDays, [])
  const [step, setStep] = useState(1)
  const [day, setDay] = useState(days[0])
  const [slot, setSlot] = useState(null)
  const [state, setState] = useState('idle') // idle | sending | ok | error
  const first = useRef(null)

  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    window.__lenis && window.__lenis.stop()
    return () => { window.removeEventListener('keydown', k); window.__lenis && window.__lenis.start() }
  }, [onClose])
  useEffect(() => { if (step === 2) first.current && first.current.focus() }, [step])

  const submit = async (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.target))
    if (d.website) return
    setState('sending')
    try {
      const r = await fetch('https://formsubmit.co/ajax/' + CONTACT.email, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: d.name, email: d.email, phone: d.phone || 'Not provided',
          preferred_day: fmtLong(day), preferred_time: slot + ' (' + BOOKING.tz + ')', message: d.msg || 'No note',
          _subject: 'Call request: ' + fmtDay(day) + ', ' + slot + ' (' + d.name + ')', _template: 'table',
        }),
      })
      const j = await r.json()
      if (!r.ok || String(j.success) === 'false') throw new Error('fail')
      setState('ok')
    } catch { setState('error') }
  }

  return (
    <motion.div className="dlg-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div className="dlg" role="dialog" aria-modal="true" aria-label="Book a free call" initial={{ y: 60, opacity: 0, scale: .97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: .5, ease }}>
        <button className="dlg-x" onClick={onClose} aria-label="Close">×</button>
        {state === 'ok' ? (
          <div className="dlg-ok">
            <p className="mono-s">Request sent</p>
            <h3 className="serif">Thank <em>you.</em></h3>
            <p>We have your request for <b>{fmtLong(day)}</b> at <b>{slot}</b> ({BOOKING.tz}). We will confirm it by email or WhatsApp shortly.</p>
            <button className="btn btn-p" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <p className="mono-s">Step {step} of 2 · Free 30-minute call</p>
            <h3 className="serif">{step === 1 ? <>Pick a <em>time.</em></> : <>Your <em>details.</em></>}</h3>
            {step === 1 ? (
              <>
                <p className="dlg-s">Choose the day and time that suits you. Times are in {BOOKING.tz}.</p>
                <div className="days" role="radiogroup" aria-label="Day">
                  {days.map((d) => (
                    <button key={d.toISOString()} role="radio" aria-checked={day === d} className={'day ' + (day === d ? 'on' : '')} onClick={() => { setDay(d); setSlot(null) }}>
                      <small>{d.toLocaleDateString('en-GB', { weekday: 'short' })}</small><b>{d.getDate()}</b><small>{d.toLocaleDateString('en-GB', { month: 'short' })}</small>
                    </button>
                  ))}
                </div>
                <div className="slots" role="radiogroup" aria-label="Time">
                  {BOOKING.slots.map((s) => <button key={s} role="radio" aria-checked={slot === s} className={'slot ' + (slot === s ? 'on' : '')} onClick={() => setSlot(s)}>{s}</button>)}
                </div>
                <div className="dlg-f">
                  <span>{slot ? fmtLong(day) + ' · ' + slot : 'Select a time to continue'}</span>
                  <button className="btn btn-p" disabled={!slot} onClick={() => setStep(2)}>Continue <span className="arr">→</span></button>
                </div>
              </>
            ) : (
              <form onSubmit={submit} className="dlg-form">
                <p className="dlg-s">{fmtLong(day)} · {slot} · {BOOKING.tz}. <button type="button" className="lnk" onClick={() => setStep(1)}>Change</button></p>
                <div className="f"><label htmlFor="b-name">Full name *</label><input ref={first} id="b-name" name="name" required placeholder="Your full name" autoComplete="name" /></div>
                <div className="f"><label htmlFor="b-email">Email address *</label><input id="b-email" name="email" type="email" required placeholder="Your email address" autoComplete="email" /></div>
                <div className="f"><label htmlFor="b-phone">Phone / WhatsApp (optional)</label><input id="b-phone" name="phone" type="tel" placeholder="Your phone number" autoComplete="tel" /></div>
                <div className="f"><label htmlFor="b-msg">Anything we should know? (optional)</label><textarea id="b-msg" name="msg" placeholder="Your store, platform or question" style={{ minHeight: 80 }} /></div>
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
                <div className="dlg-f">
                  <span className="note">Your details are only used to arrange the call.</span>
                  <button type="submit" className="btn btn-p" disabled={state === 'sending'}>{state === 'sending' ? 'Sending...' : <>Request this call <span className="arr">↗</span></>}</button>
                </div>
                {state === 'error' && <p className="msg err-m">Something went wrong and your request was not sent. Please try again, or email <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a>.</p>}
              </form>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ---------- page ---------- */
export function TalkPage() { return <TalkSection /> }

export function TalkSection({ compact = false }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <section className={'talk ' + (compact ? 'compact' : '')}>
        <div className="talk-bg" />
        <div className="wrap talk-in">
          <div className="talk-l">
            <Reveal delay={.2}><p className="mono-s talk-eb">Free call · Any question · No commitment</p></Reveal>
            <h1 className="serif talk-h"><Words now delay={.5} text="Talk to us." /><br /><Words now delay={.8} text="Sell smarter." em={['smarter.']} /></h1>
            <Reveal delay={1}><p className="lead">Not sure where to start with your store? Pick a time for a free 30-minute call with our team. We will look at where you are and tell you plainly what we would do first.</p></Reveal>
            <Reveal delay={1.15} className="talk-cta">
              <Magnetic onClick={() => setOpen(true)} className="btn btn-p" strength={.2}>Book a free call <span className="arr">→</span></Magnetic>
              <a className="ulink plain" href={'mailto:' + CONTACT.email}>or email {CONTACT.email} <i>→</i></a>
            </Reveal>
            <Reveal delay={1.3}><p className="talk-wa">Prefer chat? <a href={'https://wa.me/' + CONTACT.whatsapp} target="_blank" rel="noreferrer">Message us on WhatsApp</a></p></Reveal>
          </div>
          <motion.div className="talk-r" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .6, duration: 1.2, ease }}>
            <Orb onOpen={() => setOpen(true)} />
            <p className="talk-cap">Tap the orb to pick a time. It's free, takes about a minute, and your details are only used to arrange the call.</p>
          </motion.div>
        </div>
      </section>
      <AnimatePresence>{open && <BookingDialog onClose={close} />}</AnimatePresence>
    </>
  )
}
