import React, { useState } from 'react'

interface Position {
  x: number
  y: number
}

const EditDrag = ({ children }: { children: JSX.Element }) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    const initialX = e.clientX - position.x
    const initialY = e.clientY - position.y

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - initialX > 0 ? e.clientX - initialX : 0,
        y: e.clientY - initialY > 0 ? e.clientY - initialY : 0,
      })
    }

    document.addEventListener('mousemove', handleMouseMove)

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      className="w-96 bg-primary rounded-md fixed cursor-move z-50 p-4"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  )
}

export default EditDrag
