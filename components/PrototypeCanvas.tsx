'use client'

import { Button } from '@/node_modules/@mui/material/index'
import { useState } from 'react'

/**
 * PrototypeCanvas Component
 * 
 * Fills the available space inside the phone frame
 * Contains placeholder interaction to verify events
 * Built with Material UI for easy component expansion
 */
export default function PrototypeCanvas() {
  const [clickCount, setClickCount] = useState(0)
  const [lastClicked, setLastClicked] = useState<string | null>(null)

  const handleInteraction = (name: string) => {
    setClickCount((prev) => prev + 1)
    setLastClicked(name)
    console.log(`[Interaction] ${name} clicked - Total: ${clickCount + 1}`)
  }

  return (
    <div>
      <Button>Wow</Button>
    </div>
  )
}
