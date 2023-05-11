export function columnsToCamelCase(record: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [toCamelCase(key), value]),
  )
}

function toCamelCase(str: string) {
  return str.replace(/[_-]([A-Za-z])/g, (_, group) => group.toUpperCase())
}
