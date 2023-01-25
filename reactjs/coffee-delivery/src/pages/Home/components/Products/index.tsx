import { Container } from '../../../../styles/global'
import { CoffeeCard } from './components/CoffeeCard'
import { ProductsSectionSkin } from './style'
import data from '../../../../data/coffees.json'
import { useEffect, useState } from 'react'
import { FilterTag } from './components/FilterTag'

const availableTags = data.reduce((acc, item) => {
  return [...acc].concat(item.tags.filter((tag) => !acc.includes(tag)))
}, [] as string[])

export function ProductsSection() {
  const [coffees, setCoffees] = useState([...data])
  const [activeTags, setActiveTags] = useState<string[]>([])

  useEffect(() => {
    if (activeTags.length) {
      const filteredCoffees = data.filter((coffee) =>
        coffee.tags.some((tag) => activeTags.includes(tag)),
      )
      setCoffees(filteredCoffees)
    } else {
      setCoffees([...data])
    }
  }, [activeTags])

  function handleFilter(tag: string) {
    const tagFound = activeTags.find((activeTag) => activeTag === tag)
    if (tagFound) {
      // Remove
      setActiveTags((state) => state.filter((tag) => tag !== tagFound))
    } else {
      // Insert
      setActiveTags((state) => [...state, tag])
    }
  }

  return (
    <ProductsSectionSkin>
      <Container>
        <div className="products-head">
          <h2 className="products-title">Nossos cafés</h2>
          <div className="products-filter">
            {availableTags.map((tag) => (
              <FilterTag key={tag} name={tag} onFilter={handleFilter} />
            ))}
          </div>
        </div>
        <div className="products-list">
          {coffees.map((coffee) => (
            <CoffeeCard key={coffee.name} {...coffee} />
          ))}
        </div>
      </Container>
    </ProductsSectionSkin>
  )
}
