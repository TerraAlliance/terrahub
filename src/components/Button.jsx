import { useState, Suspense } from "react"
import { Text, useCursor } from "@react-three/drei"

export default function Button({ position, width, radius, color, text, textProps, onClick, opacity, geometry }) {
  const [hovered, setHover] = useState(false)
  useCursor(hovered)

  return (
    <Suspense>
      <group position={position}>
        <mesh geometry={geometry} rotation-z={Math.PI / 2} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} onClick={onClick}>
          {!geometry && <capsuleGeometry args={[radius, width - radius * 2]} />}
          <meshStandardMaterial transparent={true} opacity={hovered ? opacity / 2 : opacity} metalness={1} roughness={1} color={color} />
        </mesh>
        <Suspense>
          {text && (
            <Text position-z={radius} {...textProps}>
              {text}
            </Text>
          )}
        </Suspense>
      </group>
    </Suspense>
  )
}
