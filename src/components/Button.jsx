import { useContext, Suspense } from "react"
import { useObservable } from "@legendapp/state/react"
import { useCursor } from "@react-three/drei"
import { context } from "../global"

export default function Button({ position, width = 0, height = 0, radius, color, hoveredColor, onClick, hovered, ...props }) {
  const models = useContext(context)
  const localHovered = useObservable(false)
  const buttonColor = localHovered.get() ? hoveredColor : color
  useCursor(localHovered.get())

  return (
    <Suspense>
      <group
        onPointerOver={() => (hovered ? (hovered.set(true), localHovered.set(true)) : localHovered.set(true))}
        onPointerOut={() => (hovered ? (hovered.set(false), localHovered.set(false)) : localHovered.set(false))}
        position={position}
        onClick={onClick}
        {...props}
      >
        <models.RoughQuarterSphere position-x={-width / 2} position-y={height / 2} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={radius} color={buttonColor} />
        <models.RoughQuarterSphere position-x={-width / 2} position-y={-height / 2} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={radius} color={buttonColor} />
        <models.RoughQuarterSphere position-x={width / 2} position-y={height / 2} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={radius} color={buttonColor} />
        <models.RoughQuarterSphere position-x={width / 2} position-y={-height / 2} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={radius} color={buttonColor} />
        {width ? (
          <>
            <models.RoughHalfCylinder rotation-z={Math.PI / 2} position-y={height / 2} scale={[radius, width, radius]} color={buttonColor} />
            <models.RoughHalfCylinder rotation-z={-Math.PI / 2} position-y={-height / 2} scale={[radius, width, radius]} color={buttonColor} />
          </>
        ) : null}
        {height ? (
          <>
            <models.RoughHalfCylinder position-x={-width / 2} rotation-z={Math.PI} scale={[radius, height, radius]} color={buttonColor} />
            <models.RoughHalfCylinder position-x={width / 2} rotation-z={Math.PI * 2} scale={[radius, height, radius]} color={buttonColor} />
          </>
        ) : null}
        {height && width ? <models.RoughBox scale={[width, height, radius * 2]} color={buttonColor} /> : null}
      </group>
    </Suspense>
  )
}
