export const LightTheme = {
  /* Colors */
  'yellow-dark': '#c47f17',
  yellow: '#dbac2c',
  'yellow-light': '#f1e9c9',

  'purple-dark': '#4b2995',
  purple: '#8047f8',
  'purple-light': '#ebe5f9',

  'base-title': '#272221',
  'base-subtitle': '#403937',
  'base-text': '#574f4d',
  'base-label': '#8d8686',
  'base-hover': '#d7d5d5',
  'base-button': '#e6e5e5',
  'base-input': '#ededed',
  'base-card': '#f3f2f2',

  background: '#fafafa',
  white: '#ffffff',

  /* Typography */
  'ff-heading': '"Baloo 2", cursive',
  'ff-body': '"Roboto", sans-serif',

  'lh-heading': '1.3',
  'lh-body': '1.6',

  'fw-rg': '400',
  'fw-bd': '700',
  'fw-xbd': '800',

  'fs-h-sm': '1.125rem',
  'fs-h-rg': '1.25rem',
  'fs-h-lg': 'clamp(1.5rem, 1.211rem + 1.23vw, 2rem)' /* 375px - 1024px */,
  'fs-h-xl': 'clamp(2rem, 1.422rem + 2.47vw, 3rem)' /* 375px - 1024px */,

  'fs-b-xxs': '0.625rem',
  'fs-b-xs': '0.75rem',
  'fs-b-sm': '0.875rem',
  'fs-b-rg': '1rem',
  'fs-b-lg': '1.125rem',
  'fs-b-xl': '1.25rem',
  'fs-b-xxl': '1.5rem',

  /* Sizing */
  'br-sm': '4px',
  'br-rg': '6px',
  'br-circle': '100%',

  /* Transition */
  'ts-hover': 'all 0.2s cubic-bezier(0.39, 0.575, 0.565, 1)',
}

export const ThemeColors = {
  yellowDark: 'yellow-dark',
  yellow: 'yellow',
  yellowLight: 'yellow-light',

  purpleDark: 'purple-dark',
  purple: 'purple',
  purpleLight: 'purple-light',

  baseTitle: 'base-title',
  baseSubtitle: 'base-subtitle',
  baseText: 'base-text',
  baseLabel: 'base-label',
  baseHover: 'base-hover',
  baseButton: 'base-button',
  baseInput: 'base-input',
  baseCard: 'base-card',

  background: 'background',
  white: 'white',
} as const

export const ThemeTypography = {
  ffHeading: 'ff-heading',
  ffBody: 'ff-body',
  lhHeading: 'lh-heading',
  lhBody: 'lh-body',
  fwRg: 'fw-rg',
  fwBd: 'fw-bd',
  fwXbd: 'fw-xbd',
  fsHSm: 'fs-h-sm',
  fsHRg: 'fs-h-rg',
  fsHLg: 'fs-h-lg',
  fsHXl: 'fs-h-xl',
  fsBXxs: 'fs-b-xxs',
  fsBXs: 'fs-b-xs',
  fsBSm: 'fs-b-sm',
  fsBRg: 'fs-b-rg',
  fsBLg: 'fs-b-lg',
  fsBXl: 'fs-b-xl',
  fsBXxl: 'fs-b-xxl',
} as const

export const ThemeSizing = {
  brSm: 'br-sm',
  brRg: 'br-rg',
  brCircle: 'br-circle',
} as const

export const ThemeTransition = {
  tsHover: 'ts-hover',
} as const
