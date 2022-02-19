import React from "react"
import ReactDOM from "react-dom"
import { createGlobalStyle } from "styled-components"
import { App } from "./app"
import { AppProviders } from "./app-providers"
import { WaitForServers } from "./wait-for-servers"

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    height: 100%;
    color: white;
    font-family: sans-serif;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <AppProviders>
      <WaitForServers>
        <App />
      </WaitForServers>
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
)
