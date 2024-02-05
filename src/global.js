import { createContext } from "react"
import { observable } from "@legendapp/state"
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking"
enableReactTracking({ auto: true })

export const context = createContext()

export const app = observable()
app.mainnav.set({ width: 700, radius: 20, selected: 0, color: "hsl(45, 100%, 30%)", origin: "top", translation: [0, -40, 150], direction: "horizontal" })
app.walletnav.set({ width: 160, radius: 20, selected: 0, color: "hsl(45, 100%, 30%)", origin: "right", translation: [-120, 0, 150], direction: "vertical" })
app.learnnav.set({ width: 160, radius: 20, selected: 0, color: "hsl(180, 100%, 30%)", origin: "right", translation: [-120, 0, 150], direction: "vertical" })
app.ecosystemnav.set({ width: 160, radius: 20, selected: 0, color: "hsl(300, 100%, 30%)", origin: "right", translation: [-120, 0, 150], direction: "vertical" })

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
