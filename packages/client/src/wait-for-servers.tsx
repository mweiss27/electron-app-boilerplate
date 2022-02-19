import { Ports } from "@common/api-clients"
import { GetSystemInfoResponse } from "@common/typings"
import React from "react"
import waitOn from "wait-on"
import { CenteredLoadingSpinner } from "./components/loading-spinner"
import { useElectronClient } from "./domain/electron/electron-provider"
import { usePingClient } from "./domain/ping/ping-provider"

export const WaitForServers = (props: React.HTMLAttributes<HTMLElement>): JSX.Element => {
  const [serverReady, setServerReady] = React.useState<boolean>(false)
  const [electronReady, setElectronReady] = React.useState<boolean>(false)

  const electronClient = useElectronClient()
  const pingClient = usePingClient()

  React.useEffect(() => {
    const checkForServer = async () => {
      try {
        const pong = await pingClient.ping()
        setServerReady(true)
      } catch (ex) {
        setTimeout(checkForServer, 500)
      }
    }

    const checkForElectron = async () => {
      try {
        const sysInfo = await electronClient.getSystemInfo()
        setElectronReady(true)
      } catch (ex) {
        setTimeout(checkForElectron, 500)
      }
    }

    checkForServer()
    checkForElectron()
  }, [])

  return <>{serverReady && electronReady ? props.children : <CenteredLoadingSpinner />}</>
}
