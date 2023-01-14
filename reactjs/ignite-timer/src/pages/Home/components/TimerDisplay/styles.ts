import styled from 'styled-components'

export const DisplayContainer = styled.div`
  font-family: 'Roboto Mono', 'monospace';
  font-size: clamp(3rem, 0.455rem + 12.73vw, 10rem);

  .digit {
    padding-inline: 0.75rem;
    background-color: ${(props) => props.theme['gray-700']};
    border-radius: ${(props) => props.theme['border-radius']};

    &:nth-of-type(odd) {
      margin-right: 1rem;
    }
  }

  .separator {
    color: ${(props) => props.theme['green-500']};
  }
`
