import { useState, Suspense } from "react"
import { RoundedBox, Text } from "@react-three/drei"
import { animated, useSpringValue } from "@react-spring/three"
import { useWindowSize } from "@uidotdev/usehooks"

export default function Navbar({ state, children, names }) {
  const position = calculatePosition(state.origin.use(), state.translation.use(), useWindowSize())
  return (
    <>
      <group position={position}>
        <Bar state={state} pages={children} />
        <Selected state={state} pages={children} />
        {children.map((page, index) => (
          <Button key={index} state={state} pages={children} index={index} names={names} />
        ))}
      </group>
      <Pages state={state} children={children} />
    </>
  )
}

function Pages({ state, children }) {
  const size = useWindowSize()
  const selected = state.selected.use()
  const direction = state.direction.use()

  const spring = useSpringValue(selected * (direction === "horizontal" ? size.width : size.height), {
    config: { mass: 1.7, friction: 30, tension: 200, clamp: false },
  })
  spring.start(selected * (direction === "horizontal" ? size.width : size.height))

  return (
    <>
      {children.map((page, index) => (
        <animated.group key={index} position={spring.to((value) => (direction === "horizontal" ? [index * size.width - value, 0, 0] : [0, index * -size.height + value, 0]))}>
          <Suspense>{page}</Suspense>
        </animated.group>
      ))}
    </>
  )
}

function Bar({ state, pages }) {
  const width = state.width.use()
  const radius = state.radius.use()
  const direction = state.direction.use()

  return (
    <>
      {direction === "horizontal" ? (
        <mesh rotation-z={90 * (Math.PI / 180)}>
          <capsuleGeometry args={[radius, width - radius * 2]} />
          <meshStandardMaterial color={"black"} metalness={0.8} />
        </mesh>
      ) : (
        <RoundedBox args={[width, radius * 3 * pages.length - radius, 40]} bevelSegments={2} radius={20}>
          <meshStandardMaterial color={"black"} metalness={0.8} />
        </RoundedBox>
      )}
    </>
  )
}

function Selected({ state, pages }) {
  const width = state.width.use()
  const radius = state.radius.use()
  const height = radius * 3 * pages.length
  const direction = state.direction.use()
  const selected = state.selected.use()
  const spring = useSpringValue(0, { config: { mass: 1.7, friction: 20, tension: 200, clamp: false } })
  spring.start(selected)

  const color = ["hsl(45, 100%, 20%)", "hsl(180, 100%, 20%)", "hsl(300, 100%, 20%)", "hsl(200, 100%, 20%)"][selected]

  return (
    <>
      {direction === "horizontal" ? (
        <animated.mesh position={spring.to((value) => [(width / pages.length) * value - width / 2 + width / pages.length / 2, 0, radius * 2])} rotation-z={90 * (Math.PI / 180)}>
          <capsuleGeometry args={[radius, width / pages.length - radius * 2]} />
          <meshStandardMaterial metalness={1} roughness={1} color={color} />
        </animated.mesh>
      ) : (
        <animated.mesh
          position={spring.to((value) => [0, -(height / pages.length) * value + height / 2 - height / pages.length / 2, radius * 2])}
          rotation-z={90 * (Math.PI / 180)}
        >
          <capsuleGeometry args={[radius, width - radius * 2]} />
          <meshStandardMaterial metalness={1} roughness={1} color={state.color.use()} />
        </animated.mesh>
      )}
    </>
  )
}

function Button({ state, pages, index, names }) {
  const width = state.width.use()
  const radius = state.radius.use()
  const height = radius * 3 * pages.length
  const horizontal = state.direction.use() === "horizontal"
  const [hovered, setHover] = useState(false)

  const position = horizontal
    ? [(width / pages.length) * index - width / 2 + width / pages.length / 2, 0, radius]
    : [0, -(height / pages.length) * index + height / 2 - height / pages.length / 2, radius]
  const args = horizontal ? [radius, width / pages.length - radius * 2] : [radius, width - radius * 2]
  const color = horizontal ? ["hsl(45, 100%, 20%)", "hsl(180, 100%, 20%)", "hsl(300, 100%, 20%)", "hsl(200, 100%, 20%)"][index] : "hsl(44, 100%, 20%)"

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={() => state.selected.set(index)}
        rotation-z={90 * (Math.PI / 180)}
        position-z={radius}
      >
        <capsuleGeometry args={args} />
        <meshStandardMaterial transparent={true} opacity={hovered ? 0.25 : 0} metalness={1} roughness={1} color={color} />
      </mesh>
      <Suspense>
        <Text position-z={radius * 2} font={"./GothamLight.otf"} fontSize={22}>
          {names[index]}
        </Text>
      </Suspense>
    </group>
  )
}

function calculatePosition(origin, translation, size) {
  const [x, y, z] = translation
  switch (origin) {
    case "top":
      return [x, size.height / 2 + y, z]
    case "bottom":
      return [x, -(size.height / 2) + y, z]
    case "left":
      return [-(size.width / 2) + x, y, z]
    case "right":
      return [size.width / 2 + x, y, z]
    default:
      return [x, y, z]
  }
}
