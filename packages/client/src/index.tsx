import React from "react"
import ReactDOM from "react-dom"
import { createGlobalStyle } from "styled-components"
import { App } from "./app"
import { AppProviders } from "./app-providers"

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
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
)
