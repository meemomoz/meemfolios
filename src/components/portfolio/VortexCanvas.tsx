import { useEffect, useRef } from "react";
import * as THREE from "three";

// Background swirl shader code
const VERT = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  uniform vec3 uAccent;

  // Simplex noise (Ashima)
  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m; m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);
    vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uRes.x/uRes.y, 1.0);
    vec2 m = (uMouse - 0.5) * vec2(uRes.x/uRes.y, 1.0);

    // pull toward mouse
    vec2 d = p - m;
    float dist = length(d);
    float pull = exp(-dist*2.5) * 0.35;
    p -= normalize(d + 1e-4) * pull;

    // swirl
    float a = atan(p.y, p.x);
    float r = length(p);
    float swirl = sin(uTime*0.15) * 0.6 + 1.2;
    a += swirl / (r + 0.25);
    vec2 q = vec2(cos(a), sin(a)) * r;

    float n1 = snoise(q*1.6 + uTime*0.08);
    float n2 = snoise(q*3.2 - uTime*0.05 + n1);
    float n  = 0.5 + 0.5 * (n1*0.6 + n2*0.4);

    // vignette
    float vig = smoothstep(1.1, 0.2, length(p));

    // color: base cream, accent in the ink wisps
    vec3 base = vec3(0.99, 0.985, 0.97); // warm cream
    vec3 col = mix(base, uAccent, pow(n, 2.2) * 0.9);
    col *= vig;
    // subtle highlight near cursor
    col -= (vec3(1.0) - uAccent) * exp(-dist*4.0) * 0.15;

    // film grain
    float g = fract(sin(dot(uv*uRes, vec2(12.9898,78.233))) * 43758.5453);
    col += (g - 0.5) * 0.03;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// Particle custom shaders for high-performance 3D glow points
const PARTICLE_VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Floating drift movement
    pos.x += sin(uTime * 0.4 + pos.z * 0.05) * 2.0;
    pos.y += cos(uTime * 0.3 + pos.x * 0.05) * 2.0;
    
    // Parallax scrolling offset
    pos.z += uScroll * 45.0;
    // Wrap around to keep within space frustum (-80 to 20)
    if (pos.z > 20.0) {
      pos.z = -80.0 + mod(pos.z - 20.0, 100.0);
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size based on distance + pulse
    gl_PointSize = (60.0 / -mvPosition.z) * (1.0 + 0.3 * sin(uTime * 1.5 + pos.x));
    
    // Fade out elements very close or very far
    float distToCam = -mvPosition.z;
    vAlpha = smoothstep(80.0, 50.0, distToCam) * smoothstep(2.0, 8.0, distToCam);
  }
`;

const PARTICLE_FRAG = /* glsl */ `
  precision highp float;
  uniform vec3 uAccent;
  varying float vAlpha;

  void main() {
    // Crop square points into smooth glowing circles
    vec2 ptCoord = gl_PointCoord - vec2(0.5);
    float dist = length(ptCoord);
    if (dist > 0.5) discard;

    float glow = 1.0 - (dist * 2.0);
    glow = pow(glow, 1.8); // softer center gradient for orb effect

    gl_FragColor = vec4(uAccent, glow * 0.85 * vAlpha);
  }
`;

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return [r, g, b];
}

export function VortexCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef(new THREE.Vector3(...hexToVec3("#C84B31")));
  const targetAccentRef = useRef(new THREE.Vector3(...hexToVec3("#C84B31")));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = ref.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.autoClear = false;

    const dprCap = window.innerWidth < 768 ? 1 : 1.5;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));

    // Scene & Camera for Background Quad
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.Camera();

    const bgUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uAccent: { value: accentRef.current },
    };

    const bgMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: bgUniforms,
      depthWrite: false,
      depthTest: false,
    });
    const bgGeo = new THREE.PlaneGeometry(2, 2);
    const bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgScene.add(bgMesh);

    // Scene & Camera for 3D Particles
    const scene3d = new THREE.Scene();
    const camera3d = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera3d.position.set(0, 0, 15);

    // Generate random 3D stars / dust
    const particleCount = reduced ? 300 : 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position particles in a corridor
      positions[i] = (Math.random() - 0.5) * 45; // X
      positions[i + 1] = (Math.random() - 0.5) * 45; // Y
      positions[i + 2] = Math.random() * -80; // Z depth
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleUniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uAccent: { value: accentRef.current },
    };

    const particleMat = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      uniforms: particleUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const particles = new THREE.Points(geometry, particleMat);
    scene3d.add(particles);

    // Resize Handler
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      bgUniforms.uRes.value.set(w, h);
      camera3d.aspect = w / h;
      camera3d.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse Tracking
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const onMove = (e: PointerEvent) => {
      targetMouse.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove);

    // Color Accent Change Handler
    const onAccent = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === "string") {
        const [r, g, b] = hexToVec3(detail);
        targetAccentRef.current.set(r, g, b);
      }
    };
    window.addEventListener("vortex:accent", onAccent as EventListener);

    // Scroll Interpolation
    let targetScroll = 0;
    let currentScroll = 0;
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = totalHeight > 0 ? window.scrollY / totalHeight : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Tick Loop
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 1000;

      // Update variables
      bgUniforms.uTime.value = reduced ? 0 : t;
      bgUniforms.uMouse.value.lerp(targetMouse, reduced ? 1 : 0.06);

      particleUniforms.uTime.value = reduced ? 0 : t;
      particleUniforms.uMouse.value.copy(targetMouse);

      currentScroll = THREE.MathUtils.lerp(currentScroll, targetScroll, 0.08);
      particleUniforms.uScroll.value = currentScroll;

      accentRef.current.lerp(targetAccentRef.current, 0.04);

      // Camera drift on cursor
      if (!reduced) {
        camera3d.position.x = THREE.MathUtils.lerp(
          camera3d.position.x,
          (targetMouse.x - 0.5) * 3,
          0.05,
        );
        camera3d.position.y = THREE.MathUtils.lerp(
          camera3d.position.y,
          (targetMouse.y - 0.5) * 3,
          0.05,
        );
        camera3d.lookAt(0, 0, -30);
      }

      // Render
      renderer.clear();
      renderer.render(bgScene, bgCamera);
      renderer.render(scene3d, camera3d);

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("vortex:accent", onAccent as EventListener);
      window.removeEventListener("scroll", onScroll);
      bgGeo.dispose();
      bgMat.dispose();
      geometry.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 -z-10 h-screen w-screen" />;
}
