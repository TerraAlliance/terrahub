import { useEffect } from "react"
import { CapsuleGeometry } from "three"
import { Text, RoundedBox } from "@react-three/drei"
import { useLcdClient, useConnectedWallet } from "@terra-money/wallet-kit"

import { app, getChainID } from "../global"
import Button from "../components/Button"
import Terra from "../components/Terra"

export default function Govern() {
  const connected = useConnectedWallet()
  const lcd = useLcdClient()
  const proposals = app.proposals.use()

  useEffect(() => {
    if (connected) {
      lcd.gov.proposals(getChainID(connected.network), { "pagination.limit": 100, proposal_status: 2 }).then(([proposals]) => app.proposals.set(proposals))
    }
  }, [connected])

  console.log(proposals)

  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={60}>
        Govern
      </Text>
      <RoundedBox args={[1250, 600, 40]} radius={20}>
        <meshPhysicalMaterial color={"black"} roughness={1} metalness={0.8} />
      </RoundedBox>
      {proposals?.slice(0, 24).map((proposal, index) => (
        <Proposal key={index} proposal={proposal} index={index} />
      ))}
    </>
  )
}

const geometry = new CapsuleGeometry(30, 1000)

function Proposal({ proposal, index }) {
  const xspacing = 310
  const yspacing = 90
  const columns = 6

  const x = Math.floor(index / columns) * xspacing
  const y = -(index % columns) * yspacing + ((columns - 1) * yspacing) / 2

  return (
    <group key={index} position={[x, y, 50]}>
      <Terra position={[-500, 0, 50]} scale={30}  />
      <Button
        position={[0, 0, 0]}
        width={200}
        radius={30}
        geometry={geometry}
        opacity={1}
        color={"hsl(45, 0%, 12%)"}
        text={proposal.content.title}
        textProps={{ font: "./GothamLightEmojis.woff", fontSize: 22, anchorX: "left", "position-x": -450, clipRect: [0, -100, 1000, 100] }}
      />
    </group>
  )
}
