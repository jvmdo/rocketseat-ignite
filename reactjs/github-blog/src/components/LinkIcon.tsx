import { HTMLProps, ReactNode } from 'react'
import styled from 'styled-components'

const SLinkIcon = styled.a`
  color: ${(p) => p.theme.blue};
  font-size: ${(p) => p.theme['fs-xs']};
  font-weight: ${(p) => p.theme['fw-bold']};
  text-transform: uppercase;
  word-break: break-word;

  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  position: relative;

  & > * {
    flex-shrink: 0;
  }

  &::before {
    background-color: currentColor;
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  &:is(:hover, :focus-visible)::before {
    transform: scaleX(1);
  }
`

interface LinkIconProps extends HTMLProps<HTMLAnchorElement> {
  children: ReactNode
}

export function LinkIcon({ children }: LinkIconProps) {
  return <SLinkIcon>{children}</SLinkIcon>
}
