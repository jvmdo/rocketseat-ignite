import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 74rem;
  min-height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem clamp(1.5rem, 1.136rem + 1.82vw, 2.5rem);
  border-radius: ${(props) => props.theme['border-radius']};
  background: ${(props) => props.theme['gray-800']};
`
