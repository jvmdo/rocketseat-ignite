import styled from 'styled-components'
import { breakpoint, Container } from '../../styles/global'

export const SuccessSkin = styled.main`
  ${Container} {
    display: grid;
    row-gap: 3rem;
    justify-content: center;
    margin-block: 2rem;
  }

  .illustration-delivery {
    padding-inline: calc(
      -1 * clamp(-2rem, -3.156rem + 4.93vw, 0rem)
    ); /* 375px - 1024px */
  }

  .delivery h1 {
    color: ${(p) => p.theme['yellow-dark']};
    font-size: ${(p) => p.theme['fs-h-lg']};
    text-align: center;
  }

  .delivery > p {
    color: ${(p) => p.theme['base-subtitle']};
    font-size: ${(p) => p.theme['fs-b-lg']};
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .delivery-info {
    background: linear-gradient(
          ${(p) => p.theme.background},
          ${(p) => p.theme.background}
        )
        padding-box,
      linear-gradient(102.89deg, #dbac2c 2.61%, #8047f8 98.76%) border-box;
    border: 1px solid transparent;
    border-radius: 6px 36px;
    padding: 2.5rem;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    line-height: ${(p) => p.theme['lh-heading']};
  }

  .info-item:not(:last-of-type) {
    margin-bottom: 2rem;
  }

  .info-item span {
    font-weight: ${(p) => p.theme['fw-bd']};
  }

  @media (min-width: ${breakpoint.lg}) {
    ${Container} {
      grid-template-columns: 33fr 31fr;
      align-items: end;
      column-gap: clamp(3rem, -14.455rem + 27.27vw, 6rem);
      margin-block: 5rem;
    }

    .illustration-delivery {
      order: 1;
    }

    .delivery h1,
    .delivery p {
      text-align: unset;
    }
  }
`
