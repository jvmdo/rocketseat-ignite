import { MapPin, ShoppingCart } from 'phosphor-react'
import { Container } from '../../styles/global'
import { Navbar } from './style'
import logo from '../../assets/logo.svg'
import { IconBox } from '../IconBox'
import { Cart } from './components/Cart'
import { NavLink } from 'react-router-dom'
import { useTheme } from 'styled-components'

export function Header() {
  const stateVar = 0
  const theme = useTheme()

  return (
    <header>
      <Container>
        <Navbar>
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>
          <NavLink to="/no-page">
            <span className="location">
              <MapPin size={22} color={theme.purple} weight="fill" />
              Manaus, AM
            </span>
          </NavLink>
          <NavLink to="/checkout">
            <Cart number={stateVar}>
              <IconBox
                boxWidth={2.5}
                color={'yellowDark'}
                backgroundColor={'yellowLight'}
                hoverBackgroundColor={'yellow'}
              >
                <ShoppingCart size={22} weight="fill" />
              </IconBox>
            </Cart>
          </NavLink>
        </Navbar>
      </Container>
    </header>
  )
}
