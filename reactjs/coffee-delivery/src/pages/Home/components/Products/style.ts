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

  .filter-tag {
    border: 1px solid ${(p) => p.theme.yellow};
    border-radius: 100vw;
    color: ${(p) => p.theme['yellow-dark']};
    font-size: ${(p) => p.theme['fs-b-xxs']};
    font-weight: ${(p) => p.theme['fw-bd']};
    text-transform: uppercase;
    padding-inline: 0.75rem;
    height: 1.5rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    transition: ${(p) => p.theme['ts-hover']};
  }

  .filter-tag:is(:hover, :focus-visible) {
    background-color: ${(p) => p.theme['yellow-dark']};
    color: ${(p) => p.theme.white};
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
