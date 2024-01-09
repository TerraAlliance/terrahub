import { useState } from "react"
import { Html } from "@react-three/drei"

export default function Connect() {
  const [hovered, setHover] = useState(false)
  return (
    <group position={[740, 440, 0]}>
      <mesh onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} onClick={() => null} rotation-z={90 * (Math.PI / 180)}>
        <capsuleGeometry args={[20, 160]} />
        <meshStandardMaterial transparent={true} opacity={hovered ? 1 : 0.5} metalness={1} roughness={1} color={"hsl(44, 100%, 20%)"} />
      </mesh>
      <Html transform style={{ userSelect: "none" }} pointerEvents="none" position-z={20 * 2}>
        <p style={{ fontFamily: "Gotham Light", fontSize: 800, color: "white" }}>Connect</p>
      </Html>
    </group>
  )
}
