import { Canvas } from "@react-three/fiber"
import { OrthographicCamera, Stats } from "@react-three/drei"
import { OrbitControls } from "@react-three/drei"

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

      <Canvas>
        <OrbitControls enabled={false} />
        <OrthographicCamera makeDefault position={[0, 0, 1000]} far={10000} />
        {process.env.NODE_ENV === "development" ? <Stats /> : null}
        <Body />
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
        backgroundImage: "linear-gradient(180deg, rgba(0,0,0,1) 60%, rgba(141,104,2,0.7) 100%",
      }}
    ></div>
  )
}

