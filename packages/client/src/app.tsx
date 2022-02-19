import React from "react"
import styled from "styled-components"

const IntroMessage = styled.div`
  color: black;
  font-size: 1.2rem;
`

export const App = (): JSX.Element => {
  return <IntroMessage>Hello!</IntroMessage>
}
