import { MeshStandardMaterial, Mesh, BoxGeometry, CylinderGeometry, SphereGeometry } from "three"
import { Canvas } from "@react-three/fiber"
import { OrthographicCamera, Stats, Merged, useGLTF } from "@react-three/drei"

import { app, context } from "./global"
// import { Perf } from "r3f-perf"
// import { OrbitControls } from "@react-three/drei"
import Body from "./Body"

const box = new BoxGeometry(1, 1, 1)
const cylinder = new CylinderGeometry(1, 1, 1, 8)
const halfcylinder = new CylinderGeometry(1, 1, 1, 8, 1, true, 0, Math.PI)
const cylinder32 = new CylinderGeometry(1, 1, 1, 32)
const sphere = new SphereGeometry(1, 32, 32)
const halfsphere = new SphereGeometry(1, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2)
const quartersphere = new SphereGeometry(1, 8, 8, 0, Math.PI, 0, Math.PI / 2)

const rough = new MeshStandardMaterial({ roughness: 1, metalness: 1, side: 2 })
const metal = new MeshStandardMaterial({ roughness: 0.5, metalness: 1 })
const verymetal = new MeshStandardMaterial({ roughness: 0.15, metalness: 1 })
const transparent = new MeshStandardMaterial({ roughness: 0.5, metalness: 1, transparent: true, opacity: 0.5 })
const verytransparent = new MeshStandardMaterial({ roughness: 0.5, metalness: 1, transparent: true, opacity: 0.3 })

export default function App() {
  const { nodes } = useGLTF("/terra.glb")

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "black",
      }}
    >
      <Background />
      <Canvas>
        {/* {process.env.NODE_ENV === "development" ? <Perf position={"bottom-left"} /> : null} */}
        {/* <OrbitControls enabled={false} enableZoom={false} /> */}
        <Stats />
        <OrthographicCamera makeDefault position={[0, 0, 5000]} far={10000} />
        <Merged
          meshes={{
            RoughBox: new Mesh(box, rough),
            RoughHalfSphere: new Mesh(halfsphere, rough),
            RoughCylinder: new Mesh(cylinder, rough),
            RoughHalfCylinder: new Mesh(halfcylinder, rough),
            RoughQuarterSphere: new Mesh(quartersphere, rough),
            MetalBox: new Mesh(box, metal),
            MetalSphere: new Mesh(sphere, metal),
            MetalCylinder: new Mesh(cylinder32, metal),
            VeryMetalCylinder: new Mesh(cylinder, verymetal),
            TransparentSphere: new Mesh(sphere, transparent),
            VeryTransparentSphere: new Mesh(sphere, verytransparent),
            Terra_0: new Mesh(nodes.Mesh_0.geometry, metal),
            Terra_1: new Mesh(nodes.Mesh_1.geometry, metal),
            Terra_2: new Mesh(nodes.Mesh_2.geometry, metal),
            Terra_3: new Mesh(nodes.Mesh_3.geometry, metal),
          }}
        >
          {(models) => (
            <context.Provider value={models}>
              <Body />
            </context.Provider>
          )}
        </Merged>
      </Canvas>
    </div>
  )
}

function Background() {
  const selected = app.mainnav.selected.get()
  const classname = ["wallet", "learn", "ecosystem", "explore"][selected]

  return (
    <div
      className={classname}
      style={{
        zIndex: 0,
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "linear-gradient(transparent 70%, var(--Color)) 100%",
        transition: "--Color 0.6s ease",
        pointerEvents: "none",
      }}
    ></div>
  )
}
