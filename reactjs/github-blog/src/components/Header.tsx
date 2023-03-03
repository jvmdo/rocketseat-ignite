import styled from 'styled-components'
import { ContentContainer } from '../styles/global'
import logo from '../assets/logo.png'
import bgiLeft from '../assets/bgi-left.svg'
import bgiRight from '../assets/bgi-right.svg'

const SHeader = styled.header`
  background-color: ${(p) => p.theme.profile};
  --height: clamp(10rem, 4.834rem + 22.04vw, 18.5rem);

  ${ContentContainer} {
    background-image: url(${bgiLeft}), url(${bgiRight});
    background-repeat: no-repeat;
    background-position: left, right;
    background-size: contain contain;

    display: flex;
    align-items: flex-start;
    justify-content: center;

    --base-width: 84rem;
    height: var(--height);
    padding-top: clamp(2rem, 0.784rem + 5.19vw, 4rem);
    position: relative;
  }
`

const Logo = styled.img`
  width: clamp(5.5rem, 3.069rem + 10.37vw, 9.5rem);
`

const Blur = styled.span`
  background-color: #14589c;
  position: absolute;

  &.mid {
    filter: blur(calc(var(--height) / 2.8));
    height: clamp(2rem, 1.24rem + 3.24vw, 3.25rem);
    width: 64vw;
    bottom: 0;
  }

  &.left {
    filter: blur(calc(var(--height) / 1.48));
    height: calc(var(--height) * 0.8);
    aspect-ratio: 1 / 1;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    opacity: 0.7;
  }

  &.right {
    filter: blur(calc(var(--height) / 1.61));
    height: calc(var(--height) * 0.52);
    aspect-ratio: 1 / 1;
    top: 0;
    right: 0;
    transform: translate(-15%, -33%) rotate(15deg);
  }
`

export function Header() {
  return (
    <SHeader>
      <ContentContainer>
        <Logo src={logo} alt="" />
        <Blur className="left"></Blur>
        <Blur className="mid"></Blur>
        <Blur className="right"></Blur>
      </ContentContainer>
    </SHeader>
  )
}
