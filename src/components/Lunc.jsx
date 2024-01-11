import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

export default function Lunc({ position, scale }) {
  const { nodes } = useGLTF("/lunc.glb")

  const mesh = useRef()
  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.4
  })

  return (
    <group position={position} scale={scale}>
      <group ref={mesh} rotation={[0, -Math.PI / 2, Math.PI / 2]}>
        <mesh geometry={nodes.Sphere.geometry}>
          <meshStandardMaterial roughness={0.25} metalness={1} color={0xfcba03} />
          {/* <meshStandardMaterial metalness={1} roughness={0.7} color={"hsl(44, 100%, 20%)"} /> */}
        </mesh>
        <mesh geometry={nodes.Sphere1.geometry}>
          <meshStandardMaterial roughness={0.25} metalness={1} color={0xfcba03} />
          {/* <meshStandardMaterial metalness={1} roughness={0.7} color={"hsl(44, 100%, 20%)"} /> */}
        </mesh>
      </group>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial transparent={true} opacity={0.3} color={"darkorange"} />
      </mesh>
    </group>
  )
}
