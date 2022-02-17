import { PingClient, IPingClient } from "@common/api-clients"
import React from "react"

const PingClientContext = React.createContext({} as IPingClient)

export const PingClientProvider = (props: React.HTMLAttributes<HTMLElement>): JSX.Element => {
  const pingClient = new PingClient()
  return <PingClientContext.Provider value={pingClient} {...props} />
}

export const usePingClient = (): IPingClient => {
  const value = React.useContext(PingClientContext)
  if (!value) {
    throw new Error(`Cannot invoke usePingClient outside of a PingClientProvider`)
  }

  return value
}
