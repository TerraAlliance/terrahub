import Navbar from "./components/Navbar"
import SwapMachine from "./components/SwapMachine"
import Text from "./components/Text"
import Dai from "./components/Dai"
import Usdc from "./components/Usdc"
import Usdt from "./components/Usdt"
import { app } from "./global"

export default function Learn() {
  return (
    <>
      <Navbar state={app.learnnav}>
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
