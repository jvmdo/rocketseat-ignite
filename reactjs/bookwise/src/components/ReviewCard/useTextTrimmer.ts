import { useElementSize } from '@mantine/hooks'
import { useCallback } from 'react'

export function useTextTrimmer(text: string, lineClamp: number) {
  const { ref, height, width } = useElementSize()

  const trimmer = useCallback(function (
    element: HTMLElement,
    text: string,
    lineClamp: number,
    height: number,
    width: number,
  ) {
    const lineHeight = parseInt(getComputedStyle(element).lineHeight)
    const lines = Math.floor(height / lineHeight)

    const fontSize = parseInt(getComputedStyle(element).fontSize)
    const charsPerLine = Math.floor(width / (fontSize * 0.5))

    const totalChars = text.length
    const charsRemaining = totalChars - lineClamp * charsPerLine

    if (lines > lineClamp && charsRemaining > charsPerLine / 2) {
      const trimAt = lineClamp * charsPerLine + charsPerLine / 2

      return text.substring(0, trimAt).trim() + '...'
    }

    return text
  },
  [])

  let trimmedText = text

  if (ref.current) {
    trimmedText = trimmer(ref.current, text, lineClamp, height, width)
  }

  return { ref, trimmedText }
}
