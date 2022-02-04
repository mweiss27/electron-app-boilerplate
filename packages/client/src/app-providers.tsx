import React from "react"
import { ElectronClientProvider } from "./domain/electron/electron-provider"

export const AppProviders = ({ children }: React.HTMLAttributes<HTMLElement>): JSX.Element => (
  <ElectronClientProvider>{children}</ElectronClientProvider>
)
