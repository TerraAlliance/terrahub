import { Suspense } from "react"
import { Text as _Text } from "@react-three/drei"

export default function Text({ children, font, ...props }) {
  return (
    <Suspense>
      <_Text font={font || "./FuturaLightEmoji.ttf"} {...props}>
        {children}
      </_Text>
    </Suspense>
  )
}
