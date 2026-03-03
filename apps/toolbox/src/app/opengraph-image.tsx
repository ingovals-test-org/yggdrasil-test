import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'Almenni lífeyrissjóðurinn'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
export const runtime = 'edge'

export default function Image() {
  const primaryColor = '#193063' // Almenni primary blue
  const secondaryColor = '#2d4a7c' // Slightly lighter for gradient

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        position: 'relative',
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      }}
    >
      {/* Content */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Main Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Almenni-Lífsverk
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
            }}
          >
            lífeyrissjóðurinn
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  )
}
