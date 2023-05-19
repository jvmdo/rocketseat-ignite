import { useRouter } from 'next/router'
import { NavigationMenuLinkProps } from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import { S_NavLink } from './styles'

interface NavLinkProps extends NavigationMenuLinkProps {}

export function NavLink({ href, ...props }: NavLinkProps) {
  const router = useRouter()
  const isActive = router.asPath === href

  return (
    <Link href={href ?? ''} passHref legacyBehavior>
      <S_NavLink active={isActive} {...props} />
    </Link>
  )
}
