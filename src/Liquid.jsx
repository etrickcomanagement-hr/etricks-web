import { useEffect, useRef } from 'react'

const VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'

// The lighting needs the slope of the noise field. With derivatives we read it from neighbouring
// pixels (one field evaluation per pixel). Without them we fall back to three evaluations.
const FS = `
precision highp float;
uniform vec2 r; uniform float t; uniform vec2 m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.03+vec2(3.1,1.7);a*=.5;}return v;}
float field(vec2 p){
  vec2 q=vec2(fbm(p+vec2(0.,t*.06)),fbm(p+vec2(5.2,1.3)-t*.05));
  vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+t*.04),fbm(p+3.*q+vec2(8.3,2.8)-t*.03));
  return fbm(p+2.6*w);
}
void main(){
  vec2 uv=gl_FragCoord.xy/r;
  vec2 p=(gl_FragCoord.xy-.5*r)/r.y;
  p+=(m-.5)*vec2(.22,.16);
  p*=1.15;
  float f=field(p);
  float k=16.*.012/(1.15/r.y);
#ifdef DERIV
  float fx=dFdx(f), fy=dFdy(f);
  vec3 nn=normalize(vec3(-fx*k,-fy*k,.5));
#else
  float e=.012;
  vec3 nn=normalize(vec3(-(field(p+vec2(e,0.))-f)*16.,-(field(p+vec2(0.,e))-f)*16.,.5));
#endif
  vec3 L=normalize(vec3(-.45,.55,.7));
  float diff=clamp(dot(nn,L),0.,1.);
  vec3 H=normalize(L+vec3(0.,0.,1.));
  float spec=pow(clamp(dot(nn,H),0.,1.),48.);
  float rim=pow(1.-clamp(nn.z,0.,1.),2.2);
  float band=smoothstep(.18,.5,f);
  vec3 lime=vec3(.71,1.,0.);
  vec3 col=vec3(.012,.018,.006);
  col+=lime*(diff*diff*.8+rim*1.25)*band;
  col+=vec3(.95,1.,.82)*spec*1.3*band;
  col+=lime*.05*(1.-band);
  col*=1.-.45*dot(uv-.5,uv-.5)*2.;
  gl_FragColor=vec4(col,1.);
}`

export default function Liquid() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const gl = c.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'low-power' })
    if (!gl) { c.style.display = 'none'; return }
    const deriv = !!gl.getExtension('OES_standard_derivatives')
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s }
    const pr = gl.createProgram()
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS))
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, (deriv ? '#extension GL_OES_standard_derivatives : enable\n#define DERIV\n' : '') + FS))
    gl.linkProgram(pr)
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { c.style.display = 'none'; return }
    gl.useProgram(pr)
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const U = { r: gl.getUniformLocation(pr, 'r'), t: gl.getUniformLocation(pr, 't'), m: gl.getUniformLocation(pr, 'm') }
    const mouse = { x: .5, y: .5, tx: .5, ty: .5 }
    // Render below full resolution (it is a soft background), and step down further if frames get slow.
    let scale = Math.min(0.85, 1050 / Math.max(window.innerWidth, 1))
    const size = () => { c.width = Math.max(2, Math.round(c.clientWidth * scale)); c.height = Math.max(2, Math.round(c.clientHeight * scale)); gl.viewport(0, 0, c.width, c.height) }
    const mv = (e) => { mouse.tx = e.clientX / window.innerWidth; mouse.ty = 1 - e.clientY / window.innerHeight }
    let raf, visible = true, start = performance.now(), last = start, avg = 16, frames = 0
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; last = performance.now() }, { threshold: 0 }); io.observe(c)
    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      if (!visible || document.hidden) { last = now; return }
      const dt = now - last; last = now
      avg += (Math.min(dt, 100) - avg) * 0.06
      if (++frames % 90 === 0 && avg > 26 && scale > 0.3) { scale *= 0.82; size() } // under ~38 fps: draw fewer pixels
      mouse.x += (mouse.tx - mouse.x) * .04; mouse.y += (mouse.ty - mouse.y) * .04
      gl.uniform2f(U.r, c.width, c.height); gl.uniform1f(U.t, (now - start) / 1000); gl.uniform2f(U.m, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    size(); raf = requestAnimationFrame(frame)
    window.addEventListener('resize', size); window.addEventListener('mousemove', mv, { passive: true })
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', size); window.removeEventListener('mousemove', mv) }
  }, [])
  return <canvas ref={ref} className="liquid" aria-hidden="true" />
}
