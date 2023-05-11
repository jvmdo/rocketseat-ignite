export function formatCategories(categories: Array<Record<string, any>>) {
  return categories.map(({ category }) => category.name)
}
