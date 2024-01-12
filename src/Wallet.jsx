import { Suspense, useEffect } from "react"
import { useWindowSize } from "@uidotdev/usehooks"
import { RoundedBox } from "@react-three/drei"
import { useLcdClient, useConnectedWallet } from "@terra-money/wallet-kit"

import Navbar from "./components/Navbar"
import Lunc from "./components/Lunc"
import Terra from "./components/Terra"
import Ibc from "./components/Ibc"
import Text from "./components/Text"
import { app } from "./global"

export default function Wallet() {
  return (
    <>
      <Navbar state={app.walletnav} names={["Home", "Assets", "Swap", "Stake", "Burn", "Govern", "Theme"]}>
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
  const connected = useConnectedWallet()
  const lcd = useLcdClient()

  useEffect(() => {
    if (connected) {
      lcd.bank
        .spendableBalances(connected?.addresses[getChainID(connected.network)])
        .then(([coins]) => app.balances.set(Object.values(coins._coins).sort((a, b) => Number(b.amount) - Number(a.amount))))
    }
  }, [connected])

  return (
    <>
      <RoundedBox args={[1300, 650, 40]} radius={20}>
        <meshPhysicalMaterial color={"black"} roughness={1} metalness={0.8} />
      </RoundedBox>
      <Coins />
    </>
  )
}

function Coins() {
  const balances = app.balances.use()
  return (
    <>
      {balances?.slice(0, 28).map((coin, index) => (
        <Coin key={index} index={index} Component={coin.denom === "uluna" ? Lunc : coin.denom.slice(0, 3) === "ibc" ? Ibc : Terra} coin={coin} />
      ))}
    </>
  )
}

import { Text as _Text } from "@react-three/drei"

function Coin({ Component, coin, index }) {
  const size = useWindowSize()

  const xspacing = 300
  const yspacing = 75
  const columns = 4

  const x = (index % columns) * xspacing - ((columns - 1) * xspacing) / 2
  const y = -Math.floor(index / columns) * yspacing + size.height / 2 - 250

  return (
    <group position={[x, y, 50]}>
      <Suspense>
        <Component position={[-50, 0, 0]} scale={25} flag={coin.denom.slice(1)} />
        <_Text position={[0, 0, 0]} fontSize={20} font="./GothamLight.otf" anchorX={"left"}>
          {Math.round((coin.amount / 1000000) * 100) / 100 + " " + (coin.denom.slice(0, 3) === "ibc" ? coin.denom.slice(0, 7) : coin.denom.slice(1, 7))}
        </_Text>
      </Suspense>
    </group>
  )
}

function Swap() {
  return (
    <>
      <Text position={[0, 375, 0]} fontSize={2800}>
        Swap
      </Text>
    </>
  )
}

function Stake() {
  return (
    <>
      <Text position={[0, 375, 0]} fontSize={2800}>
        Stake
      </Text>
      <RoundedBox args={[1300, 650, 40]} radius={20}>
        <meshStandardMaterial color={"black"} metalness={0.8} roughness={1} />
      </RoundedBox>
    </>
  )
}

function Burn() {
  return (
    <>
      <Text position={[0, 375, 0]} fontSize={2800}>
        Burn
      </Text>
    </>
  )
}

function Govern() {
  return (
    <>
      <Text position={[0, 375, 0]} fontSize={2800}>
        Govern
      </Text>
      <RoundedBox args={[1300, 650, 40]} radius={20}>
        <meshStandardMaterial color={"black"} metalness={0.8} roughness={1} />
      </RoundedBox>
    </>
  )
}

function Theme() {
  return (
    <>
      <Text position={[0, 375, 0]} fontSize={2800}>
        Theme
      </Text>
    </>
  )
}

const getChainID = (network) => {
  switch (network) {
    case "mainnet":
      return "phoenix-1"
    case "testnet":
      return "pisco-1"
    case "classic":
      return "columbus-5"
    case "localterra":
      return "localterra"
  }
}
