import Text from "./components/Text"

import Navbar from "./components/Navbar"
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
      <Text text="Discords" position={[0, 350, 0]} fontSize={70} />
      <Terrarium position={[150, 0, 0]} scale={120} />
      <LuncAcademy position={[-150, 0, 0]} scale={120} />
    </>
  )
}

function Validators() {
  return (
    <>
      <Text text="Validators" position={[0, 350, 0]} fontSize={70} />
      <MoonRabbit position={[-300, 0, 0]} scale={120} />
      <Orion position={[0, 0, 0]} scale={120} />
      <Terrarium position={[300, 0, 0]} scale={120} />
    </>
  )
}

function Wallets() {
  return (
    <>
      <Text text="Wallets" position={[0, 350, 0]} fontSize={70} />
    </>
  )
}

function Finance() {
  return (
    <>
      <Text text="Finance" position={[0, 350, 0]} fontSize={70} />
    </>
  )
}

function Games() {
  return (
    <>
      <Text text="Games" position={[0, 350, 0]} fontSize={70} />
    </>
  )
}
