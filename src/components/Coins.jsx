import { useRef, Suspense } from "react"
import { MeshStandardMaterial, Shape, BoxGeometry, CylinderGeometry, SphereGeometry } from "three"
import { useFrame } from "@react-three/fiber"
import { Extrude, useGLTF } from "@react-three/drei"

// Dai

const whitemetal = new MeshStandardMaterial({ roughness: 0.3, metalness: 1, color: "white" })
const box = new BoxGeometry(1, 1, 1)
const cylinder = new CylinderGeometry(0.7, 0.7, 0.1, 32, 1, false)
const sphere = new SphereGeometry(1, 32, 32)

const y = 0.55
const x = 0.72
const arcShape = new Shape()
arcShape.moveTo(0, y)
arcShape.bezierCurveTo(x, y - 0.1, x, -(y - 0.1), 0, -y)
arcShape.bezierCurveTo(0, -y, 0, -(y - 0.1), 0, -(y - 0.1))
arcShape.bezierCurveTo(x - 0.15, -(y - 0.2), x - 0.15, y - 0.2, 0, y - 0.1)

export function Dai({ position, scale }) {
  const letterD = useRef()
  const barrels = useRef()
  useFrame((state, delta) => {
    letterD.current.rotation.y += delta * 0.5
    barrels.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3
  })

  return (
    <group position={position} scale={scale}>
      <group ref={letterD}>
        <Extrude position={[0, 0, -0.05]} args={[arcShape, { curveSegments: 48, steps: 1, depth: 0.1, bevelEnabled: false }]} material={whitemetal} />
        <mesh geometry={box} scale={[0.1, 1.1, 0.1]} position={[-0.4, 0, 0]} material={whitemetal} />
        <mesh geometry={box} scale={[0.4, 0.1, 0.1]} position={[-0.2, 0.5, 0]} material={whitemetal} />
        <mesh geometry={box} scale={[0.4, 0.1, 0.1]} position={[-0.2, -0.5, 0]} material={whitemetal} />
      </group>
      <group ref={barrels}>
        <mesh geometry={cylinder} position={[0, 0.13, 0]} rotation={[0.1, 0, 0]} material={whitemetal} />
        <mesh geometry={cylinder} position={[0, -0.13, 0]} rotation={[0.1, 0, 0]} material={whitemetal} />
      </group>
      <mesh geometry={sphere}>
        <meshStandardMaterial transparent={true} roughness={0.4} metalness={1} opacity={0.5} color={0xf5af3d} />
      </mesh>
    </group>
  )
}

// Usdt

export function Usdt({ position, scale }) {
  const letterT = useRef()
  const barrel = useRef()

  useFrame((state, delta) => {
    letterT.current.rotation.y += delta * 0.5
    barrel.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3
  })

  return (
    <group position={position} scale={scale}>
      <group ref={letterT}>
        <mesh material={whitemetal}>
          <boxGeometry args={[0.25, 1, 0.25]} />
        </mesh>
        <mesh position={[0, 0.4, 0]} material={whitemetal}>
          <boxGeometry args={[0.9, 0.25, 0.25]} />
        </mesh>
      </group>
      <mesh ref={barrel} geometry={cylinder} position={[0, 0, 0]} rotation={[0.1, 0, 0]} material={whitemetal} />
      <mesh geometry={sphere}>
        <meshStandardMaterial transparent={true} roughness={0.4} metalness={1} opacity={0.5} color={0x0b9898} />
      </mesh>
    </group>
  )
}

// Usdc

const sShape = new Shape()
sShape.moveTo(0.25, 0.2)
sShape.bezierCurveTo(0.25, 0.2, 0.25, 0.4, 0, 0.4)
sShape.bezierCurveTo(-0.35, 0.4, -0.35, -0.05, 0, -0.05)
sShape.bezierCurveTo(0.2, -0.05, 0.2, -0.3, 0, -0.3)
sShape.bezierCurveTo(-0.15, -0.3, -0.15, -0.2, -0.15, -0.2)
sShape.bezierCurveTo(-0.15, -0.2, -0.25, -0.2, -0.25, -0.2)
sShape.bezierCurveTo(-0.25, -0.2, -0.25, -0.4, 0, -0.4)
sShape.bezierCurveTo(0.35, -0.4, 0.35, 0.05, 0, 0.05)
sShape.bezierCurveTo(-0.2, 0.05, -0.2, 0.3, 0, 0.3)
sShape.bezierCurveTo(0.15, 0.3, 0.15, 0.2, 0.15, 0.2)

const arc = new Shape()
arc.moveTo(0.2, 0.75)
arc.bezierCurveTo(1, 0.6, 1, -0.6, 0.2, -0.75)
arc.bezierCurveTo(0.2, -0.75, 0.2, -0.65, 0.2, -0.65)
arc.bezierCurveTo(0.85, -0.5, 0.85, 0.5, 0.2, 0.65)

export function Usdc({ position, scale }) {
  const dollarsign = useRef()
  const arcs = useRef()

  useFrame((state, delta) => {
    dollarsign.current.rotation.y += delta * 0.5
    arcs.current.rotation.x += delta * 0.5
  })

  return (
    <group position={position} scale={scale}>
      <group ref={dollarsign}>
        <mesh geometry={box} scale={[0.1, 0.15, 0.1]} position={[0, 0.45, 0]} material={whitemetal} />
        <mesh geometry={box} scale={[0.1, 0.15, 0.1]} position={[0, -0.45, 0]} material={whitemetal} />
        <Extrude position={[0, 0, -0.05]} args={[sShape, { curveSegments: 24, steps: 1, depth: 0.1, bevelEnabled: false }]} material={whitemetal} />
      </group>
      <group ref={arcs}>
        <Extrude position={[0, 0, -0.05]} args={[arc, { curveSegments: 48, steps: 1, depth: 0.1, bevelEnabled: false }]} material={whitemetal} />
        <Extrude position={[0, 0, 0.05]} rotation={[0, Math.PI, 0]} args={[arc, { curveSegments: 48, steps: 1, depth: 0.1, bevelEnabled: false }]} material={whitemetal} />
      </group>
      <mesh geometry={sphere}>
        <meshStandardMaterial transparent={true} roughness={0.4} metalness={1} opacity={0.5} color={0x2671c4} />
      </mesh>
    </group>
  )
}

// Ibc

const cylinder1 = new CylinderGeometry(0.3, 0.3, 5)
const material3 = new MeshStandardMaterial({ color: "purple", transparent: true, opacity: 0.1 })
const material4 = new MeshStandardMaterial({ roughness: 0.25, metalness: 1, color: "purple" })

export function Ibc({ position, scale }) {
  const group = useRef()
  useFrame((state, delta) => {
    group.current.rotation.z += delta * 0.5
  })

  return (
    <group position={position} scale={scale}>
      <mesh geometry={sphere} material={material3} />
      <group ref={group}>
        <group rotation={[0, 0, Math.PI / 3]}>
          <mesh position={[0, -0.6, 0]} geometry={sphere} material={material4} scale={0.25} />
          <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 2]} geometry={cylinder1} material={material4} scale={0.25} />
        </group>
        <group rotation={[0, 0, -Math.PI / 3]}>
          <mesh position={[0, -0.6, 0]} geometry={sphere} material={material4} scale={0.25} />
          <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 2]} geometry={cylinder1} material={material4} scale={0.25} />
        </group>
        <group rotation={[0, 0, Math.PI / 1]}>
          <mesh position={[0, -0.6, 0]} geometry={sphere} material={material4} scale={0.25} />
          <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 2]} geometry={cylinder1} material={material4} scale={0.25} />
        </group>
      </group>
    </group>
  )
}

// Lunc

export function Lunc({ position, scale }) {
  const { nodes } = useGLTF("/lunc.glb")

  const mesh = useRef()
  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.4
  })

  return (
    <Suspense>
      <group position={position} scale={scale} ref={mesh} rotation={[0, -Math.PI / 2, Math.PI / 2]}>
        <mesh geometry={nodes.Sphere.geometry}>
          <meshStandardMaterial roughness={0.25} metalness={1} color={0xfcba03} />
        </mesh>
        <mesh geometry={nodes.Sphere1.geometry}>
          <meshStandardMaterial roughness={0.25} metalness={1} color={0xfcba03} />
        </mesh>
      </group>
      <mesh geometry={sphere} position={position} scale={scale}>
        <meshStandardMaterial transparent={true} opacity={0.3} color={"darkorange"} />
      </mesh>
    </Suspense>
  )
}

import { Geometry, Base, Subtraction, Intersection } from "@react-three/csg"

export function CSGLunc({ position, scale }) {
  const group = useRef()
  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.4
  })

  return (
    <Suspense>
      <group ref={group} position={position} scale={scale}>
        <mesh>
          <Geometry>
            <Base rotation={[0, 0, Math.PI / 2]}>
              <sphereGeometry args={[1, 100, 100]} />
            </Base>
            <Subtraction position={[0.82, 1.175, 0]} scale={[1.5, 1.5, 5]}>
              <sphereGeometry args={[1, 100, 100]} />
            </Subtraction>
          </Geometry>
          <meshStandardMaterial roughness={0.25} metalness={1} color={0xfcba03} />
        </mesh>
        <mesh>
          <Geometry>
            <Base rotation={[0, 0, Math.PI / 2]}>
              <sphereGeometry args={[1, 100, 100]} />
            </Base>
            <Intersection position={[0.82, 1.9, 0]} scale={[1.6, 1.5, 2.5]}>
              <sphereGeometry args={[1, 100, 100]} />
            </Intersection>
          </Geometry>
          <meshStandardMaterial roughness={0.25} metalness={1} color={0xfcba03} />
        </mesh>
      </group>
      <mesh geometry={sphere} position={position} scale={scale}>
        <meshStandardMaterial transparent={true} opacity={0.3} color={"darkorange"} />
      </mesh>
    </Suspense>
  )
}

// FireSphere

import { ShaderMaterial } from "three"

const vertexShader = `vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
float permute(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}

vec4 grad4(float j, vec4 ip){
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;

  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www; 

  return p;
}

float snoise(vec4 v){
  const vec2  C = vec2( 0.138196601125010504,  // (5 - sqrt(5))/20  G4
  0.309016994374947451); // (sqrt(5) - 1)/4   F4
// First corner
  vec4 i  = floor(v + dot(v, C.yyyy) );
  vec4 x0 = v -   i + dot(i, C.xxxx);

// Other corners

// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
  vec4 i0;

  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
//  i0.x = dot( isX, vec3( 1.0 ) );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;

//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;

  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  // i0 now contains the unique values 0,1,2,3 in each channel
  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

  //  x0 = x0 - 0.0 + 0.0 * C 
  vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
  vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
  vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
  vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;

// Permutations
  i = mod(i, 289.0); 
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute( permute( permute( permute (
    i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
    + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
    + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
    + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
// Gradients
// ( 7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)
// 7*7*6 = 294, which is close to the ring size 17*17 = 289.

  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

// Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));

// Mix contributions from the five corners
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
  + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;

}

uniform int uNumOctaves;
	
float fbm(vec4 x) {
	float v = 0.0;
	float a = 0.5;
	vec4 shift = vec4(100.);
	for (int i = 0; i < uNumOctaves; ++i) {
		v += a * snoise(x);
		x = x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}
	
float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

uniform float uTime;
uniform float uNoise;
uniform float uSpeed;
	
varying vec3 vPosition;
varying float vNoise;
	
void main() {
	vPosition = position;
	vNoise = fbm(vec4((position / uNoise) - vec3(0.0,uTime * uSpeed,0.0),0.0));
	vNoise = map(vNoise,-1.,1.,0.,1.);
	
	gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
}`

const fragmentShader = `
uniform vec3 uColor1;
uniform vec3 uColor2;
	
varying vec3 vPosition;
varying float vNoise;
	
void main() {
	float alpha = 0.2;
	float gradient = mix(0.,1.,-vPosition.y+1.75);
	if(vNoise > 0.3 * gradient) {alpha = 0.03;}
	float mask = mix(0.3,1.,-vPosition.y+0.5);
	alpha = alpha * (mask * 10.);
	vec3 color = mix(uColor1 / 255.,uColor2 / 255.,-vPosition.y+0.5);
	color.g = color.g * (1.0 + gradient * vNoise);
	gl_FragColor = vec4(color, alpha);
}`

const geometry = new SphereGeometry(1, 128, 128)

const material = new ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: [255, 0, 0] },
    uColor2: { value: [255, 60, 0] },
    uNoise: { value: 1 },
    uSpeed: { value: 1 },
    uNumOctaves: { value: 3 },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
})

export function FireSphere({ position = [0, 0, 0], scale = 100 }) {
  const mesh = useRef()
  useFrame((state) => {
    mesh.current.material.uniforms.uTime.value = state.clock.elapsedTime
  })

  return <mesh geometry={geometry} position={position} ref={mesh} scale={scale} material={material} />
}
