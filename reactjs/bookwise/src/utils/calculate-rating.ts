export function calculateBookRating(reviews: Array<{ rate: number }>) {
  return reviews.reduce((acc, { rate }) => acc + rate, 0) / reviews.length
}
