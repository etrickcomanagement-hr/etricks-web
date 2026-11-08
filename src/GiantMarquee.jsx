import { useRef, useState, useEffect } from 'react'
import { m as motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useVelocity } from 'framer-motion'

const PHRASE = [
  ['sans', 'We launch,'], ['em', 'scale'], ['star'], ['sans', '& fix'], ['em', 'every store'], ['star'],
  ['sans', 'from Multan'], ['em', 'to the world'], ['star'],
]

function Group({ hidden }) {
  return (
    <span className="gmq-g" aria-hidden={hidden || undefined}>
      {PHRASE.map(([k, t], i) => k === 'star'
        ? <i key={i} className="gmq-star">✦</i>
        : <span key={i} className={'gmq-' + k}>{t}</span>)}
    </span>
  )
}

/* Huge line of text that keeps moving, and speeds up (or reverses) when you scroll. */
export default function GiantMarquee() {
  const x = useMotionValue(0)
  const ref = useRef(null)
  const dir = useRef(1)
  const on = useRef(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { on.current = e.isIntersecting }, { rootMargin: '200px' })
    io.observe(ref.current); return () => io.disconnect()
  }, [])
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })

  useAnimationFrame((_, dt) => {
    const el = ref.current
    if (!el || !on.current) return
    const w = el.scrollWidth / 2
    if (!w) return
    const v = vel.get()
    if (Math.abs(v) > 40) dir.current = v < 0 ? -1 : 1
    const speed = 70 + Math.min(Math.abs(v) * 0.35, 900)
    let nx = x.get() - dir.current * speed * (dt / 1000)
    if (nx <= -w) nx += w
    if (nx > 0) nx -= w
    x.set(nx)
  })

  return (
    <section className="gmq" aria-label="eTricks: we launch, scale and fix every store, from Multan to the world">
      <motion.div className="gmq-track" ref={ref} style={{ x }}>
        <Group /><Group hidden /><Group hidden /><Group hidden />
      </motion.div>
    </section>
  )
}
