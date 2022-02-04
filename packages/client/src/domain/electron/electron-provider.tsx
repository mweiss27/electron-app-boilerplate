import { ElectronClient, IElectronClient } from "@common/api-clients"
import React from "react"

const ElectronClientContext = React.createContext({} as IElectronClient)

export const ElectronClientProvider = (props: React.HTMLAttributes<HTMLElement>): JSX.Element => {
  const electronClient = new ElectronClient()
  return <ElectronClientContext.Provider value={electronClient} {...props} />
}

export const useElectronClient = (): IElectronClient => {
  const value = React.useContext(ElectronClientContext)
  if (!value) {
    throw new Error(`Cannot invoke useElectronClient outside of a ElectronClientProvider`)
  }

  return value
}
