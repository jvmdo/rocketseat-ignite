export function currencyFormatter(
  price: number,
  language = 'en-US',
  currency = 'USD',
) {
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
  }).format(price)
}

export function dateFormatter(date: Date, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
  }).format(date)
}
