import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* A softly lit studio built from emissive panels, so metal picks up white and lime reflections. */
function makeEnv(renderer) {
  const s = new THREE.Scene()
  const dark = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), new THREE.MeshBasicMaterial({ color: 0x050604, side: THREE.BackSide }))
  s.add(dark)
  const panel = (w, h, c, x, y, z, ry = 0, rx = 0, k = 1) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }))
    m.position.set(x, y, z); m.rotation.set(rx, ry, 0); s.add(m)
  }
  panel(14, 4, 0xffffff, 0, 11, 2, 0, Math.PI / 2, 3)       // top softbox
  panel(3, 16, 0xb6ff00, -11, 0, 2, Math.PI / 2, 0, 3)      // lime strip, left
  panel(6, 12, 0xffffff, 11, 2, 4, Math.PI / 2, 0, 2.2)     // white, right
  panel(18, 2.4, 0xb6ff00, 0, -8, 5, 0, Math.PI / 2, 1.6)   // lime floor bounce
  panel(10, 6, 0x9bd600, 0, 3, -12, 0, 0, 1.2)              // back fill
  const pm = new THREE.PMREMGenerator(renderer)
  const env = pm.fromScene(s, 0.02).texture
  pm.dispose(); s.traverse((o) => { o.geometry && o.geometry.dispose(); o.material && o.material.dispose() })
  return env
}

function build(shape) {
  const g = new THREE.Group()
  if (shape === 'jack') {
    const mat = new THREE.MeshStandardMaterial({ color: 0xeef0e6, metalness: 1, roughness: 0.14 })
    const geo = new THREE.CapsuleGeometry(0.42, 2.5, 12, 36)
    ;[[0, 0, 0], [0, 0, Math.PI / 2], [Math.PI / 2, 0, 0]].forEach(([x, y, z]) => { const m = new THREE.Mesh(geo, mat); m.rotation.set(x, y, z); g.add(m) })
    const m2 = new THREE.Mesh(geo, mat); m2.rotation.set(0.9, 0.9, 0.3); m2.scale.setScalar(0.9); g.add(m2)
    g.scale.setScalar(0.62)
  } else if (shape === 'knot') {
    const mat = new THREE.MeshPhysicalMaterial({ color: 0xb6ff00, metalness: 0.55, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.08 })
    g.add(new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.34, 260, 40, 2, 3), mat)); g.scale.setScalar(0.95)
  } else if (shape === 'bubble') {
    const geo = new THREE.IcosahedronGeometry(1.2, 30)
    const p = geo.attributes.position, v = new THREE.Vector3()
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).normalize()
      const n = Math.sin(v.x * 2.2 + 0.7) * Math.sin(v.y * 2.0 + 1.9) * Math.sin(v.z * 2.4 + 0.2)
      v.multiplyScalar(1.2 + n * 0.16); p.setXYZ(i, v.x, v.y, v.z)
    }
    geo.computeVertexNormals()
    g.add(new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: 0x040504, metalness: 0.35, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.03, iridescence: 1, iridescenceIOR: 1.9, iridescenceThicknessRange: [260, 900], envMapIntensity: 1.6 })))
  } else if (shape === 'blob') {
    const geo = new THREE.IcosahedronGeometry(1.25, 28)
    const p = geo.attributes.position, v = new THREE.Vector3()
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).normalize()
      const n = Math.sin(v.x * 3.1 + 1.3) * Math.sin(v.y * 2.6 + 0.4) * Math.sin(v.z * 3.4 + 2.1) + 0.5 * Math.sin(v.x * 6.2 + v.y * 5.1)
      v.multiplyScalar(1.25 + n * 0.22); p.setXYZ(i, v.x, v.y, v.z)
    }
    geo.computeVertexNormals()
    g.add(new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: 0xdfff7a, metalness: 0.85, roughness: 0.12, clearcoat: 1, iridescence: 0.8, iridescenceIOR: 1.5, iridescenceThicknessRange: [180, 420] })))
  }
  return g
}

export default function Shape3D({ shape = 'jack', className = '', speed = 1, tilt = 0.35 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }) } catch { el.style.display = 'none'; return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05
    el.appendChild(renderer.domElement); renderer.domElement.style.cssText = 'width:100%;height:100%;display:block'
    const scene = new THREE.Scene()
    scene.environment = makeEnv(renderer)
    const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 50); cam.position.set(0, 0, 7.2)
    const obj = build(shape); scene.add(obj)
    const size = () => { const w = el.clientWidth || 1, h = el.clientHeight || 1; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix() }
    size()
    const ro = new ResizeObserver(size); ro.observe(el)
    const m = { x: 0, y: 0, tx: 0, ty: 0 }
    const mv = (e) => { m.tx = (e.clientX / window.innerWidth - 0.5) * 2; m.ty = (e.clientY / window.innerHeight - 0.5) * 2 }
    window.addEventListener('mousemove', mv)
    let visible = false, raf = 0
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now()
    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!visible || document.hidden) return
      const t = (performance.now() - t0) / 1000
      m.x += (m.tx - m.x) * 0.05; m.y += (m.ty - m.y) * 0.05
      if (!still) { obj.rotation.y = t * 0.35 * speed + m.x * tilt * 1.6; obj.rotation.x = Math.sin(t * 0.5 * speed) * 0.25 + m.y * tilt; obj.position.y = Math.sin(t * 0.8 * speed) * 0.1 }
      renderer.render(scene, cam)
    }
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting }, { rootMargin: '120px' }); io.observe(el)
    frame()
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); window.removeEventListener('mousemove', mv)
      scene.traverse((o) => { o.geometry && o.geometry.dispose(); o.material && o.material.dispose && o.material.dispose() })
      scene.environment && scene.environment.dispose(); renderer.dispose(); renderer.forceContextLoss(); el.removeChild(renderer.domElement)
    }
  }, [shape, speed, tilt])
  return <div ref={ref} className={'s3d ' + className} aria-hidden="true" />
}
