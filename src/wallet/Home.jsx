import { Text } from "@react-three/drei"

import { Lunc } from "../components/Coins"

export default function Home() {
  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={70}>
        Welcome to Terra Classic
      </Text>
      <Lunc position={[0, 0, 0]} scale={130} />
    </>
  )
}
