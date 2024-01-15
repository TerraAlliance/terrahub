import { Suspense, useEffect } from "react"
import { Text, RoundedBox } from "@react-three/drei"
import { useWindowSize } from "@uidotdev/usehooks"
import { useLcdClient, useConnectedWallet } from "@terra-money/wallet-kit"

import Navbar from "./components/Navbar"
import Satellite from "./components/Satellite"
import Terra from "./components/Terra"
import { Lunc, Ibc } from "./components/Coins"
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

// Home

function Home() {
  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={60} color="white">
        <meshPhysicalMaterial color={"red"} roughness={1} metalness={0.8} />
        Welcome to Terra Classic
      </Text>
      <Lunc position={[0, 0, 0]} scale={130} />
    </>
  )
}

// Assets

function Assets() {
  const connected = useConnectedWallet()
  const address = connected?.addresses[getChainID(connected.network)]
  // const address = "terra120ppepaj2lh5vreadx42wnjjznh55vvktwj679"
  const lcd = useLcdClient()
  const balances = app.balances.use()

  useEffect(() => {
    if (connected) {
      lcd.bank.spendableBalances(address).then(([coins]) => app.balances.set(Object.values(coins._coins).sort((a, b) => Number(b.amount) - Number(a.amount))))
    }
  }, [connected])

  return (
    <>
      <RoundedBox args={[1300, 650, 40]} radius={20}>
        <meshPhysicalMaterial color={"black"} roughness={1} metalness={0.8} />
      </RoundedBox>
      {balances?.slice(0, 24).map((coin, index) => (
        <Coin key={index} index={index} Component={coin.denom === "uluna" ? Lunc : coin.denom.slice(0, 3) === "ibc" ? Ibc : Terra} coin={coin} />
      ))}
    </>
  )
}

function Coin({ Component, coin, index }) {
  const size = useWindowSize()

  const xspacing = 300
  const yspacing = 90
  const columns = 4
  const x = (index % columns) * xspacing - ((columns - 1) * xspacing) / 2
  const y = -Math.floor(index / columns) * yspacing + size.height / 2 - 250

  return (
    <group position={[x, y, 50]}>
      <Suspense>
        <Component position={[-50, 0, 0]} scale={25} flag={coin.denom.slice(1)} />
        <Text position={[0, 0, 0]} fontSize={20} font="./GothamLight.otf" anchorX={"left"}>
          {Math.round((coin.amount / 1000000) * 100) / 100 + " " + (coin.denom.slice(0, 3) === "ibc" ? coin.denom.slice(0, 7) : coin.denom.slice(1, 7))}
        </Text>
      </Suspense>
    </group>
  )
}

// Swap

function Swap() {
  return (
    <>
      <Text position={[0, 375, 0]} font="./GothamLight.otf" fontSize={60}>
        Swap
      </Text>
    </>
  )
}

// Stake

function Stake() {
  const connected = useConnectedWallet()
  const validators = app.validators.use()
  const lcd = useLcdClient()

  useEffect(() => {
    if (connected) {
      lcd.staking.validators(getChainID(connected.network), { "pagination.limit": 999 }).then(([validators]) => {
        app.validators.set(
          validators
            .filter((obj) => obj.status !== "BOND_STATUS_UNBONDED")
            .map((a) => {
              return {
                name: a.description.moniker,
              }
            })
        )
      })
    }
  }, [connected])

  console.log(validators?.slice(0, 28)[20].name)
  const size = useWindowSize()
  const xspacing = 300
  const yspacing = 90
  const columns = 4

  return (
    <>
      <Text position={[0, 375, 0]} font="./GothamLight.otf" fontSize={60}>
        Stake
      </Text>
      <RoundedBox args={[1300, 650, 40]} radius={20}>
        <meshStandardMaterial color={"black"} metalness={0.8} roughness={1} />
      </RoundedBox>
      {validators?.slice(0, 24).map((validator, index) => (
        <group key={index} position={[(index % columns) * xspacing - ((columns - 1) * xspacing) / 2, -Math.floor(index / columns) * yspacing + size.height / 2 - 250, 50]}>
          <Text position={[-80, 0, 0]} fontSize={18} font={"./GothamLightEmojis.woff"} anchorX={"left"} clipRect={[0, -100, 190, 100]}>
            {validator.name.slice(0, 40)}
          </Text>
          <Satellite position={[-120, 0, 0]} scale={1.5} onClick={() => null} />
        </group>
      ))}
    </>
  )
}

// Burn

function Burn() {
  return (
    <>
      <Text position={[0, 375, 0]} font="./GothamLight.otf" fontSize={60}>
        Burn
      </Text>
    </>
  )
}

// Govern

function Govern() {
  return (
    <>
      <Text position={[0, 375, 0]} font="./GothamLight.otf" fontSize={60}>
        Govern
      </Text>
      <RoundedBox args={[1300, 650, 40]} radius={20}>
        <meshStandardMaterial color={"black"} metalness={0.8} roughness={1} />
      </RoundedBox>
    </>
  )
}

// Theme

function Theme() {
  return (
    <>
      <Text position={[0, 375, 0]} font="./GothamLight.otf" fontSize={60}>
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
