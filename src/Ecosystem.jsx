import Navbar from "./components/Navbar"
import Text from "./components/Text"
import { MoonRabbit, Orion, LuncAcademy, Terrarium } from "./components/Validators"
import { app } from "./global"

export default function Ecosystem() {
  return (
    <>
      <Navbar state={app.ecosystemnav} names={["Discords", "Validators", "Wallets", "Finance", "Games"]}>
        <Discords />
        <Validators />
        <Wallets />
        <Finance />
        <Games />
      </Navbar>
    </>
  )
}

function Discords() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800} color='white'>
        Discords
      </Text>
      <Terrarium position={[150, 0, 0]} scale={120} />
      <LuncAcademy position={[-150, 0, 0]} scale={120} />
    </>
  )
}

function Validators() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Validators
      </Text>
      <MoonRabbit position={[-300, 0, 0]} scale={120} />
      <Orion position={[0, 0, 0]} scale={120} />
      <Terrarium position={[300, 0, 0]} scale={120} />
    </>
  )
}

function Wallets() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Wallets
      </Text>
    </>
  )
}

function Finance() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Finance
      </Text>
    </>
  )
}

function Games() {
  return (
    <>
      <Text position={[0, 350, 0]} fontSize={2800}>
        Games
      </Text>
    </>
  )
}
