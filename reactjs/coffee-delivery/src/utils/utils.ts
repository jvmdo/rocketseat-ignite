export function currencyFormatter(
  price: number,
  language = 'pt-BR',
  currency = 'BRL',
) {
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
  }).format(price)
}

export function currencyFormatterParts(
  price: number,
  language = 'pt-BR',
  currency = 'BRL',
) {
  const parts = new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
  })
    .formatToParts(price)
    .map((p) => p.value)

  return [parts[0], parts.slice(2).join('')]
}
