import { useRef } from "react"
import { MeshStandardMaterial, Shape, Path } from "three"
import { useFrame } from "@react-three/fiber"
import { Extrude } from "@react-three/drei"
import { Text } from "@react-three/drei"

export default function LuncAcademy({ position, scale }) {
  return (
    <>
      <group position={position}>
        <Logo scale={scale} />
        <Text position={[0, -175, 0]} color="white" fontSize={40} textAlign="center" font="./GothamLight.otf">
          Lunc Academy
        </Text>
      </group>
    </>
  )
}

const material = new MeshStandardMaterial({ roughness: 0.3, metalness: 1, color: "white" })

function Logo({ scale }) {
  const mesh = useRef()

  useFrame((state, delta) => {
    mesh.current.rotation.z += delta * 0.5
  })

  return (
    <group scale={scale}>
      <group ref={mesh}>
        <Extrude
          position={[0, 0, -0.05]}
          rotation-z={65 * (Math.PI / 180)}
          args={[arcShape, { curveSegments: 48, steps: 1, depth: 0.1, bevelEnabled: false }]}
          material={material}
        />
        <Extrude
          position={[0, 0, 0.05]}
          rotation-z={-65 * (Math.PI / 180)}
          rotation={[0, Math.PI, 0]}
          args={[arcShape, { curveSegments: 48, steps: 1, depth: 0.1, bevelEnabled: false }]}
          material={material}
        />
        <Extrude position={[-0.49, 0, -0.05]} args={[circle, { amount: 2, curveSegments: 48, steps: 2, depth: 0.1, bevelEnabled: false }]} material={material} />
        <Extrude position={[0.49, 0, -0.05]} args={[circle, { amount: 2, curveSegments: 48, steps: 2, depth: 0.1, bevelEnabled: false }]} material={material} />
      </group>

      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial transparent={true} roughness={0.4} metalness={1} opacity={0.5} color={0xfcba03} />
      </mesh>
    </group>
  )
}

const arcShape = new Shape()
arcShape.moveTo(0.2, 0.75)
arcShape.bezierCurveTo(1, 0.6, 1, -0.6, 0.2, -0.75)
arcShape.bezierCurveTo(0.2, -0.75, 0.2, -0.65, 0.2, -0.65)
arcShape.bezierCurveTo(0.85, -0.5, 0.85, 0.5, 0.2, 0.65)

var circle = new Shape()
circle.absarc(0, 0, 0.3, 0, Math.PI * 2, 0, false)
var hole = new Path()
hole.absarc(0, 0, 0.2, 0, Math.PI * 2, true)
circle.holes.push(hole)
