import { useEffect } from "react"
import { CapsuleGeometry } from "three"
import { Text, RoundedBox } from "@react-three/drei"
import { useWindowSize } from "@uidotdev/usehooks"
import { useLcdClient, useConnectedWallet } from "@terra-money/wallet-kit"

import Satellite from "../components/Satellite"
import Button from "../components/Button"
import { app, getChainID } from "../global"

export default function Stake() {
  const connected = useConnectedWallet()
  const address = connected?.addresses[getChainID(connected.network)]
  // const address = "terra1rtmnt8ayar03rpmktnm3eanhsvrahecgyh5cz8"
  const validators = app.validators.use()
  const lcd = useLcdClient()

  useEffect(() => {
    if (connected) {
      lcd.staking.validators(getChainID(connected.network), { "pagination.limit": 999 }).then(([validators]) => {
        app.validators.set(
          validators
            .filter((obj) => obj.status !== "BOND_STATUS_UNBONDED")
            .sort((a, b) => b.tokens - a.tokens)
            .map((validator, index) => {
              return {
                name: validator.description.moniker,
                operator_address: validator.operator_address,
                tokens: validator.tokens.toNumber() / 1000000,
                rank: index + 1,
              }
            })
        )
      })
      lcd.staking.pool(getChainID(connected.network)).then((total) => app.totalStaked.set(total.bonded_tokens.amount.toNumber() / 1000000))
      lcd.staking.delegations(address).then(([delegations]) => {
        console.log(delegations)
        app.delegations.set(
          delegations.map((delegation) => {
            return {
              balance: delegation.balance.amount.toNumber(),
              operator_address: delegation.validator_address,
              shares: delegation.shares.toNumber(),
            }
          })
        )
      })
    }
  }, [connected])

  return (
    <>
      {/* <Input position={[0, 0, 100]} scale={200} /> */}
      <Text position={[0, 350, 0]} font="./GothamLight.otf" fontSize={60}>
        Stake
      </Text>
      <RoundedBox args={[1250, 600, 40]} radius={20}>
        <meshPhysicalMaterial color={"black"} roughness={1} metalness={0.8} />
      </RoundedBox>
      {validators?.slice(0, 24).map((validator, index) => (
        <Validator key={index} validator={validator} index={index} />
      ))}
    </>
  )
}

const geometry = new CapsuleGeometry(30, 220)

function Validator({ validator, index }) {
  const delegations = app.delegations.use()
  const totalStaked = app.totalStaked.use()

  const delegated = delegations?.filter(({ operator_address }) => validator.operator_address === operator_address)[0]?.shares.toString() / 1000000

  const size = useWindowSize()
  const xspacing = 310
  const yspacing = 90
  const columns = 6

  const x = Math.floor(index / columns) * xspacing - size.width / 4
  const y = -(index % columns) * yspacing + ((columns - 1) * yspacing) / 2

  return (
    <group key={index} position={[x, y, 50]}>
      <Text position={[-70, -15, 30]} fontSize={18} font={"./GothamLightEmojis.woff"} anchorX={"left"} clipRect={[0, -100, 200, 100]}>
        {((validator.tokens / totalStaked) * 100).toFixed(2) + "%" + " " + "#" + validator.rank}
      </Text>
      <Button
        position={[0, 0, 0]}
        width={200}
        radius={30}
        geometry={geometry}
        opacity={1}
        color={delegated ? "hsl(45, 100%, 20%)" : "hsl(45, 0%, 12%)"}
        text={validator.name.slice(0, 40)}
        textProps={{ "position-y": 10, font: "./GothamLightEmojis.woff", fontSize: 22, anchorX: "left", "position-x": -70, clipRect: [0, -100, 200, 100] }}
      />
      {<Satellite position={[-108, 0, 50]} scale={1.3} onClick={() => null} />}
    </group>
  )
}
