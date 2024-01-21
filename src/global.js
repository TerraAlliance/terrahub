import { observable } from "@legendapp/state"
import { enableReactUse } from "@legendapp/state/config/enableReactUse"
enableReactUse()

export const app = observable()
app.mainnav.set({ width: 700, radius: 20, selected: 0, color: "hsl(45, 100%, 20%)", origin: "top", translation: [0, -40, 150], direction: "horizontal" })
app.walletnav.set({ width: 200, radius: 20, selected: 0, color: "hsl(45, 100%, 20%)", origin: "right", translation: [-150, 0, 150], direction: "vertical" })
app.learnnav.set({ width: 200, radius: 20, selected: 0, color: "hsl(180, 100%, 20%)", origin: "right", translation: [-150, 0, 150], direction: "vertical" })
app.ecosystemnav.set({ width: 200, radius: 20, selected: 0, color: "hsl(300, 100%, 20%)", origin: "right", translation: [-150, 0, 150], direction: "vertical" })

export const getChainID = (network) => {
  switch (network) {
    case "mainnet":
      return "phoenix-1"
    case "testnet":
      return "pisco-1"
    case "classic":
      return "columbus-5"
    case "localterra":
      return "localterra"
  }
}
