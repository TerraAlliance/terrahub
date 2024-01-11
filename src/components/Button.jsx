import { useState } from "react"
import { Html } from "@react-three/drei"

export default function Button({ position, radius, width, text, onClick }) {
  const [hovered, setHover] = useState(false)
  return (
    <group position={position}>
      <mesh onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} onClick={onClick} rotation-z={90 * (Math.PI / 180)}>
        <capsuleGeometry args={[radius, width - radius * 2]} />
        <meshStandardMaterial transparent={true} opacity={hovered ? 1 : 0.5} metalness={1} roughness={1} color={"hsl(44, 100%, 20%)"} />
      </mesh>
      <Html position={[0, 0, radius]} transform style={{ userSelect: "none" }} pointerEvents="none">
        <p style={{ fontFamily: "Gotham Light", fontSize: 800, color: "white", whiteSpace: "nowrap" }}> {text}</p>
      </Html>
    </group>
  )
}
