import { Canvas } from "@react-three/fiber"
import { OrthographicCamera, Stats } from "@react-three/drei"
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
        {/* <OrbitControls enabled={false} /> */}
        <OrthographicCamera makeDefault position={[0, 0, 1000]} far={10000} />
        {process.env.NODE_ENV === "development" ? <Stats /> : null}
        <Body />
      </Canvas>
    </div>
  )
}

function Background() {
  const selected = app.mainnav.selected.use()

  const getGradientColor = () => {
    switch (selected) {
      case 0:
        return "wallet"
      case 1:
        return "learn"
      case 2:
        return "ecosystem"
      case 3:
        return "explore"
    }
  }

  const classname = getGradientColor()

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
