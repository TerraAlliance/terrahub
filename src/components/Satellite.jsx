import { useRef, useContext, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import { useSpringValue, animated } from "@react-spring/three"
import { context } from "../global"

export default function Satellite({ position, scale, onClick, hovered }) {
  const models = useContext(context)

  const satellite = useRef()
  useFrame((state, delta) => (satellite.current.rotation.y -= delta * 0.6))

  const explode = useSpringValue(0.5, { config: { mass: 1, friction: 10, tension: 400, clamp: true } })
  hovered ? explode.start(1.2) : explode.start(0.5)

  const _onClick = () => {
    explode
      .start(2)
      .then(() => explode.start(0.5))
      .then(() => onClick())
  }

  return (
    <Suspense>
      <group position={position} rotation={[0, Math.PI / -5, Math.PI / 2.5]} scale={scale}>
        <group ref={satellite}>
          <models.MetalCylinder scale={[0.16, 1, 0.16]} color={"white"} />
          <animated.group position={explode.to((v) => [v, 0, 0])}>
            <models.MetalBox scale={[0.6, 0.4, 0.05]} color={"hsl(220, 100%, 70%)"} />
          </animated.group>
          <animated.group position={explode.to((v) => [-v, 0, 0])}>
            <models.MetalBox scale={[0.6, 0.4, 0.05]} color={"hsl(220, 100%, 70%)"} />
          </animated.group>
          <animated.group position={explode.to((v) => [0, -v - 0.15, 0])}>
            <models.RoughHalfSphere scale={0.15} color={"hsl(220, 100%, 70%)"} />
          </animated.group>
        </group>
      </group>
      <models.VeryTransparentSphere color={0x5494f8} position={position} scale={hovered ? 0 : scale} onClick={_onClick} />
    </Suspense>
  )
}
