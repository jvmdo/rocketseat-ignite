export function formatInitials(fullName: string | undefined | null) {
  if (!fullName) {
    return 'BW'
  }

  const parts = fullName.split(' ')

  if (parts.length === 1) {
    return `${parts[0].substring(0, 2).toUpperCase()}`
  }

  return parts
    .map((part) => part[0].toUpperCase())
    .join('')
    .slice(0, 2)
}
