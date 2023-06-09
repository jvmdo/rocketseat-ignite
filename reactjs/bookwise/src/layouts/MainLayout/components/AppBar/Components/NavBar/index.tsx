import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { NavLink } from '../NavLink'
import {
  CollapsibleContent,
  NavigationMenuList,
  NavigationMenuRoot,
} from './styles'
import { Binoculars, ChartLineUp, User } from '@phosphor-icons/react'
import { AuthFoot } from '../AuthFoot'
import { useSession } from 'next-auth/react'

export function NavBar() {
  const { data: session } = useSession()

  return (
    <CollapsibleContent>
      <NavigationMenuRoot>
        <NavigationMenuList>
          <NavigationMenu.Item>
            <NavLink href="/home">
              <ChartLineUp weight="bold" />
              <span>Início</span>
            </NavLink>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavLink href="/explorer">
              <Binoculars weight="bold" />
              <span>Explorar</span>
            </NavLink>
          </NavigationMenu.Item>
          {session && (
            <NavigationMenu.Item>
              <NavLink href={`/profile/${session.user.id}`}>
                <User weight="bold" />
                <span>Perfil</span>
              </NavLink>
            </NavigationMenu.Item>
          )}
        </NavigationMenuList>
      </NavigationMenuRoot>

      <AuthFoot />
    </CollapsibleContent>
  )
}
