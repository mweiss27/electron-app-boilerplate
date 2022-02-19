import React from "react"
import styled from "styled-components"

const loadingSpinnerSizeMap = new Map<LoadingSpinnerSize, string>([
  ["tiny", "15px"],
  ["small", "25px"],
  ["medium", "40px"],
  ["large", "60px"],
  ["extraLarge", "90px"],
])

// https://gist.github.com/knowbody/578b35164b69e867ed4913423f6bed30
export const LoadingSpinner = ({ className, size = "small" }: LoadingSpinnerProps): JSX.Element => (
  <div className={className}>
    <StyledSpinner viewBox="0 0 50 50" size={size}>
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
    </StyledSpinner>
  </div>
)

export const CenteredLoadingSpinner = styled(LoadingSpinner)`
  display: grid;
  place-content: center;
`

export const AbsolutelyCenteredLoadingSpinner = styled(LoadingSpinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledSpinner = styled.svg<Required<LoadingSpinnerSizeProps>>`
  animation: rotate 2s linear infinite;
  /* margin: -25px 0 0 -25px; */
  width: ${({ size }: Required<LoadingSpinnerSizeProps>): string => loadingSpinnerSizeMap.get(size)!};
  height: ${({ size }: Required<LoadingSpinnerSizeProps>): string => loadingSpinnerSizeMap.get(size)!};

  & .path {
    stroke: black;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`

export type LoadingSpinnerSize = "tiny" | "small" | "medium" | "large" | "extraLarge"

interface LoadingSpinnerSizeProps {
  readonly size?: LoadingSpinnerSize
}

export type LoadingSpinnerProps = React.HTMLAttributes<HTMLElement> & LoadingSpinnerSizeProps
