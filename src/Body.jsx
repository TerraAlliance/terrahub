import Text from "./components/Text"
import Navbar from "./components/Navbar"
import Button from "./components/Button"
import Wallet from "./Wallet"
import Learn from "./Learn"
import Ecosystem from "./Ecosystem"
import { app } from "./global"
import { useWallet } from "@terra-money/wallet-kit"

export default function Body() {
  return (
    <>
      <Lights />
      <Connect />
      <Button position={[790, -440, 200]} radius={20} width={200} text={"Settings"} />
      <Navbar state={app.mainnav} names={["Wallet", "Learn", "Ecosystem", "Explore"]}>
        <Wallet />
        <Learn />
        <Ecosystem />
        <Explore />
      </Navbar>
    </>
  )
}

function Connect() {
  const { status, connect, disconnect } = useWallet()
  const connected = status === "CONNECTED"

  return (
    <>
      <Button position={[790, 440, 200]} radius={20} width={200} text={connected ? "Disconnect" : "Connect"} onClick={() => (connected ? disconnect() : connect())} />
    </>
  )
}

function Lights() {
  return (
    <>
      <pointLight intensity={5} position={[0, 5000, -10000]} decay={0} />
      {/* <directionalLight position={[0, 5, -10]} intensity={5} /> */}
      <directionalLight position={[0, -0.5, 1]} intensity={20} />
      {/* <pointLight intensity={20} position={[0, 0, 1000]} decay={0} /> */}
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
