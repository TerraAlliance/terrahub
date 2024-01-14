import Navbar from "./components/Navbar"
import SwapMachine from "./components/SwapMachine"
import Text from "./components/Text"
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
      <Text position={[0, 350, 0]} fontSize={2800}>
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
      <Text position={[0, 350, 0]} fontSize={2800}>
        Market Module
      </Text>
      <SwapMachine />
      <Slider position={[200, -175, 0]} scale={[200, 10, 5]} handleChange={null} text min={0} max={100} step={1} fontSize={30} />
      <Slider position={[-200, -175, 0]} scale={[200, 10, 5]} handleChange={null} text min={0} max={100} step={1} fontSize={30} />
    </>
  )
}

function Validators() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Validators
      </Text>
    </>
  )
}

function Staking() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Staking
      </Text>
    </>
  )
}

function Rewards() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Rewards
      </Text>
    </>
  )
}

function Governance() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Governance
      </Text>
    </>
  )
}
