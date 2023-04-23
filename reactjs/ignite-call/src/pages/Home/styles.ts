import { Heading, Text, styled } from '@ignite-ui/react'
import pattern from '../../assets/pattern.png'
import { breakpoints } from '@/styles/globals'
import Image from 'next/image'
import { ContentContainer } from '@/components/ContentContainer'

export const S_Home = styled('main', {
  minHeight: '100vh',
  backgroundImage: `url(${pattern.src})`,
  backgroundPosition: 'top 60% center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 50%',
  overflow: 'hidden',

  [`@media (min-width: ${breakpoints.lg})`]: {
    backgroundPosition: 'left center',
    backgroundSize: 'auto 76%',
  },

  [`${ContentContainer}`]: {
    minHeight: 'inherit',
    display: 'grid',
    placeContent: 'center',
    gap: '2rem',

    [`@media (min-width: ${breakpoints.lg})`]: {
      $$baseWidth: '72.5em',
      $$fluidPadding: 0,

      gridTemplateColumns: '41.38% 1fr',
      alignItems: 'center',
      gap: '4rem',

      position: 'relative',
      left: '8.333%',
    },

    [`@media (min-width: ${breakpoints.xl})`]: {
      gap: '6rem',
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
