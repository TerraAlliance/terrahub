import { useEffect } from "react"
import { useObservable } from "@legendapp/state/react"
import { useLcdClient, useConnectedWallet } from "@terra-money/wallet-kit"

import { Text } from "../components/Text"
import { app, getChainID } from "../global"
import Button from "../components/Button"
import { Terra } from "../components/Coins"
import Grid from "../components/Grid"
import VotingBar from "../components/VotingBar"

app.status.set("voting")

export default function Govern() {
  const connected = useConnectedWallet()
  const lcd = useLcdClient()
  const proposals = app.proposals.get()
  const status = app.status.get()

  console.log(proposals?.[status])

  useEffect(() => {
    lcd.gov.proposals(getChainID(connected?.network) || "phoenix-1", { "pagination.limit": 999, proposal_status: 2 }).then(([proposals]) => app.proposals.voting.set(proposals))
    lcd.gov.proposals(getChainID(connected?.network) || "phoenix-1", { "pagination.limit": 999, proposal_status: 1 }).then(([proposals]) => app.proposals.deposit.set(proposals))
    lcd.gov
      .proposals(getChainID(connected?.network) || "phoenix-1", { "pagination.limit": 999, proposal_status: 3, "pagination.reverse": true })
      .then(([proposals]) => app.proposals.passed.set(proposals))
    lcd.gov
      .proposals(getChainID(connected?.network) || "phoenix-1", { "pagination.limit": 999, proposal_status: 4, "pagination.reverse": true })
      .then(([proposals]) => app.proposals.rejected.set(proposals))
    lcd.gov.parameters(getChainID(connected?.network) || "phoenix-1").then((parameters) => app.parameters.set({ quorum: parameters.tally_params.quorum.toString() }))
  }, [connected])

  return (
    <>
      <group position={[-225, 310, 200]}>
        <Button width={100} radius={15} color={"hsl(0, 0%, 15%)"} hoveredColor={"hsl(315, 100%, 30%)"} onClick={() => app.status.set("voting")} />
        <Text position={[0, 0, 50]} text={"voting"} fontSize={22} />
      </group>
      <group position={[-75, 310, 200]}>
        <Button width={100} radius={15} color={"hsl(0, 0%, 15%)"} hoveredColor={"hsl(315, 100%, 30%)"} onClick={() => app.status.set("deposit")} />
        <Text position={[0, 0, 50]} text={"deposit"} fontSize={22} />
      </group>
      <group position={[75, 310, 200]}>
        <Button width={100} radius={15} color={"hsl(0, 0%, 15%)"} hoveredColor={"hsl(315, 100%, 30%)"} onClick={() => app.status.set("passed")} />
        <Text position={[0, 0, 50]} text={"passed"} fontSize={22} />
      </group>
      <group position={[225, 310, 200]}>
        <Button width={100} radius={15} color={"hsl(0, 0%, 15%)"} hoveredColor={"hsl(315, 100%, 30%)"} onClick={() => app.status.set("rejected")} />
        <Text position={[0, 0, 50]} text={"rejected"} fontSize={22} />
      </group>
      {status === "voting" && (
        <Grid position={[0, 0, 0]} height={650} width={1200} xspacing={700} columns={1} speed={40} visibleItems={10} items={proposals?.voting?.length}>
          {({ index, width }) => <GridItems index={index} width={width} />}
        </Grid>
      )}
      {status === "deposit" && (
        <Grid position={[0, 0, 0]} height={650} width={1200} xspacing={700} columns={1} speed={40} visibleItems={10} items={proposals?.deposit?.length}>
          {({ index, width }) => <GridItems index={index} width={width} />}
        </Grid>
      )}
      {status === "passed" && (
        <Grid position={[0, 0, 0]} height={650} width={1200} xspacing={700} columns={1} speed={40} visibleItems={10} items={proposals?.passed?.length}>
          {({ index, width }) => <GridItems index={index} width={width} />}
        </Grid>
      )}
      {status === "rejected" && (
        <Grid position={[0, 0, 0]} height={650} width={1200} xspacing={700} columns={1} speed={40} visibleItems={10} items={proposals?.rejected?.length}>
          {({ index, width }) => <GridItems index={index} width={width} />}
        </Grid>
      )}
    </>
  )
}

function GridItems({ index, width }) {
  const proposals = app.proposals.get()
  const parameters = app.parameters.get()
  const status = app.status.get()

  return (
    <>
      <TerraButton width={width - 100} radius={25} color={"hsl(0, 0%, 22%)"} hoveredColor={"hsl(315, 100%, 30%)"} />
      <Text text={proposals?.[status][index]?.content?.title} position={[-width / 2 + 100, 0, 25]} anchorX={"left"} fontSize={22} clipRect={[0, -100, 1000, 100]} />
      {status === "passed" && <Text text={"passed"} position={[width / 2 - 100, 0, 25]} color="green" fontSize={22} />}
      {status === "rejected" && <Text text={"rejected"} position={[width / 2 - 100, 0, 25]} color="red" fontSize={22} />}
      {status !== "deposit" && (
        <VotingBar position={[30, -23, 25]} proposal={proposals?.[status][index]} length={1060} radius={1} quorum={parameters?.quorum} status={status} width={width} />
      )}
    </>
  )
}

function TerraButton({ width, radius, color, hoveredColor, onClick }) {
  const hovered = useObservable(false)

  return (
    <>
      <Terra position={[-width / 2, 0, 50]} scale={25} hovered={hovered.get()} />
      <Button width={width} radius={radius} color={color} hoveredColor={hoveredColor} hovered={hovered} onClick={onClick} />
    </>
  )
}
