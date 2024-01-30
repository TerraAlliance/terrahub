import { useEffect } from "react"
import { RoundedBox } from "@react-three/drei"
import { useLcdClient, useConnectedWallet } from "@terra-money/wallet-kit"

import Text from "../components/Text"
import Grid from "../components/Grid"
import { Lunc, Ibc, Terra } from "../components/Coins"
import Button from "../components/Button"
import { app, getChainID } from "../global"

const currencies = ["usd", "twd", "thb", "sgd", "sek", "sdr", "php", "nok", "myr", "mnt", "krw", "jpy", "inr", "idr", "hkd", "gbp", "eur", "dkk", "cny", "chf", "cad", "aud"]

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
      <RoundedBox position={[-350, 0, 0]} args={[675, 650, 40]} radius={20}>
        <meshPhysicalMaterial color={"hsl(0, 0%, 10%)"} roughness={1} metalness={0.8} />
      </RoundedBox>
      <Grid position={[350, 0, 0]} width={675} height={650} xspacing={700} columns={1} speed={40} visibleItems={10}>
        {({ index }) => {
          const Component = balances?.[index]?.denom === "uluna" ? Lunc : balances?.[index]?.denom.slice(0, 3) === "ibc" ? Ibc : Terra
          const coin = balances?.[index]
          return (
            <>
              <Button width={650} radius={25} opacity={1} color={"hsl(0, 0%, 22%)"} hoveredColor={"hsl(315, 100%, 30%)"} />
              <Component position={[-300, 0, 50]} scale={25} flag={currencies.indexOf(coin?.denom.slice(1))} />
              <Text
                text={Math.round((coin?.amount / 1000000) * 100) / 100 + " " + (coin?.denom.slice(0, 3) === "ibc" ? coin?.denom.slice(0, 10) + "..." : coin?.denom.slice(1, 7))}
                position={[-250, 0, 30]}
                fontSize={22}
                anchorX="left"
              />
            </>
          )
        }}
      </Grid>
    </>
  )
}
