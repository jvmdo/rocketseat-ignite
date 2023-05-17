export interface SpriteIconProps {
  name: 'rocket' | 'github' | 'google'
  size?: number
  viewBox?: string
}

export function SpriteIcon({
  name,
  size = 32,
  viewBox = '0 0 32 32',
}: SpriteIconProps) {
  return (
    <svg width={size} height={size} viewBox={viewBox} className="sprite-icon">
      <use xlinkHref={`/icons.svg#${name}`}></use>
    </svg>
  )
}

SpriteIcon.toString = () => '.sprite-icon'
