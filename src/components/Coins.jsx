import { useRef, Suspense } from "react"
import { MeshStandardMaterial, Shape } from "three"
import { useFrame } from "@react-three/fiber"
import { Extrude, useGLTF } from "@react-three/drei"

// Dai

const y = 0.55
const x = 0.72
const arcShape = new Shape()
arcShape.moveTo(0, y)
arcShape.bezierCurveTo(x, y - 0.1, x, -(y - 0.1), 0, -y)
arcShape.bezierCurveTo(0, -y, 0, -(y - 0.1), 0, -(y - 0.1))
arcShape.bezierCurveTo(x - 0.15, -(y - 0.2), x - 0.15, y - 0.2, 0, y - 0.1)

const whitemetal = new MeshStandardMaterial({ roughness: 0.3, metalness: 1, color: "white" })

export function Dai({ position, scale }) {
  const letterD = useRef()
  useFrame((state, delta) => {
    letterD.current.rotation.y += delta * 0.5
  })
  const cylinders = useRef()
  useFrame((state) => {
    cylinders.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3
  })

  return (
    <group position={position} scale={scale}>
      <group ref={letterD}>
        <Extrude position={[0, 0, -0.05]} args={[arcShape, { curveSegments: 48, steps: 1, depth: 0.1, bevelEnabled: false }]} material={whitemetal} />
        <mesh position={[-0.4, 0, 0]} material={whitemetal}>
          <boxGeometry args={[0.1, 1.1, 0.1]} />
        </mesh>
        <mesh position={[-0.2, 0.5, 0]} material={whitemetal}>
          <boxGeometry args={[0.4, 0.1, 0.1]} />
        </mesh>
        <mesh position={[-0.2, -0.5, 0]} material={whitemetal}>
          <boxGeometry args={[0.4, 0.1, 0.1]} />
        </mesh>
      </group>
      <group ref={cylinders}>
        <mesh position={[0, 0.13, 0]} rotation={[0.1, 0, 0]} material={whitemetal}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 32, 1, false]} />
        </mesh>
        <mesh position={[0, -0.13, 0]} rotation={[0.1, 0, 0]} material={whitemetal}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 32, 1, false]} />
        </mesh>
      </group>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial transparent={true} roughness={0.4} metalness={1} opacity={0.5} color={0xf5af3d} />
      </mesh>
    </group>
  )
}

// Usdt

export function Usdt({ position, scale }) {
  const t = useRef()
  const cylinder = useRef()

  useFrame((state, delta) => {
    t.current.rotation.y += delta * 0.5
  })
  useFrame((state) => {
    cylinder.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3
  })

  return (
    <group position={position} scale={scale}>
      <group ref={t}>
        <mesh material={whitemetal}>
          <boxGeometry args={[0.25, 1, 0.25]} />
        </mesh>
        <mesh position={[0, 0.4, 0]} material={whitemetal}>
          <boxGeometry args={[0.9, 0.25, 0.25]} />
        </mesh>
      </group>
      <mesh ref={cylinder} position={[0, 0, 0]} rotation={[0.1, 0, 0]} material={whitemetal}>
        <cylinderGeometry args={[0.7, 0.7, 0.1, 32, 1, false]} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
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
  const mesh1 = useRef()
  const mesh2 = useRef()

  useFrame((state, delta) => {
    mesh1.current.rotation.y += delta * 0.5
  })
  useFrame((state, delta) => {
    mesh2.current.rotation.x += delta * 0.5
  })

  return (
    <group position={position} scale={scale}>
      <group ref={mesh1}>
        <mesh position={[0, 0.45, 0]} material={whitemetal}>
          <boxGeometry args={[0.1, 0.15, 0.1]} />
        </mesh>
        <mesh position={[0, -0.45, 0]} material={whitemetal}>
          <boxGeometry args={[0.1, 0.15, 0.1]} />
        </mesh>
        <Extrude position={[0, 0, -0.05]} args={[sShape, { curveSegments: 24, steps: 1, depth: 0.1, bevelEnabled: false }]} material={whitemetal} />
      </group>

      <group ref={mesh2}>
        <Extrude position={[0, 0, -0.05]} args={[arc, { curveSegments: 48, steps: 1, depth: 0.1, bevelEnabled: false }]} material={whitemetal} />
        <Extrude position={[0, 0, 0.05]} rotation={[0, Math.PI, 0]} args={[arc, { curveSegments: 48, steps: 1, depth: 0.1, bevelEnabled: false }]} material={whitemetal} />
      </group>

      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial transparent={true} roughness={0.4} metalness={1} opacity={0.5} color={0x2671c4} />
      </mesh>
    </group>
  )
}

// Ibc

import { SphereGeometry, CylinderGeometry } from "three"

const sphere = new SphereGeometry(1, 32, 32)
const cylinder = new CylinderGeometry(0.3, 0.3, 5)
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
          <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 2]} geometry={cylinder} material={material4} scale={0.25} />
        </group>
        <group rotation={[0, 0, -Math.PI / 3]}>
          <mesh position={[0, -0.6, 0]} geometry={sphere} material={material4} scale={0.25} />
          <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 2]} geometry={cylinder} material={material4} scale={0.25} />
        </group>
        <group rotation={[0, 0, Math.PI / 1]}>
          <mesh position={[0, -0.6, 0]} geometry={sphere} material={material4} scale={0.25} />
          <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 2]} geometry={cylinder} material={material4} scale={0.25} />
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
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial transparent={true} opacity={0.3} color={"darkorange"} />
      </mesh>
    </Suspense>
  )
}

// import { Geometry, Base, Subtraction, Intersection } from "@react-three/csg"
// export function CSGLunc({ position, scale }) {
//   const mesh = useRef()
//   useFrame((state, delta) => {
//     mesh.current.rotation.y += delta * 0.4
//   })

//   return (
//     <Suspense>
//       <group position={position} scale={scale} ref={mesh}>
//         <mesh>
//           <Geometry>
//             <Base rotation={[0, 0, Math.PI / 2]}>
//               <sphereGeometry args={[1, 100, 100]} />
//             </Base>
//             <Subtraction position={[0.82, 1.175, 0]} scale={[1.5, 1.5, 5]}>
//               <sphereGeometry args={[1, 100, 100]} />
//             </Subtraction>
//           </Geometry>
//           <meshStandardMaterial roughness={0.25} metalness={1} color={0xfcba03} />
//         </mesh>
//         <mesh>
//           <Geometry>
//             <Base rotation={[0, 0, Math.PI / 2]}>
//               <sphereGeometry args={[1, 100, 100]} />
//             </Base>
//             <Intersection position={[0.82, 1.9, 0]} scale={[1.6, 1.5, 5]}>
//               <sphereGeometry args={[1, 100, 100]} />
//             </Intersection>
//           </Geometry>
//           <meshStandardMaterial roughness={0.25} metalness={1} color={0xfcba03} />
//         </mesh>
//         <mesh>
//           <sphereGeometry args={[1, 32, 32]} />
//           <meshStandardMaterial transparent={true} opacity={0.3} color={"darkorange"} />
//         </mesh>
//       </group>
//     </Suspense>
//   )
// }
