import React from "react"
import { ElectronClientProvider } from "./domain/electron/electron-provider"
import { PingClientProvider } from "./domain/ping/ping-provider"

export const AppProviders = ({ children }: React.HTMLAttributes<HTMLElement>): JSX.Element => (
  <ElectronClientProvider>
    <PingClientProvider>{children}</PingClientProvider>
  </ElectronClientProvider>
)
