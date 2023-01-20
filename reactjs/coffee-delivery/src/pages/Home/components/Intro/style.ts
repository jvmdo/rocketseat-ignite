import styled from 'styled-components'
import { breakpoint, Container } from '../../../../styles/global'
import background from '../../../../assets/background.svg'

export const IntroSectionSkin = styled.section`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: top;
  text-align: center;
  padding-block: 2rem 4rem;

  .intro-illustration {
    max-width: 30rem;
    margin-inline: auto;
    margin-bottom: 2rem;
    padding-inline: 2rem;
  }

  .title {
    color: ${(p) => p.theme['base-title']};
    font-size: ${(p) => p.theme['fs-h-xl']};
    max-width: 20ch;
    margin-inline: auto;
    margin-bottom: 1rem;
  }

  .title + p {
    font-size: ${(p) => p.theme['fs-b-xl']};
    line-height: ${(p) => p.theme['lh-heading']};
    margin-bottom: 3rem;
  }

  .features {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 1.25rem 2rem;
  }

  .features ul:first-of-type {
    flex-basis: 14.5rem;
  }

  .features ul:last-of-type {
    flex-basis: 18.5rem;
  }

  .features li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: ${(p) => p.theme['fs-b-rg']};
  }

  .features li:first-of-type {
    margin-bottom: 1.25rem;
  }

  .features .icon {
    background-color: ${(p) => p.theme['base-hover']};
    border-radius: 100%;
    padding: 0.5rem;
    width: 2rem;
  }

  @media (min-width: ${breakpoint.md}) {
    .intro-illustration {
      padding: unset;
    }
  }

  @media (min-width: ${breakpoint.lg}) {
    background-size: 100vw auto;
    background-position: center;
    text-align: unset;
    padding-block: 5rem 7rem;
    /* background-color: #fafafa30;
    background-blend-mode: hard-light; */

    & > ${Container} {
      display: flex;
      align-items: center;
      gap: clamp(0rem, -17.455rem + 27.27vw, 3rem); /* 1024px - 1200px */
    }

    .intro-illustration {
      flex: 1 0 clamp(24rem, -10.909rem + 54.55vw, 30rem); /* 1024px - 1200px */
      order: 1;
      margin-bottom: unset;
    }

    .title {
      margin-inline: unset;
    }

    .title + p {
      margin-bottom: clamp(2rem, -9.636rem + 18.18vw, 4rem);
    }

    .features {
      justify-content: unset;
    }
  }
`
