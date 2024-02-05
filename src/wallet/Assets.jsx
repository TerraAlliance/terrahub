import { useEffect } from "react"
import { useObservable } from "@legendapp/state/react"
import { useLcdClient, useConnectedWallet } from "@terra-money/wallet-kit"

import Button from "../components/Button"
import { Text } from "../components/Text"
import Grid from "../components/Grid"
import { Lunc, Ibc, Terra } from "../components/Coins"
import { app, getChainID } from "../global"

const currencies = ["usd", "twd", "thb", "sgd", "sek", "sdr", "php", "nok", "myr", "mnt", "krw", "jpy", "inr", "idr", "hkd", "gbp", "eur", "dkk", "cny", "chf", "cad", "aud"]

export default function Assets() {
  const connected = useConnectedWallet()
  const address = connected?.addresses[getChainID(connected.network)]
  // const address = "terra120ppepaj2lh5vreadx42wnjjznh55vvktwj679"
  const lcd = useLcdClient()
  const balances = app.balances.get()

  useEffect(() => {
    if (connected) {
      lcd.bank.spendableBalances(address).then(([coins]) => app.balances.set(Object.values(coins._coins).sort((a, b) => Number(b.amount) - Number(a.amount))))
    }
  }, [connected])

  return (
    <>
      <Button position={[-350, 0, 0]} width={650} height={650} radius={10} color={"hsl(0, 0%, 16%)"} />
      <Grid position={[350, 0, 0]} width={650} height={650} xspacing={700} columns={1} speed={40} visibleItems={11} items={balances?.length}>
        {({ index }) => {
          const Component = balances?.[index]?.denom === "uluna" ? Lunc : balances?.[index]?.denom.slice(0, 3) === "ibc" ? Ibc : Terra
          const coin = balances?.[index]
          return (
            <>
              <CoinButton width={600} radius={25} opacity={1} color={"hsl(0, 0%, 22%)"} hoveredColor={"hsl(315, 100%, 30%)"} Component={Component} coin={coin} />
              <Text
                text={Math.round((coin?.amount / 1000000) * 100) / 100 + " " + (coin?.denom.slice(0, 3) === "ibc" ? coin?.denom.slice(0, 10) + "..." : coin?.denom.slice(1, 7))}
                position={[-250, 0, 30]}
                fontSize={22}
                anchorX="left"
              />
              <Text text={"... $"} position={[300, 0, 30]} fontSize={22} anchorX="right" />
            </>
          )
        }}
      </Grid>
    </>
  )
}

function CoinButton({ width, radius, color, hoveredColor, onClick, Component, coin }) {
  const hovered = useObservable(false)

  return (
    <>
      <Component position={[-300, 0, 50]} scale={25} flag={currencies.indexOf(coin?.denom.slice(1))} hovered={hovered.get()} />
      <Button width={width} radius={radius} opacity={1} color={color} hoveredColor={hoveredColor} hovered={hovered} onClick={onClick} />
    </>
  )
}
