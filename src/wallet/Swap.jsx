import { Text } from "@react-three/drei"

import SwapMachine from "../components/SwapMachine"

export default function Swap() {
  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={60}>
        Swap
      </Text>
      <SwapMachine />
    </>
  )
}
