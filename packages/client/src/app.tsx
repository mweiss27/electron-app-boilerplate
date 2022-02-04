import { GetSystemInfoResponse } from "@common/typings"
import React from "react"
import styled from "styled-components"
import { useElectronClient } from "./domain/electron/electron-provider"

const IntroMessage = styled.div`
  color: black;
  font-size: 1.2rem;
`

export const App = (): JSX.Element => {
  const electronClient = useElectronClient()
  const [systemInfo, setSystemInfo] = React.useState<GetSystemInfoResponse | null>(null)

  React.useEffect(() => {
    electronClient.getSystemInfo().then(setSystemInfo)
  }, [])

  return <IntroMessage>Electron App Boilerplate - {systemInfo?.userDataPath ?? "-"}</IntroMessage>
}
