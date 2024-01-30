import Text from "./components/Text"

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
      <Text text="Stablecoins" position={[0, 350, 0]} fontSize={70} />
      <Dai position={[0, 0, 0]} scale={120} />
      <Usdc position={[-300, 0, 0]} scale={120} />
      <Usdt position={[300, 0, 0]} scale={120} />
    </>
  )
}

function MarketModule() {
  return (
    <>
      <Text text="Market Module" position={[0, 350, 0]} fontSize={70} />
      <MarketPools />
      <Slider position={[200, -175, 0]} scale={[200, 10, 5]} handleChange={null} text min={0} max={100} step={1} fontSize={30} />
      <Slider position={[-200, -175, 0]} scale={[200, 10, 5]} handleChange={null} text min={0} max={100} step={1} fontSize={30} />
    </>
  )
}

function Validators() {
  return (
    <>
      <Text text="Validators" position={[0, 350, 0]} fontSize={70} />
    </>
  )
}

function Staking() {
  return (
    <>
      <Text text="Staking" position={[0, 350, 0]} fontSize={70} />
    </>
  )
}

function Rewards() {
  return (
    <>
      <Text text="Rewards" position={[0, 350, 0]} fontSize={70} />
    </>
  )
}

function Governance() {
  return (
    <>
      <Text text="Governance" position={[0, 350, 0]} fontSize={70} />
    </>
  )
}
