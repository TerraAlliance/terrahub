import { Canvas } from "@react-three/fiber"
import { OrthographicCamera } from "@react-three/drei"
// import { Perf } from "r3f-perf"
// import { OrbitControls } from "@react-three/drei"
import { app } from "./global"
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
        {/* {process.env.NODE_ENV === "development" ? <Perf position={"bottom-left"} /> : null} */}
        {/* <OrbitControls enabled={true} /> */}
        <OrthographicCamera makeDefault position={[0, 0, 5000]} far={10000} />
        <Body />
      </Canvas>
    </div>
  )
}

function Background() {
  const selected = app.mainnav.selected.use()
  const classname = ["wallet", "learn", "ecosystem", "explore"][selected]

  return (
    <div
      className={classname}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "linear-gradient(black 70%, var(--Color)) 100%",
        transition: "--Color 0.6s ease",
      }}
    ></div>
  )
}
