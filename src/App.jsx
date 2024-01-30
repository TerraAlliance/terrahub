import { Canvas } from "@react-three/fiber"
import { OrthographicCamera, Stats } from "@react-three/drei"
import { app } from "./global"
import Body from "./Body"
// import { Perf } from "r3f-perf"
// import { OrbitControls } from "@react-three/drei"

export default function App() {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "black",
      }}
    >
      <Background />
      <Canvas>
        {/* {process.env.NODE_ENV === "development" ? <Perf position={"bottom-left"} /> : null} */}
        {/* <OrbitControls enabled={false} enableZoom={false} /> */}
        <Stats />
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
        zIndex: 0,
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "linear-gradient(transparent 70%, var(--Color)) 100%",
        transition: "--Color 0.6s ease",
        pointerEvents: "none",
      }}
    ></div>
  )
}
