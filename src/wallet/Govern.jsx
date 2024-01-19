import { Text, RoundedBox } from "@react-three/drei"

export default function Govern() {
  return (
    <>
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={60}>
        Govern
      </Text>
      <RoundedBox args={[1300, 650, 40]} radius={20}>
        <meshStandardMaterial color={"black"} metalness={0.8} roughness={1} />
      </RoundedBox>
    </>
  )
}
