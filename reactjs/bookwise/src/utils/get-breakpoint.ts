export function getBreakpoint(media: string): string {
  return media.match(/(?<value>\d*\.?\d+\w+)/)?.groups?.value ?? '36em'
}
