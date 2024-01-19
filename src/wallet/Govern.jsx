import { Text, RoundedBox } from "@react-three/drei"

export default function Govern() {
  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={60}>
        Govern
      </Text>
      <RoundedBox args={[1250, 600, 40]} radius={20}>
        <meshPhysicalMaterial color={"black"} roughness={1} metalness={0.8} />
      </RoundedBox>
    </>
  )
}
