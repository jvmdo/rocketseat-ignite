import { MapPin, ShoppingCart } from 'phosphor-react'
import { Container } from '../../styles/global'
import { HeaderSkin, NavbarSkin } from './style'
import logo from '../../assets/logo.svg'
import { IconBox } from '../IconBox'
import { Cart } from './components/Cart'
import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { useEffect, useState } from 'react'

export function Header() {
  const theme = useTheme()
  const location = useLocation()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    function getWindowYOffset() {
      const windowScrollY = window.scrollY
      const productsHeadDistanceToTop =
        document.querySelector('.products-head')?.getBoundingClientRect().top ??
        Infinity

      if (location.pathname === '/') {
        if (productsHeadDistanceToTop <= 150) {
          setScrollY(windowScrollY)
        } else {
          setScrollY(0)
        }
      }
    }

    window.addEventListener('scroll', getWindowYOffset)
    return () => {
      window.removeEventListener('scroll', getWindowYOffset)
    }
  }, [location.pathname])

  useEffect(() => {
    if (scrollY) {
      document.querySelector('.header')?.classList.add('sticky')
    } else {
      document.querySelector('.header')?.classList.remove('sticky')
    }
  }, [scrollY, location])

  return (
    <HeaderSkin className="header">
      <Container>
        <NavbarSkin>
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
            <Cart>
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
        </NavbarSkin>
      </Container>
    </HeaderSkin>
  )
}
