import { Text } from "@react-three/drei"
import { Suspense } from "react"

import { Lunc } from "../components/Coins"

export default function Home() {
  return (
    <>
      <Suspense>
        <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={70}>
          Welcome to Terra Classic
        </Text>
      </Suspense>
      <Suspense>
        <Lunc position={[0, 0, 0]} scale={130} />
      </Suspense>
    </>
  )
}
