import { Suspense, useEffect } from "react"
import { RoundedBox, Text } from "@react-three/drei"
import { useWindowSize } from "@uidotdev/usehooks"
import { useLcdClient, useConnectedWallet } from "@terra-money/wallet-kit"
import { CapsuleGeometry } from "three"

import Terra from "../components/Terra"
import { Lunc, Ibc } from "../components/Coins"
import Button from "../components/Button"
import { app, getChainID } from "../global"

export default function Assets() {
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
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={60}>
        Assets
      </Text>
      <RoundedBox args={[1250, 600, 40]} radius={20}>
        <meshPhysicalMaterial color={"black"} roughness={1} metalness={0.8} />
      </RoundedBox>
      {balances?.slice(0, 24).map((coin, index) => (
        <Coin key={index} index={index} Component={coin.denom === "uluna" ? Lunc : coin.denom.slice(0, 3) === "ibc" ? Ibc : Terra} coin={coin} />
      ))}
    </>
  )
}

const currencies = ["usd", "twd", "thb", "sgd", "sek", "sdr", "php", "nok", "myr", "mnt", "krw", "jpy", "inr", "idr", "hkd", "gbp", "eur", "dkk", "cny", "chf", "cad", "aud"]
const geometry = new CapsuleGeometry(30, 220)

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
        <Component position={[-108, 0, 50]} scale={30} flag={currencies.indexOf(coin.denom.slice(1))} />
      </Suspense>
      <Button
        position={[0, 0, 0]}
        width={200}
        radius={30}
        geometry={geometry}
        opacity={1}
        color={"rgb(30,30,30)"}
        text={Math.round((coin.amount / 1000000) * 100) / 100 + " " + (coin.denom.slice(0, 3) === "ibc" ? coin.denom.slice(0, 7) : coin.denom.slice(1, 7))}
        textProps={{ font: "./GothamLight.otf", fontSize: 22, anchorX: "left", "position-x": -70 }}
      />
    </group>
  )
}
