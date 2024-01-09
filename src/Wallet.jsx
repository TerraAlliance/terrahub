import Navbar from "./components/Navbar"
import Lunc from "./components/Lunc"
import Text from "./components/Text"
import { app } from "./global"

export default function Wallet() {
  return (
    <>
      <Navbar state={app.walletnav}>
        <Home />
        <Assets />
        <Swap />
        <Stake />
        <Burn />
        <Govern />
        <Theme />
      </Navbar>
    </>
  )
}

function Home() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Welcome to Terra Classic
      </Text>
      <Lunc position={[0, 0, 0]} scale={130} />
    </>
  )
}

function Assets() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Assets
      </Text>
    </>
  )
}

function Swap() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Swap
      </Text>
    </>
  )
}

function Stake() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Stake
      </Text>
    </>
  )
}

function Burn() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Burn
      </Text>
    </>
  )
}

function Govern() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Govern
      </Text>
    </>
  )
}

function Theme() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Theme
      </Text>
    </>
  )
}
