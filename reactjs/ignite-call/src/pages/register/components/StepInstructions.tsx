import { breakpoints } from '@/styles/globals'
import { Heading, MultiStep, Text, styled } from '@ignite-ui/react'

/* 
  Styles
*/
const S_StepInstructions = styled('header', {
  paddingInline: '$3',

  [`@media (min-width: ${breakpoints.md})`]: {
    paddingInline: '$4',
  },

  [`@media (min-width: ${breakpoints.lg})`]: {
    paddingInline: '$6',
  },

  [`> ${Heading}`]: {
    marginBottom: '$2',
  },

  [`> ${Text}`]: {
    marginBottom: '$$containerGap',
  },
})

/* 
  Component
*/
interface StepInstructionsProps {
  title: string
  body: string
  step: number
}

export function StepInstructions({ title, body, step }: StepInstructionsProps) {
  return (
    <S_StepInstructions>
      <Heading as="h1" size="md">
        {title}
      </Heading>
      <Text size="md">{body}</Text>
      <MultiStep size={4} currentStep={step} />
    </S_StepInstructions>
  )
}
