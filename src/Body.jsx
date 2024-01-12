import { useWallet } from "@terra-money/wallet-kit"
import { useWindowSize } from "@uidotdev/usehooks"

import Text from "./components/Text"
import Navbar from "./components/Navbar"
import Button from "./components/Button"
import Wallet from "./Wallet"
import Learn from "./Learn"
import Ecosystem from "./Ecosystem"
import { app } from "./global"

export default function Body() {
  return (
    <>
      <Lights />
      <Connect />
      <Settings />
      <Navbar state={app.mainnav} names={["Wallet", "Learn", "Ecosystem", "Explore"]}>
        <Wallet />
        <Learn />
        <Ecosystem />
        <Explore />
      </Navbar>
    </>
  )
}

function Settings() {
  const size = useWindowSize()

  return (
    <>
      <Button position={[size.width / 2 - 150, -size.height / 2 + 40, 200]} radius={20} width={200} text={"Settings"} />
    </>
  )
}

function Connect() {
  const { status, connect, disconnect } = useWallet()
  const connected = status === "CONNECTED"
  const onClick = () => (connected ? disconnect() : connect())
  const text = connected ? "Disconnect" : "Connect"
  const size = useWindowSize()

  return (
    <>
      <Button position={[size.width / 2 - 150, size.height / 2 - 40, 200]} radius={20} width={200} text={text} onClick={onClick} />
    </>
  )
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
      <Text position={[0, 350, 0]} fontSize={2800}>
        Explore
      </Text>
    </>
  )
}
