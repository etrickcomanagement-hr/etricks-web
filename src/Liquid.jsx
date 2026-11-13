import { useEffect, useRef } from 'react'

const VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'
const FS = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r; uniform float t; uniform vec2 m;
HASH_FN
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(3.1,1.7);a*=.5;}return v;}
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
  float e=.012;
  float f=field(p);
  float fx=field(p+vec2(e,0.))-f, fy=field(p+vec2(0.,e))-f;
  vec3 nn=normalize(vec3(-fx*16.,-fy*16.,.5));
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

// Phone GPUs lose precision on sin() with big numbers, which turns the noise into hard blocks.
// On phones/tablets we use a hash without sin(); desktop keeps the original one untouched.
const HASH_DESKTOP = 'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}'
const HASH_PHONE = 'float h(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}'
const isPhone = () => window.matchMedia('(pointer:coarse), (max-width:800px)').matches

export default function Liquid() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const gl = c.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) { c.style.display = 'none'; return }
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s }
    const pr = gl.createProgram()
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS.replace('HASH_FN', isPhone() ? HASH_PHONE : HASH_DESKTOP))); gl.linkProgram(pr)
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { c.style.display = 'none'; return }
    gl.useProgram(pr)
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const U = { r: gl.getUniformLocation(pr, 'r'), t: gl.getUniformLocation(pr, 't'), m: gl.getUniformLocation(pr, 'm') }
    const mouse = { x: .5, y: .5, tx: .5, ty: .5 }
    const SCALE = isPhone() ? 0.65 : 0.55
    const size = () => { c.width = Math.max(2, c.clientWidth * SCALE); c.height = Math.max(2, c.clientHeight * SCALE); gl.viewport(0, 0, c.width, c.height) }
    const mv = (e) => { mouse.tx = e.clientX / window.innerWidth; mouse.ty = 1 - e.clientY / window.innerHeight }
    let raf, visible = true, start = performance.now()
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting }, { threshold: 0 }); io.observe(c)
    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      mouse.x += (mouse.tx - mouse.x) * .04; mouse.y += (mouse.ty - mouse.y) * .04
      gl.uniform2f(U.r, c.width, c.height); gl.uniform1f(U.t, (performance.now() - start) / 1000); gl.uniform2f(U.m, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    size(); frame()
    window.addEventListener('resize', size); window.addEventListener('mousemove', mv)
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', size); window.removeEventListener('mousemove', mv) }
  }, [])
  return <canvas ref={ref} className="liquid" aria-hidden="true" />
}
