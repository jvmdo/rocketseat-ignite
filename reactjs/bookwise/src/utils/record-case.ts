import type { CamelCasedProperties } from 'type-fest'

export function columnsToCamelCase<T extends Record<string, any>>(record: T) {
  const camelCasedRecord = Object.fromEntries(
    Object.entries(record).map(([key, value]) => [toCamelCase(key), value]),
  ) as CamelCasedProperties<T>

  return camelCasedRecord
}

function toCamelCase(str: string) {
  return str.replace(/[_-]([A-Za-z])/g, (_, group) => group.toUpperCase())
}
