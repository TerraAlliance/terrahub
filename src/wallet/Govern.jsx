import { useEffect } from "react"
import { useLcdClient, useConnectedWallet } from "@terra-money/wallet-kit"

import Text from "../components/Text"
import { app, getChainID } from "../global"
import Button from "../components/Button"
import { Terra } from "../components/Coins"
import Grid from "../components/Grid"

export default function Govern() {
  const connected = useConnectedWallet()
  const lcd = useLcdClient()
  const proposals = app.proposals.use()

  useEffect(() => {
    if (connected) {
      lcd.gov.proposals(getChainID(connected.network), { "pagination.limit": 100, proposal_status: 2 }).then(([proposals]) => app.proposals.set(proposals))
    }
  }, [connected])

  return (
    <>
      <Grid position={[0, 0, 0]} height={650} width={1250} xspacing={700} columns={1} speed={40} visibleItems={10}>
        {({ width, index }) => {
          return (
            <>
              <Button width={width - 50} radius={25} opacity={1} color={"hsl(0, 0%, 22%)"} hoveredColor={"hsl(315, 100%, 30%)"} />
              <Terra position={[-575, 0, 50]} scale={25} />
              <Text text={proposals?.[index]?.content.title} position={[-525, 0, 30]} anchorX={"left"} fontSize={22} clipRect={[0, -100, 1000, 100]} />
            </>
          )
        }}
      </Grid>
    </>
  )
}
