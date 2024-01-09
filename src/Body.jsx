import { Html } from "@react-three/drei"

import Navbar from "./components/Navbar"
import Connect from "./components/Connect"
import Wallet from "./Wallet"
import Learn from "./Learn"
import Ecosystem from "./Ecosystem"
import { app } from "./global"

export default function Body() {
  return (
    <>
      <Lights />
      <Navbar state={app.mainnav} names={["Wallet", "Learn", "Ecosystem", "Explore"]}>
        <Wallet />
        <Learn />
        <Ecosystem />
        <Explore />
      </Navbar>
      <Connect />
    </>
  )
}

function Lights() {
  return (
    <>
      <pointLight color={"white"} intensity={5} position={[0, 3000, -10000]} distance={0} decay={0} />
      <pointLight color={"white"} intensity={20} position={[0, 0, 1000]} distance={0} decay={0} />
    </>
  )
}

function Explore() {
  return (
    <>
      {" "}
      <Html position={[0, 350, 0]} transform style={{ userSelect: "none" }} pointerEvents="none">
        <p style={{ fontFamily: "Gotham Light", fontSize: 2800, color: "white", whiteSpace: "nowrap" }}>Explore</p>
      </Html>
    </>
  )
}
