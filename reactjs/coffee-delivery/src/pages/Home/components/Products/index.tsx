import { Container } from '../../../../styles/global'
import { CoffeeCard } from './components/CoffeeCard'
import { ProductsSectionSkin } from './style'
import data from '../../../../data/coffees.json'

export function ProductsSection() {
  return (
    <ProductsSectionSkin>
      <Container>
        <div className="products-head">
          <h2 className="products-title">Nossos cafés</h2>
          <div className="products-filter">
            <button type="button" className="filter-tag">
              Tradicional
            </button>
            <button type="button" className="filter-tag">
              Especial
            </button>
            <button type="button" className="filter-tag">
              Com leite
            </button>
            <button type="button" className="filter-tag">
              Alcoólico
            </button>
            <button type="button" className="filter-tag">
              Gelado
            </button>
          </div>
        </div>
        <div className="products-list">
          {data.map((coffee) => {
            return (
              <CoffeeCard
                key={coffee.name}
                image={coffee.image}
                tags={coffee.tags}
                name={coffee.name}
                description={coffee.description}
                price={coffee.price}
              />
            )
          })}
        </div>
      </Container>
    </ProductsSectionSkin>
  )
}
