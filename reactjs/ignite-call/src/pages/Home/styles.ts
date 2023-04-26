import { Heading, Text, styled } from '@ignite-ui/react'
import pattern from '../../assets/pattern.png'
import { breakpoints } from '@/styles/globals'
import Image from 'next/image'

export const S_Home = styled('main', {
  // From 32px to 64px at 320px to 992px
  $$fluidGap: 'clamp(2rem, 1.048rem + 4.76vw, 4rem)',

  display: 'grid',
  gridAutoRows: 'min-content 1fr',
  gap: '$$fluidGap',
  placeContent: 'center',

  [`@media (min-width: ${breakpoints.lg})`]: {
    // From 64px to 96px at 992px to 1200px
    $$fluidGap: 'clamp(4rem, -5.538rem + 15.38vw, 6rem)',

    gridTemplateColumns: '41.38% 1fr',
    alignItems: 'center',
    gap: '$$fluidGap',

    position: 'relative',
    left: '8.333%',
  },

  '&::before': {
    content: '',
    inset: 0,
    position: 'fixed',
    zIndex: -1,

    backgroundImage: `url(${pattern.src})`,
    backgroundPosition: 'top calc(40vmin - $$fluidGap) center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 50%',

    [`@media (min-width: ${breakpoints.lg})`]: {
      backgroundPosition: 'left center',
      backgroundSize: 'auto 76%',
    },
  },
})

export const HeroContent = styled('div', {
  [`> ${Heading}`]: {
    fontSize: '$4xl',
    marginBottom: '0.5rem',

    [`@media (min-width: ${breakpoints.xs})`]: {
      fontSize: '$5xl',
    },

    [`@media (min-width: ${breakpoints.sm})`]: {
      fontSize: '$6xl',
    },

    [`@media (min-width: ${breakpoints.xl})`]: {
      fontSize: '$7xl',
    },
  },

  [`> ${Text}`]: {
    fontSize: '$md',

    [`@media (min-width: ${breakpoints.sm})`]: {
      fontSize: '$lg',
    },

    [`@media (min-width: ${breakpoints.lg})`]: {
      fontSize: '$xl',
    },
  },
})

export const Hero = styled(Image, {
  height: 'auto',

  [`@media (min-width: ${breakpoints.lg})`]: {
    order: 1,
    height: 354,
    objectFit: 'contain',
    objectPosition: 'left',
  },

  [`@media (min-width: ${breakpoints.xl})`]: {
    height: 442,
  },
})
