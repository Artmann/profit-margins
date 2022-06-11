import React, { ReactElement } from 'react'

interface LoadingOverlayProps {
  isLoading: boolean
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps): ReactElement | null {
  if (!isLoading) {
    return null
  }

  return (
    <div
      className={ `
        absolute bottom-0 left-0 right-0 top-0 z-50
        flex items-center justify-center
        text-2xl
      `}
      style={{
        backgroundColor: 'rgba(13, 13, 15, 0.85)'
      }}
    >
      Loading...
    </div>
  )
}
