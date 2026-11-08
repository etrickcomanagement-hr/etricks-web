import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { feature } from 'topojson-client'
import { geoEquirectangular, geoPath } from 'd3-geo'
import land110 from 'world-atlas/land-110m.json'

const RAD = Math.PI / 180
const HUB = { lat: 30.16, lon: 71.52 } // Multan
export const MARKET_POINTS = {
  UK: { lat: 51.5, lon: -0.12 },
  US: { lat: 40.71, lon: -74.0 },
  AU: { lat: -33.87, lon: 151.2 },
  CA: { lat: 43.65, lon: -79.38 },
  KSA: { lat: 24.71, lon: 46.68 },
}

const toVec = (lat, lon, r = 1) => new THREE.Vector3(r * Math.cos(lat * RAD) * Math.sin(lon * RAD), r * Math.sin(lat * RAD), r * Math.cos(lat * RAD) * Math.cos(lon * RAD))

/* land dots: draw the land mask on a canvas, then sample it */
function landDots() {
  const W = 1024, H = 512
  const c = document.createElement('canvas'); c.width = W; c.height = H
  const ctx = c.getContext('2d', { willReadFrequently: true })
  const proj = geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2])
  ctx.fillStyle = '#fff'; ctx.beginPath(); geoPath(proj, ctx)(feature(land110, land110.objects.land)); ctx.fill()
  const data = ctx.getImageData(0, 0, W, H).data
  const pts = []
  const STEP = 5
  for (let y = 4; y < H - 4; y += STEP) {
    const lat = 90 - (y / H) * 180
    const xs = STEP / Math.max(0.18, Math.cos(lat * RAD)) // even spacing towards the poles
    for (let x = 0; x < W; x += xs) {
      if (data[(y * W + Math.floor(x)) * 4 + 3] > 128) {
        const v = toVec(lat, (x / W) * 360 - 180, 1.002); pts.push(v.x, v.y, v.z)
      }
    }
  }
  return new Float32Array(pts)
}

function dotTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  const c = document.createElement('canvas'); c.width = c.height = 64
  const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  gr.addColorStop(0, inner); gr.addColorStop(0.4, inner); gr.addColorStop(1, outer)
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

function arcPoints(a, b, n = 80) {
  const out = []
  const dist = a.angleTo(b)
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const p = a.clone().lerp(b, t).normalize() // spherical-ish interpolation
    out.push(p.multiplyScalar(1 + Math.sin(Math.PI * t) * 0.16 * (0.5 + dist / Math.PI)))
  }
  return out
}

export default function Globe({ active = null, className = '' }) {
  const ref = useRef(null)
  const act = useRef(active)
  useEffect(() => { act.current = active }, [active])

  useEffect(() => {
    const el = ref.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }) } catch { el.style.display = 'none'; return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    el.appendChild(renderer.domElement); renderer.domElement.style.cssText = 'width:100%;height:100%;display:block'
    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50); cam.position.set(0, 0, 4.6)
    const globe = new THREE.Group(); scene.add(globe)

    // dark planet + soft atmosphere
    const base = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), new THREE.MeshBasicMaterial({ color: 0x050805 }))
    scene.add(base)
    const halo = new THREE.Mesh(new THREE.SphereGeometry(1.18, 64, 64), new THREE.ShaderMaterial({
      transparent: true, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: 'varying vec3 n;void main(){n=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: 'varying vec3 n;void main(){float i=pow(.72-dot(n,vec3(0.,0.,1.)),3.);gl_FragColor=vec4(.71,1.,0.,1.)*i*.55;}',
    }))
    scene.add(halo)

    // land dots
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(landDots(), 3))
    const dotTex = dotTexture()
    const dots = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xa6ee00, size: 0.024, map: dotTex, transparent: true, alphaTest: 0.05, depthWrite: false, opacity: 1 }))
    globe.add(dots)

    // hub + markets + arcs
    const glowTex = dotTexture('rgba(182,255,0,1)', 'rgba(182,255,0,0)')
    const mkSprite = (v, s) => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); sp.position.copy(v); sp.scale.setScalar(s); return sp }
    const hubV = toVec(HUB.lat, HUB.lon, 1.01)
    const hub = mkSprite(hubV, 0.16); globe.add(hub)
    const items = {}
    const lineMat = () => new THREE.LineBasicMaterial({ color: 0xb6ff00, transparent: true, opacity: 0.4, depthWrite: false })
    Object.entries(MARKET_POINTS).forEach(([code, p], i) => {
      const v = toVec(p.lat, p.lon, 1.01)
      const mk = mkSprite(v, 0.11); globe.add(mk)
      const pts = arcPoints(hubV.clone().normalize(), v.clone().normalize())
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat()); globe.add(line)
      const pulse = mkSprite(pts[0], 0.07); globe.add(pulse)
      items[code] = { mk, line, pulse, pts, off: i * 0.19 }
    })

    const size = () => { const w = el.clientWidth || 1, h = el.clientHeight || 1; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix() }
    size(); const ro = new ResizeObserver(size); ro.observe(el)
    const m = { x: 0, y: 0, tx: 0, ty: 0 }
    const mv = (e) => { m.tx = (e.clientX / window.innerWidth - 0.5); m.ty = (e.clientY / window.innerHeight - 0.5) }
    window.addEventListener('mousemove', mv)
    globe.rotation.set(0.4, -1.2, 0)
    let visible = false, raf = 0, last = performance.now()
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting }, { rootMargin: '100px' }); io.observe(el)
    const norm = (a) => ((a + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000); last = now
      if (!visible || document.hidden) return
      m.x += (m.tx - m.x) * 0.05; m.y += (m.ty - m.y) * 0.05
      const a = act.current && MARKET_POINTS[act.current]
      if (a) {
        globe.rotation.y += norm(-a.lon * RAD - globe.rotation.y) * 0.06
        globe.rotation.x += (a.lat * RAD * 0.55 - globe.rotation.x) * 0.06
      } else {
        if (!still) globe.rotation.y += dt * 0.09
        globe.rotation.x += (0.42 + m.y * 0.25 - globe.rotation.x) * 0.04
      }
      scene.rotation.y = m.x * 0.18
      const t = now / 1000
      Object.entries(items).forEach(([code, it]) => {
        const on = act.current === code, dim = act.current && !on
        it.line.material.opacity += ((on ? 1 : dim ? 0.12 : 0.4) - it.line.material.opacity) * 0.12
        it.mk.scale.setScalar(it.mk.scale.x + ((on ? 0.22 : 0.11) - it.mk.scale.x) * 0.12)
        const k = ((t * 0.22 + it.off) % 1) * (it.pts.length - 1)
        it.pulse.position.copy(it.pts[Math.floor(k)])
        it.pulse.material.opacity = dim ? 0.2 : 1
      })
      hub.scale.setScalar(0.16 + Math.sin(t * 2.2) * 0.02)
      renderer.render(scene, cam)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); window.removeEventListener('mousemove', mv)
      scene.traverse((o) => { o.geometry && o.geometry.dispose(); o.material && o.material.dispose && o.material.dispose() })
      dotTex.dispose(); glowTex.dispose(); renderer.dispose(); renderer.forceContextLoss(); el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={ref} className={'globe3d ' + className} aria-hidden="true" />
}
