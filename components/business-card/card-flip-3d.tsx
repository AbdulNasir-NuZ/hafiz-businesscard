"use client"

import React from "react"

type CardFlip3DProps = {
  front: React.ReactNode
  back: React.ReactNode
  isFlipped: boolean
  onToggle: () => void
  autoFlipMs?: number
}

/**
 * A11y:
 * - role="button" and tabIndex={0} for keyboard focus
 * - Space/Enter toggles
 * Behavior:
 * - Click anywhere on the card to flip (ignores clicks on links/buttons)
 * - Optional auto flip via interval
 */
export function CardFlip3D({ front, back, isFlipped, onToggle, autoFlipMs = 60000 }: CardFlip3DProps) {
  React.useEffect(() => {
    if (!autoFlipMs) return
    const id = setInterval(() => onToggle(), autoFlipMs)
    return () => clearInterval(id)
  }, [autoFlipMs, onToggle])

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement
    if (target.closest("a, button")) return
    onToggle()
  }

  const handleKey: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <div
      className="relative mx-auto w-96 h-56 sm:w-[28rem] sm:h-[16rem] [perspective:1200px]"
      onClick={handleClick}
      onKeyDown={handleKey}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label="Flip business card"
    >
      <div
        className={[
          "relative size-full transition-transform duration-700 [transform-style:preserve-3d]",
          isFlipped ? "[transform:rotateY(180deg)]" : "",
        ].join(" ")}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]">{front}</div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">{back}</div>
      </div>
    </div>
  )
}
