import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { NavLink } from '../NavLink'
import {
  CollapsibleContent,
  NavigationMenuList,
  NavigationMenuRoot,
} from './styles'
import { Binoculars, ChartLineUp, User } from 'phosphor-react'
import { AuthFoot } from '../AuthFoot'

export function NavBar() {
  // TODO: intersection observer
  return (
    <CollapsibleContent asChild>
      <NavigationMenuRoot>
        <NavigationMenuList>
          <NavigationMenu.Item>
            <NavLink href="/">
              <ChartLineUp weight="bold" />
              <span>Início</span>
            </NavLink>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavLink href="/explore">
              <Binoculars weight="bold" />
              <span>Explorar</span>
            </NavLink>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavLink href="/user/[id]/">
              <User weight="bold" />
              <span>Perfil</span>
            </NavLink>
          </NavigationMenu.Item>
        </NavigationMenuList>

        <AuthFoot />
      </NavigationMenuRoot>
    </CollapsibleContent>
  )
}
