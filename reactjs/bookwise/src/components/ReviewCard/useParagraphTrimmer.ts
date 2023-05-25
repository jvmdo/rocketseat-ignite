import { RefObject, useEffect, useRef, useState } from 'react'

export function useParagraphTrimmer(
  paragraphRef: RefObject<HTMLParagraphElement>,
  text: string,
  lineClamp: number,
) {
  const [trimmedText, setTrimmedText] = useState<string | null>(text)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    function trimmer(paragraphElement: HTMLParagraphElement) {
      const lineHeight = parseInt(getComputedStyle(paragraphElement).lineHeight)
      const paraHeight = paragraphElement.clientHeight
      const lines = Math.floor(paraHeight / lineHeight)

      if (lines <= lineClamp) {
        return setTrimmedText(text)
      }

      const fontSize = parseInt(getComputedStyle(paragraphElement).fontSize)
      const paraWidth = paragraphElement.clientWidth
      const charsPerLine = Math.floor(paraWidth / (fontSize * 0.5))

      const totalChars = text.length
      const charsRemaining = totalChars - lineClamp * charsPerLine

      if (charsRemaining > charsPerLine / 2) {
        const trimAt = lineClamp * charsPerLine + charsPerLine / 2
        return setTrimmedText(text.substring(0, trimAt).trim() + '...')
      }
    }

    function handleParagraphResize() {
      if (paragraphRef.current) {
        trimmer(paragraphRef.current)
      }
    }

    resizeObserverRef.current = new ResizeObserver(handleParagraphResize)

    if (paragraphRef.current) {
      resizeObserverRef.current.observe(paragraphRef.current)
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [paragraphRef, text, lineClamp])

  return trimmedText
}
