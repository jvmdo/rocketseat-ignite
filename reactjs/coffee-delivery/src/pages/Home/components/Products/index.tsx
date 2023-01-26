import { Container } from '../../../../styles/global'
import { CoffeeCard } from './components/CoffeeCard'
import { ProductsSectionSkin } from './style'
import data from '../../../../data/coffees.json'
import { useState } from 'react'
import { FilterTag } from './components/FilterTag'

const availableTags = data.reduce((acc, item) => {
  return [...acc].concat(item.tags.filter((tag) => !acc.includes(tag)))
}, [] as string[])

const activeTags: string[] = []

export function ProductsSection() {
  const [coffees, setCoffees] = useState([...data])

  function coffeesFilter() {
    if (activeTags.length) {
      const filteredCoffees = data.filter((coffee) =>
        coffee.tags.some((tag) => activeTags.includes(tag)),
      )
      setCoffees(filteredCoffees)
    } else {
      setCoffees([...data])
    }
  }

  function handleFilter(tag: string) {
    // tag currently active ? remove : insert
    const index = activeTags.findIndex((activeTag) => activeTag === tag)
    ~index ? activeTags.splice(index, 1) : activeTags.push(tag)
    coffeesFilter()
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
