import styled from 'styled-components'
import { breakpoint } from '../../../../styles/global'

export const ProductsSectionSkin = styled.section`
  margin-bottom: 4rem;

  .products-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3.5rem;
  }

  .products-title {
    color: ${(p) => p.theme['base-subtitle']};
    font-size: ${(p) => p.theme['fs-h-lg']};
  }

  .products-filter {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding-inline: 1rem;
  }

  .products-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, min-content));
    justify-items: center;
    justify-content: center;
    gap: 3.5rem 2rem;
  }

  @media (min-width: ${breakpoint.lg}) {
    margin-bottom: 7rem;

    .products-head {
      flex-direction: row;
      justify-content: space-between;
    }

    .products-filter {
      padding-inline: unset;
    }
  }
`
