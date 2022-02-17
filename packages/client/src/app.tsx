import { GetSystemInfoResponse } from "@common/typings"
import React from "react"
import styled from "styled-components"
import { useElectronClient } from "./domain/electron/electron-provider"
import { usePingClient } from "./domain/ping/ping-provider"

const IntroMessage = styled.div`
  color: black;
  font-size: 1.2rem;
`

export const App = (): JSX.Element => {
  const electronClient = useElectronClient()
  const pingClient = usePingClient()
  const [systemInfo, setSystemInfo] = React.useState<GetSystemInfoResponse | null>(null)
  const [pingResponse, setPingResponse] = React.useState<string>()

  React.useEffect(() => {
    electronClient.getSystemInfo().then(setSystemInfo)
  }, [])

  React.useEffect(() => {
    pingClient.ping().then(setPingResponse)
  }, [])

  return (
    <div>
      <IntroMessage>Electron - {systemInfo?.userDataPath ?? "-"}</IntroMessage>
      <IntroMessage>Server - {pingResponse}</IntroMessage>
    </div>
  )
}
