import { Heading, Text } from '@ignite-ui/react'

interface StepInstructionsProps {
  title: string
  body: string
}

export function StepInstructions({ title, body }: StepInstructionsProps) {
  return (
    <section>
      <Heading as="h1" size="md" css={{ marginBottom: '$2 !important' }}>
        {title}
      </Heading>
      <Text size="md">{body}</Text>
    </section>
  )
}
