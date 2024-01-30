import { useState } from "react"
import { animated, useSpringValue } from "@react-spring/three"
import { RoundedBox } from "@react-three/drei"

function MinMax(num, min, max) {
  if (num < min) return min
  if (num > max) return max
  return num
}

export default function Grid({ position, height, width, xspacing, columns, data, speed, visibleItems, children }) {
  const yspacing = (height - 100) / visibleItems
  const [scroll, setScroll] = useState(0)
  const spring = useSpringValue(0)
  spring.start(scroll)

  return (
    <group position={position}>
      <Box setScroll={setScroll} width={width} height={height} />
      {[...Array(visibleItems * columns + 2 * columns)].map((_, i) => (
        <Item
          key={i}
          i={i}
          data={data}
          width={width}
          height={height - 100}
          xspacing={xspacing}
          columns={columns}
          spring={spring}
          yspacing={yspacing}
          speed={speed}
          visibleItems={visibleItems}
          children={children}
        />
      ))}
    </group>
  )
}

function Box({ setScroll, height, width }) {
  return (
    <RoundedBox onWheel={(ev) => setScroll((prev) => Math.max(prev + Math.sign(ev.deltaY), 0))} args={[width, height, 40]} radius={10}>
      <meshPhysicalMaterial color={"hsl(0, 0%, 10%)"} roughness={1} metalness={0.8} />
    </RoundedBox>
  )
}

function Item({ i, height, width, xspacing, columns, spring, yspacing, speed, visibleItems, children }) {
  const gridX = (i % columns) * xspacing - ((columns - 1) * xspacing) / 2
  const gridY = -Math.floor(i / columns) * yspacing

  return (
    <AnimatedGroup
      position={spring.to((value) => {
        const y = ((gridY + value * speed + height + yspacing) % (height + yspacing * 2)) - yspacing
        return [gridX, MinMax(y, 0, height) - height / 2, y < 0 || y > height ? 50 : 150]
      })}
      width={width}
      index={spring.to((value) => i + Math.floor((gridY + value * speed + height + yspacing) / (height + yspacing * 2)) * (visibleItems * columns + 2 * columns))}
      children={children}
    />
  )
}

const AnimatedGroup = animated(Group)

function Group({ position, children, index, width }) {
  return <group position={position}>{children({ index: index, width: width })}</group>
}
