import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate, useScroll, useTransform } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import Shape3D from './Shape3DLazy.jsx'

export const ease = [0.16, 1, 0.3, 1]

export function Reveal({ children, delay = 0, y = 40, className = '', style }) {
  return (
    <motion.div className={className} style={style} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
  )
}

// headline reveal, word by word. Words in `em` render as lime italic.
export function Words({ text, em = [], className = '', delay = 0, now = false }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const shown = now || seen
  return (
    <span className={className} aria-label={text} ref={ref}>
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '.12em', marginBottom: '-.12em' }}>
          <motion.span style={{ display: 'inline-block' }} className={em.includes(w) ? 'em' : ''}
            initial={{ y: '115%' }} animate={{ y: shown ? 0 : '115%' }} transition={{ duration: 1, delay: delay + i * 0.06, ease }}>{w}&nbsp;</motion.span>
        </span>
      ))}
    </span>
  )
}

// paragraph whose words light up as you scroll
export function ScrubText({ text, className = '', from = 0.14 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => <ScrubWord key={i} w={w} p={scrollYProgress} a={i / words.length} b={(i + 1) / words.length} from={from} />)}
    </p>
  )
}
function ScrubWord({ w, p, a, b, from }) {
  const o = useTransform(p, [a, b], [from, 1])
  return <motion.span style={{ opacity: o }}>{w} </motion.span>
}

export function Magnetic({ children, className = '', to, href, onClick, type, strength = 0.3, disabled }) {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 })
  const move = (e) => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * strength); y.set((e.clientY - r.top - r.height / 2) * strength) }
  const leave = () => { x.set(0); y.set(0) }
  const props = { className, onMouseMove: move, onMouseLeave: leave, ref, onClick }
  const wrap = (el) => <motion.div style={{ x: sx, y: sy, display: 'inline-block' }}>{el}</motion.div>
  if (to) return wrap(<Link to={to} {...props}>{children}</Link>)
  if (href) return wrap(<a href={href} {...props}>{children}</a>)
  return wrap(<button type={type} disabled={disabled} {...props}>{children}</button>)
}

export function Counter({ to, suffix = '' }) {
  const ref = useRef(null), inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => { if (inView) { const c = animate(0, to, { duration: 2, ease, onUpdate: (n) => setV(Math.round(n)) }); return () => c.stop() } }, [inView, to])
  return <b ref={ref}>{v}{suffix}</b>
}

// huge closing line that links to contact
export function BigLink({ lead = 'Have a store that needs a team?', to = '/talk', label = "Let's talk" }) {
  return (
    <section className="biglink">
      <Shape3D shape="jack" className="bl-jack" speed={.8} />
      <div className="wrap">
        <Reveal><p className="mono-s">{lead}</p></Reveal>
        <Link to={to} className="bl-a"><span className="serif"><Words text={label} em={[label.split(' ').pop()]} /></span><i>↗</i></Link>
      </div>
    </section>
  )
}

export function Silhouette() {
  return (
    <svg viewBox="0 0 120 120" fill="#cfd4c4"><circle cx="60" cy="42" r="22" /><path d="M14 120c2-30 22-46 46-46s44 16 46 46z" /></svg>
  )
}

export function Curtain({ id }) {
  return (
    <motion.div key={id} className="curtain" initial={{ y: '0%' }} animate={{ y: '-101%' }} transition={{ duration: .9, ease: [.76, 0, .24, 1], delay: .05 }}>
      <img src="/logo.png" alt="" />
    </motion.div>
  )
}

export { Link, NavLink }
