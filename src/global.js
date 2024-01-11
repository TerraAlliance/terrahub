import { observable } from "@legendapp/state"
import { enableReactUse } from "@legendapp/state/config/enableReactUse"
enableReactUse()

export const app = observable()
app.mainnav.set({ width: 700, radius: 20, selected: 0, origin: "top", translation: [0, -40, 150], direction: "horizontal" })
app.walletnav.set({ width: 200, radius: 20, selected: 0, origin: "right", translation: [-150, 0, 150], direction: "vertical" })
app.learnnav.set({ width: 200, radius: 20, selected: 0, origin: "right", translation: [-150, 0, 150], direction: "vertical" })
app.ecosystemnav.set({ width: 200, radius: 20, selected: 0, origin: "right", translation: [-150, 0, 150], direction: "vertical" })
