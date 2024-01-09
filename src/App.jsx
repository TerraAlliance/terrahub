import { Canvas } from "@react-three/fiber"
import { Hud, OrthographicCamera, Stats } from "@react-three/drei"

import Body from "./Body"

export default function App() {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <Background />
      <Canvas >
        <Hud>
          <OrthographicCamera makeDefault position={[0, 0, 1000]} far={10000}  />
          {process.env.NODE_ENV === "development" ? <Stats /> : null}
          <Body />
        </Hud>
      </Canvas>
    </div>
  )
}

function Background() {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        zIndex: -1,
      }}
    ></div>
  )
}
