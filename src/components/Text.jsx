import { Html } from "@react-three/drei"

export default function Text({ position, children, fontSize }) {
  return (
    <>
      <Html position={position} transform style={{ userSelect: "none" }} pointerEvents="none" occlude="blending">
        <p style={{ fontFamily: "Gotham Light", fontSize: fontSize, color: "white", whiteSpace: "nowrap" }}>{children}</p>
      </Html>
    </>
  )
}
