import { useWallet } from "@terra-money/wallet-kit"
import { useWindowSize } from "@uidotdev/usehooks"
import { MeshStandardMaterial, Mesh, BoxGeometry, CylinderGeometry, SphereGeometry } from "three"
import { RoundedBox, Merged, useGLTF } from "@react-three/drei"
import Text from "./components/Text"

import Navbar from "./components/Navbar"
import Button from "./components/Button"
import Learn from "./Learn"
import Ecosystem from "./Ecosystem"
import { app, context } from "./global"

import Home from "./wallet/Home"
import Assets from "./wallet/Assets"
import Swap from "./wallet/Swap"
import Stake from "./wallet/Stake"
import Burn from "./wallet/Burn"
import Govern from "./wallet/Govern"

const box = new BoxGeometry(1, 1, 1)
const cylinder = new CylinderGeometry(1, 1, 1, 8)
const cylinder16 = new CylinderGeometry(1, 1, 1, 16)
const sphere = new SphereGeometry(1, 32, 32)
const halfsphere = new SphereGeometry(1, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2)

const rough = new MeshStandardMaterial({ roughness: 1, metalness: 1, side: 2 })
const metal = new MeshStandardMaterial({ roughness: 0.5, metalness: 1 })
const transparent = new MeshStandardMaterial({ roughness: 0.5, metalness: 1, transparent: true, opacity: 0.5 })
const verytransparent = new MeshStandardMaterial({ roughness: 0.5, metalness: 1, transparent: true, opacity: 0.3 })

export default function Body() {
  const { nodes } = useGLTF("/terra.glb")

  return (
    <>
      <Lights />
      <Merged
        meshes={{
          Terra_0: new Mesh(nodes.Mesh_0.geometry, metal),
          Terra_1: new Mesh(nodes.Mesh_1.geometry, metal),
          Terra_2: new Mesh(nodes.Mesh_2.geometry, metal),
          Terra_3: new Mesh(nodes.Mesh_3.geometry, metal),
          RoughBox: new Mesh(box, rough),
          MetalBox: new Mesh(box, metal),
          MetalSphere: new Mesh(sphere, metal),
          RoughHalfSphere: new Mesh(halfsphere, rough),
          RoughCylinder: new Mesh(cylinder, rough),
          MetalCylinder: new Mesh(cylinder16, metal),
          TransparentSphere: new Mesh(sphere, transparent),
          VeryTransparentSphere: new Mesh(sphere, verytransparent),
        }}
      >
        {(models) => (
          <context.Provider value={models}>
            <models.Terra_0 scale={0} />
            <models.Terra_1 scale={0} />
            <models.Terra_2 scale={0} />
            <models.Terra_3 scale={0} />
            <models.MetalCylinder scale={0} />
            <models.MetalSphere scale={0} />
            <models.TransparentSphere scale={0} />
            <models.MetalBox scale={0} />
            <models.RoughBox scale={0} />
            <Connect />
            <Settings />
            <Navbar state={app.mainnav} names={["Wallet", "Learn", "Ecosystem", "Explore"]}>
              <Navbar state={app.walletnav} names={["Home", "Assets", "Swap", "Stake", "Burn", "Govern"]}>
                <Home />
                <Assets />
                <Swap />
                <Stake />
                <Burn />
                <Govern />
              </Navbar>
              <Learn />
              <Ecosystem />
              <Explore />
            </Navbar>
          </context.Provider>
        )}
      </Merged>
    </>
  )
}

function Settings() {
  const size = useWindowSize()
  const color = ["hsl(45, 100%, 30%)", "hsl(180, 100%, 30%)", "hsl(300, 100%, 30%)", "hsl(200, 100%, 30%)"][app.mainnav.selected.use()]

  return (
    <>
      <Text text="Settings" position={[size.width / 2 - 120, -size.height / 2 + 40, 220]} fontSize={22} />
      <Button position={[size.width / 2 - 120, -size.height / 2 + 40, 200]} width={200} radius={20} color={color} />
    </>
  )
}

function Connect() {
  const size = useWindowSize()
  const { status, connect, disconnect } = useWallet()
  const connected = status === "CONNECTED"
  const text = connected ? "Disconnect" : "Connect"
  const onClick = () => (connected ? disconnect() : connect())
  const color = ["hsl(45, 100%, 30%)", "hsl(180, 100%, 30%)", "hsl(300, 100%, 30%)", "hsl(200, 100%, 30%)"][app.mainnav.selected.use()]

  return (
    <>
      <Text text={text} position={[size.width / 2 - 120, size.height / 2 - 40, 220]} fontSize={22} />
      <Button position={[size.width / 2 - 120, size.height / 2 - 40, 200]} width={200} radius={20} color={color} onClick={onClick} opacity={1} />
    </>
  )
}

function Lights() {
  return (
    <>
      <pointLight intensity={5} position={[0, 5000, -10000]} decay={0} />
      <directionalLight position={[0, -0.5, 1]} intensity={8} />
    </>
  )
}

function Explore() {
  return (
    <>
      <Text text="Explore" position={[0, 350, 0]} fontSize={70} />
      <RoundedBox args={[1250, 600, 40]} radius={20}>
        <meshPhysicalMaterial color={"black"} roughness={1} metalness={0.8} />
      </RoundedBox>
    </>
  )
}
