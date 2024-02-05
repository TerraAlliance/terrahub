import { useWallet } from "@terra-money/wallet-kit"
import { useWindowSize } from "@uidotdev/usehooks"

import Navbar from "./components/Navbar"
import Button from "./components/Button"
import { Text } from "./components/Text"
import Learn from "./Learn"
import Ecosystem from "./Ecosystem"
import { app } from "./global"

import Home from "./wallet/Home"
import Assets from "./wallet/Assets"
import Swap from "./wallet/Swap"
import Stake from "./wallet/Stake"
import Burn from "./wallet/Burn"
import Govern from "./wallet/Govern"

export default function Body() {
  return (
    <>
      <Connect />
      <Settings />
      <Navbar state={app.mainnav} names={["Wallet", "Learn", "Ecosystem", "Explore"]}>
        <Navbar state={app.walletnav} names={["Home", "Assets", "Swap", "Stake", "Burn", "Govern"]}>
          <Home />
          <Assets />
          <Swap />
          <Stake />
          <Burn />
          <Govern />
        </Navbar>
        <Learn />
        <Ecosystem />
        <Explore />
      </Navbar>
      <Lights />
    </>
  )
}

function Connect() {
  const size = useWindowSize()
  const { status, connect, disconnect } = useWallet()
  const connected = status === "CONNECTED"
  const text = connected ? "Disconnect" : "Connect"
  const onClick = () => (connected ? disconnect() : connect())
  const color = ["hsl(45, 100%, 30%)", "hsl(180, 100%, 30%)", "hsl(300, 100%, 30%)", "hsl(200, 100%, 30%)"][app.mainnav.selected.get()]

  return (
    <>
      <Text text={text} position={[size.width / 2 - 120, size.height / 2 - 40, 220]} fontSize={22} />
      <Button position={[size.width / 2 - 120, size.height / 2 - 40, 200]} width={160} radius={20} color={color} onClick={onClick} opacity={1} />
    </>
  )
}

function Settings() {
  const size = useWindowSize()
  const color = ["hsl(45, 100%, 30%)", "hsl(180, 100%, 30%)", "hsl(300, 100%, 30%)", "hsl(200, 100%, 30%)"][app.mainnav.selected.get()]

  return (
    <>
      <Text text="Settings" position={[size.width / 2 - 120, -size.height / 2 + 40, 220]} fontSize={22} />
      <Button position={[size.width / 2 - 120, -size.height / 2 + 40, 200]} width={160} radius={20} color={color} />
    </>
  )
}

function Lights() {
  return (
    <>
      <pointLight intensity={5} position={[0, 5000, -10000]} decay={0} />
      <directionalLight position={[0, -0.5, 1]} intensity={8} />
    </>
  )
}

function Explore() {
  return (
    <>
      <Text text="Explore" position={[0, 365, 0]} fontSize={70} />
      <Button width={1200} height={600} radius={10} color={"hsl(0, 0%, 16%)"} />
    </>
  )
}
