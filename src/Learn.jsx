import { Text } from "@react-three/drei"

import Navbar from "./components/Navbar"
import MarketPools from "./components/MarketPools"
import { Dai, Usdt, Usdc } from "./components/Coins"
import Slider from "./components/Slider"

import { app } from "./global"

export default function Learn() {
  return (
    <>
      <Navbar state={app.learnnav} names={["Stablecoins", "Market Module", "Validators", "Staking", "Rewards", "Governance"]}>
        <Stablecoins />
        <MarketModule />
        <Validators />
        <Staking />
        <Rewards />
        <Governance />
      </Navbar>
    </>
  )
}

function Stablecoins() {
  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={70}>
        Stablecoins
      </Text>
      <Dai position={[0, 0, 0]} scale={120} />
      <Usdc position={[-300, 0, 0]} scale={120} />
      <Usdt position={[300, 0, 0]} scale={120} />
    </>
  )
}

function MarketModule() {
  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={70}>
        Market Module
      </Text>
      <MarketPools />
      <Slider position={[200, -175, 0]} scale={[200, 10, 5]} handleChange={null} text min={0} max={100} step={1} fontSize={30} />
      <Slider position={[-200, -175, 0]} scale={[200, 10, 5]} handleChange={null} text min={0} max={100} step={1} fontSize={30} />
    </>
  )
}

function Validators() {
  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={70}>
        Validators
      </Text>
    </>
  )
}

function Staking() {
  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={70}>
        Staking
      </Text>
    </>
  )
}

function Rewards() {
  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={70}>
        Rewards
      </Text>
    </>
  )
}

function Governance() {
  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={70}>
        Governance
      </Text>
    </>
  )
}
