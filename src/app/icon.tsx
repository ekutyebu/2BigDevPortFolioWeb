import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #0ea5e9, #a855f7)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 900,
          borderRadius: '8px',
          fontFamily: 'sans-serif',
          boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.2)',
        }}
      >
        2B
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
