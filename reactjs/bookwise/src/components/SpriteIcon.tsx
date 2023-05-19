export interface SpriteIconProps {
  name: 'rocket' | 'github' | 'google' | 'hamburger'
  size?: number
  viewBox?: string
}

export function SpriteIcon({
  name,
  size = 32,
  viewBox = '0 0 32 32',
}: SpriteIconProps) {
  if (name.toString() === 'hamburger') {
    return hamburger()
  }

  return (
    <svg width={size} height={size} viewBox={viewBox} className="sprite-icon">
      <use xlinkHref={`/icons.svg#${name}`}></use>
    </svg>
  )
}

SpriteIcon.toString = () => '.sprite-icon'

function hamburger() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.5"
        y="3"
        width="21"
        height="3"
        rx="2"
        fill="url(#paint0_linear_2273_2190)"
        className="lane top"
      />
      <rect
        x="1.5"
        y="10"
        width="21"
        height="3"
        rx="2"
        fill="url(#paint0_linear_2273_2190)"
        className="lane mid"
      />
      <rect
        x="1.5"
        y="17"
        width="21"
        height="3"
        rx="2"
        fill="url(#paint0_linear_2273_2190)"
        className="lane bot"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2273_2190"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7FD1CC" />
          <stop offset="1" stopColor="#9694F5" />
        </linearGradient>
      </defs>
    </svg>
  )
}
