import { useState } from "react"
import { Text } from "@react-three/drei"

import { FireSphere, Lunc } from "../components/Coins"
import Terra from "../components/Terra"

export default function Burn() {
  const [activeFlag, setActiveFlag] = useState(0)

  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={60}>
        Burn
      </Text>
      <Lunc position={[-200, 0, 0]} scale={130} />
      <Terra position={[200, 0, 0]} scale={130} flag={activeFlag} setFlag={setActiveFlag} />
      <FireSphere position={[-200, 0, 0]} scale={131} />
      <FireSphere position={[200, 0, 0]} scale={131} />
    </>
  )
}
