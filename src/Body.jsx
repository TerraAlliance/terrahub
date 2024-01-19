import { useWallet } from "@terra-money/wallet-kit"
import { useWindowSize } from "@uidotdev/usehooks"
import { RoundedBox, Text } from "@react-three/drei"

import Navbar from "./components/Navbar"
import Button from "./components/Button"
import Learn from "./Learn"
import Ecosystem from "./Ecosystem"
import { app } from "./global"

import Home from "./wallet/Home"
import Assets from "./wallet/Assets"
import Swap from "./wallet/Swap"
import Stake from "./wallet/Stake"
import Burn from "./wallet/Burn"
import Govern from "./wallet/Govern"
import Theme from "./wallet/Theme"

export default function Body() {
  return (
    <>
      <Lights />
      <Connect />
      <Settings />
      <Navbar state={app.mainnav} names={["Wallet", "Learn", "Ecosystem", "Explore"]}>
        <Navbar state={app.walletnav} names={["Home", "Assets", "Swap", "Stake", "Burn", "Govern", "Theme"]}>
          <Home />
          <Assets />
          <Swap />
          <Stake />
          <Burn />
          <Govern />
          <Theme />
        </Navbar>
        <Learn />
        <Ecosystem />
        <Explore />
      </Navbar>
    </>
  )
}

function Settings() {
  const size = useWindowSize()
  const position = [size.width / 2 - 150, -size.height / 2 + 40, 200]
  const color = ["hsl(45, 100%, 20%)", "hsl(180, 100%, 20%)", "hsl(300, 100%, 20%)", "hsl(200, 100%, 20%)"][app.mainnav.selected.use()]

  return <Button position={position} width={200} radius={20} color={color} text={"Settings"} opacity={1} textProps={{ font: "./GothamLight.otf", fontSize: 22 }} />
}

function Connect() {
  const size = useWindowSize()
  const position = [size.width / 2 - 150, size.height / 2 - 40, 200]
  const { status, connect, disconnect } = useWallet()
  const connected = status === "CONNECTED"
  const text = connected ? "Disconnect" : "Connect"
  const onClick = () => (connected ? disconnect() : connect())
  const color = ["hsl(45, 100%, 20%)", "hsl(180, 100%, 20%)", "hsl(300, 100%, 20%)", "hsl(200, 100%, 20%)"][app.mainnav.selected.use()]

  return <Button position={position} width={200} radius={20} color={color} text={text} onClick={onClick} opacity={1} textProps={{ font: "./GothamLight.otf", fontSize: 22 }} />
}

function Lights() {
  return (
    <>
      <pointLight intensity={5} position={[0, 5000, -10000]} decay={0} />
      <directionalLight position={[0, -0.5, 1]} intensity={20} />
    </>
  )
}

function Explore() {
  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={70}>
        Explore
      </Text>
      <RoundedBox args={[1250, 600, 40]} radius={20}>
        <meshPhysicalMaterial color={"black"} roughness={1} metalness={0.8} />
      </RoundedBox>
    </>
  )
}
