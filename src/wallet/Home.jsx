import { Suspense } from "react"

import { Text } from "../components/Text"
import { Lunc } from "../components/Coins"

export default function Home() {
  return (
    <>
      <Suspense>
        <Text text="Welcome to Terra Classic" position={[0, 325, 0]} fontSize={85} />
      </Suspense>
      <Suspense>
        <Lunc position={[0, 0, 0]} scale={130} />
      </Suspense>
    </>
  )
}
