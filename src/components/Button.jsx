import { useContext } from "react"
import { useState, Suspense } from "react"
import { useCursor } from "@react-three/drei"
import { context } from "../global"

export default function Button({ position, width, radius, color, hoveredColor, onClick }) {
  const models = useContext(context)
  const [hovered, setHover] = useState(false)
  useCursor(hovered)

  return (
    <Suspense>
      <group position={position}>
        <models.RoughHalfSphere
          position-x={-width / 2 + radius}
          rotation-z={Math.PI / 2}
          scale={radius}
          color={hovered ? hoveredColor : color}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          onClick={onClick}
        />
        <models.RoughHalfSphere
          position-x={width / 2 - radius}
          rotation-z={-Math.PI / 2}
          scale={radius}
          color={hovered ? hoveredColor : color}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          onClick={onClick}
        />
        <models.RoughCylinder
          rotation-z={Math.PI / 2}
          scale={[radius, width - radius * 2, radius]}
          color={hovered ? hoveredColor : color}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          onClick={onClick}
        />
      </group>
    </Suspense>
  )
}
