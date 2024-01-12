import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { Text } from "@react-three/drei"

export default function MoonRabbit({ position, scale }) {
  const { nodes } = useGLTF("/rabbit.gltf")

  console.log(nodes)

  const mesh = useRef()
  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.4
  })

  return (
    <group position={position}>
      <group ref={mesh} scale={scale}>
        <mesh position={[0, -0.5, 0]} geometry={nodes.mesh_0.geometry}>
          <meshStandardMaterial roughness={0.25} metalness={1} color={"white"} />
          {/* <meshStandardMaterial metalness={1} roughness={0.7} color={"hsl(44, 100%, 20%)"} /> */}
        </mesh>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial transparent={true} roughness={0.5} metalness={1} opacity={0.3} color={"purple"} />
        </mesh>
      </group>
      <Text position={[0, -175, 0]} color="white" fontSize={40} textAlign="center" font="./GothamLight.otf">
        Moon Rabbit
      </Text>
    </group>
  )
}
