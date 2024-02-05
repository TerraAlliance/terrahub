import { useObservable } from "@legendapp/state/react"
import { useThree } from "@react-three/fiber"
import { animated, useSpringValue } from "@react-spring/three"

import Button from "../components/Button"

function MinMax(num, min, max) {
  if (num < min) return min
  if (num > max) return max
  return num
}

export default function Grid({ position, height, width, xspacing, columns, items, speed, visibleItems, children }) {
  const scroll = useObservable(0)
  const events = useThree((state) => state.events)
  const spring = useSpringValue(0, { onChange: () => events.update() })
  spring.start(scroll.get())

  const yspacing = (height - 75) / (visibleItems - 1)

  return (
    <group position={position}>
      <Button
        width={width}
        height={height}
        radius={10}
        color={"hsl(0, 0%, 16%)"}
        onWheel={(ev) => scroll.set((prev) => MinMax(prev + Math.sign(ev.deltaY), 0, (yspacing / speed) * Math.max(items - visibleItems, 0)))}
      />
      {items &&
        [...Array(Math.min((visibleItems - 1) * columns + 2 * columns, items))].map((_, i) => (
          <Item
            key={i}
            i={i}
            width={width}
            height={height - 75}
            xspacing={xspacing}
            columns={columns}
            spring={spring}
            yspacing={yspacing}
            speed={speed}
            visibleItems={visibleItems - 1}
            children={children}
          />
        ))}
    </group>
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
