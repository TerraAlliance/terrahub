import { useState, Suspense } from "react"
import { RoundedBox, useCursor } from "@react-three/drei"
import { animated, useSpringValue } from "@react-spring/three"
import { useWindowSize } from "@uidotdev/usehooks"

import Text from "./Text"
import Button from "./Button"

export default function Navbar({ state, children, names }) {
  const position = calculatePosition(state.origin.use(), state.translation.use(), useWindowSize())

  return (
    <>
      <Bar position={position} state={state} children={children} names={names} />
      <Pages state={state} children={children} />
    </>
  )
}

function Pages({ state, children }) {
  const size = useWindowSize()
  const selected = state.selected.use()
  const horizontal = state.direction.use() === "horizontal"

  const spring = useSpringValue(selected)
  spring.start(selected)

  return (
    <>
      {children.map((child, i) => (
        <animated.group
          key={i}
          position={spring.to((value) =>
            horizontal ? [i * size.width - value * (horizontal ? size.width : size.height), 0, 0] : [0, i * -size.height + value * (horizontal ? size.width : size.height), 0]
          )}
        >
          {child}
        </animated.group>
      ))}
    </>
  )
}

// function Pages({ state, children }) {
//   const size = useWindowSize()
//   const selected = state.selected.use()
//   const previous = state.previous.use()
//   const horizontal = state.direction.use() === "horizontal"
//   const [animating, setAnimating] = useState(false)

//   const spring = useSpringValue(selected)
//   spring.start(selected, { onStart: () => setAnimating(true), onRest: () => setAnimating(false) })

//   return (
//     <>
//       {children.map((child, i) => (
//         <animated.group
//           key={i}
//           position={spring.to((value) =>
//             horizontal ? [i * size.width - value * (horizontal ? size.width : size.height), 0, 0] : [0, i * -size.height + value * (horizontal ? size.width : size.height), 0]
//           )}
//         >
//           {child}
//         </animated.group>
//       ))}
//     </>
//   )
// }

function Bar({ position, state, children, names }) {
  const width = state.width.use()
  const radius = state.radius.use()
  const direction = state.direction.use()

  return (
    <group position={position}>
      {direction === "horizontal" ? (
        <Button width={width} radius={radius} color={"hsl(0, 0%, 16%)"} />
      ) : (
        <RoundedBox args={[width, radius * 3 * children.length - radius, 40]} bevelSegments={2} radius={20}>
          <meshStandardMaterial color={"hsl(0, 0%, 10%)"} metalness={0.8} />
        </RoundedBox>
      )}
      <Selected state={state} children={children} />
      <Buttons state={state} names={names} children={children} />
    </group>
  )
}

function Selected({ state, children }) {
  const width = state.width.use()
  const radius = state.radius.use()
  const height = radius * 3 * children.length
  const direction = state.direction.use()
  const selected = state.selected.use()
  const spring = useSpringValue(selected)
  spring.start(selected)

  const color = ["hsl(45, 100%, 30%)", "hsl(180, 100%, 30%)", "hsl(300, 100%, 30%)", "hsl(300, 100%, 20%)"][selected]

  return (
    <>
      {direction === "horizontal" ? (
        <animated.group position={spring.to((value) => [(width / children.length) * value - width / 2 + width / children.length / 2, 0, radius * 4])}>
          <Button width={width / children.length} radius={radius} color={color} />
        </animated.group>
      ) : (
        <animated.group position={spring.to((value) => [0, -(height / children.length) * value + height / 2 - height / children.length / 2, radius * 4])}>
          <Button width={width} radius={radius} color={state.color.use()} />
        </animated.group>
      )}
    </>
  )
}

function Buttons({ state, names, children }) {
  const horizontal = state.direction.use() === "horizontal"
  const width = state.width.use()
  const radius = state.radius.use()
  const height = radius * 3 * children.length

  return (
    <>
      {children.map((_, i) => (
        <group
          key={i}
          position-x={horizontal ? (width / children.length) * i - width / 2 + width / children.length / 2 : 0}
          position-y={horizontal ? 0 : -(height / children.length) * i + height / 2 - height / children.length / 2}
        >
          <TransparentButton key={i} state={state} index={i} children={children} width={width} radius={radius} horizontal={horizontal} />
          <Text text={names[i]} position-z={radius * 5} fontSize={25} />
        </group>
      ))}
    </>
  )
}

function TransparentButton({ state, index, children, width, radius, horizontal }) {
  const [hovered, setHover] = useState(false)
  useCursor(hovered)

  return (
    <Suspense>
      <mesh
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={() => state.selected.set(index)}
        rotation-z={90 * (Math.PI / 180)}
        position-z={radius}
      >
        <capsuleGeometry args={[radius, horizontal ? width / children.length - radius * 2 : width - radius * 2]} />
        <meshStandardMaterial
          transparent={true}
          opacity={hovered ? 0.25 : 0}
          metalness={1}
          roughness={1}
          color={horizontal ? ["hsl(45, 100%, 20%)", "hsl(180, 100%, 20%)", "hsl(300, 100%, 20%)", "hsl(200, 100%, 20%)"][index] : "hsl(44, 100%, 20%)"}
        />
      </mesh>
    </Suspense>
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
