import { useEffect, useState } from 'react'
import { m as motion, AnimatePresence } from 'framer-motion'
import { Reveal, Link, ease } from './ui.jsx'
import { TEAM, CONTACT } from './data.js'

/* ---------- profile dialog: photo, section, about, what they handle, focus, who to talk to them about ---------- */
function Profile({ index, onClose, onSelect }) {
  const m = TEAM[index]
  const next = (d) => onSelect((index + d + TEAM.length) % TEAM.length)
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') next(1); if (e.key === 'ArrowLeft') next(-1) }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  })
  useEffect(() => { window.__lenis && window.__lenis.stop(); return () => { window.__lenis && window.__lenis.start() } }, [])
  const others = TEAM.map((p, i) => ({ p, i })).filter(({ i }) => i !== index)
  const first = m.n.split(' ')[0] === 'Team' ? 'them' : m.n.split(' ')[0]

  return (
    <motion.div className="pf-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div className="pf" role="dialog" aria-modal="true" aria-label={m.n + ', ' + m.r}
        initial={{ y: 60, opacity: 0, scale: .97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: .5, ease }}>
        <button className="pf-x" onClick={onClose} aria-label="Close profile">×</button>

        <div className="pf-left">
          <div className="pf-photo">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img key={m.img} src={m.img} alt={m.n + ', ' + m.r} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }} />
            </AnimatePresence>
            <div className="pf-nav">
              <button onClick={() => next(-1)} aria-label="Previous person">←</button>
              <span>{String(index + 1).padStart(2, '0')} / {String(TEAM.length).padStart(2, '0')}</span>
              <button onClick={() => next(1)} aria-label="Next person">→</button>
            </div>
          </div>
          <div className="pf-withwrap">
            <p className="mono-s">Works closely with</p>
            <div className="pf-with">
              {others.map(({ p, i }) => (
                <button key={p.n + i} onClick={() => onSelect(i)}><img src={p.img} alt="" /><span>{p.n}<small>{p.dept}</small></span></button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={index} className="pf-body" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: .35, ease }}>
            <span className="pf-dept">{m.dept}</span>
            <h3 className="serif">{m.n}</h3>
            <p className="pf-role">{m.r}</p>
            <p className="pf-bio">{m.about}</p>

            {m.facts && m.facts.length > 0 && (
              <dl className="pf-facts">{m.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            )}

            <p className="mono-s">Responsibilities</p>
            <ul className="pf-list">
              {m.handles.map(([t, d], i) => (
                <li key={t}><i>0{i + 1}</i><div><b>{t}</b><span>{d}</span></div></li>
              ))}
            </ul>

            <p className="mono-s">Focus areas</p>
            <div className="pf-tags">{m.focus.map((f) => <span key={f}>{f}</span>)}</div>

            <p className="mono-s">Talk to {first} about</p>
            <ul className="pf-talk">{m.talkAbout.map((t) => <li key={t}>{t}</li>)}</ul>

            <div className="pf-cta">
              <Link to="/talk" onClick={onClose} className="btn btn-p">Talk to the team <span className="arr">↗</span></Link>
              <a className="ulink plain" href={'https://wa.me/' + CONTACT.whatsapp} target="_blank" rel="noreferrer">WhatsApp <i>→</i></a>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

/* ---------- team grid: same-size cards, section label, details under each photo, click for the full profile ---------- */
export function TeamCards() {
  const [open, setOpen] = useState(null)
  return (
    <>
      <div className="tcards">
        {TEAM.map((m, i) => (
          <Reveal key={m.n + i} delay={(i % 3) * .08} className="tcd">
            <button className="tcd-b" onClick={() => setOpen(i)} aria-label={'View ' + m.n + "'s profile"}>
              <div className="tcd-p">
                <img src={m.img} alt={m.n + ', ' + m.r} loading="lazy" />
                <span className="tcd-sh" />
                <span className="tcd-dept">{m.dept}</span>
                <span className="tcd-plus" aria-hidden="true">+</span>
                <div className="tcd-ov">
                  <small>Responsibilities</small>
                  <ul>{m.handles.slice(0, 4).map(([t]) => <li key={t}>{t}</li>)}</ul>
                  <span className="tcd-more">View full profile ↗</span>
                </div>
              </div>
              <div className="tcd-m">
                <b className="serif">{m.n}</b>
                <span>{m.r}</span>
                <p className="tcd-s">{m.summary}</p>
                <div className="tcd-tags">{m.focus.map((f) => <i key={f}>{f}</i>)}</div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>{open !== null && <Profile index={open} onClose={() => setOpen(null)} onSelect={setOpen} />}</AnimatePresence>
    </>
  )
}
