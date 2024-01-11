import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { WalletProvider, getInitialConfig } from "@terra-money/wallet-kit"

getInitialConfig().then((defaultNetworks) =>
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <WalletProvider defaultNetworks={defaultNetworks}>
        <App />
      </WalletProvider>
    </React.StrictMode>
  )
)
