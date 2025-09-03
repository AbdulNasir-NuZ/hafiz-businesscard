"use client"

import type React from "react"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CardFlipProps {
  frontContent: ReactNode
  backContent: ReactNode
  isFlipped: boolean
  onFlip: () => void
  clickToFlip?: boolean
  autoFlipMs?: number
}

export function CardFlip({
  frontContent,
  backContent,
  isFlipped,
  onFlip,
  clickToFlip = false,
  autoFlipMs,
}: CardFlipProps) {
  const [isFlipping, setIsFlipping] = useState(false)
  const [cardHeight, setCardHeight] = useState<number | null>(null)

  const frontCardRef = useRef<HTMLDivElement>(null)
  const backCardRef = useRef<HTMLDivElement>(null)

  // Update card height based on content
  useEffect(() => {
    const updateHeight = () => {
      if (isFlipped) {
        if (backCardRef.current) {
          const backContentHeight = backCardRef.current.scrollHeight
          setCardHeight(backContentHeight)
        }
      } else {
        if (frontCardRef.current) {
          const frontContentHeight = frontCardRef.current.scrollHeight
          setCardHeight(frontContentHeight)
        }
      }
    }

    updateHeight()

    const resizeObserver = new ResizeObserver(() => {
      updateHeight()
    })

    if (frontCardRef.current) resizeObserver.observe(frontCardRef.current)
    if (backCardRef.current) resizeObserver.observe(backCardRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [isFlipped])

  const handleFlip = () => {
    setIsFlipping(true)
    if (!isFlipped && frontCardRef.current) {
      setCardHeight(frontCardRef.current.scrollHeight)
    } else if (isFlipped && backCardRef.current) {
      setCardHeight(backCardRef.current.scrollHeight)
    }
    setTimeout(() => {
      onFlip()
    }, 200)
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if (!clickToFlip) return
    const target = e.target as HTMLElement | null
    if (target) {
      const interactive = target.closest("a,button,input,textarea,select,label,[data-prevent-flip]")
      if (interactive) return
    }
    handleFlip()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!clickToFlip) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleFlip()
    }
  }

  useEffect(() => {
    if (!autoFlipMs || autoFlipMs <= 0) return
    const id = setInterval(() => {
      handleFlip()
    }, autoFlipMs)
    return () => clearInterval(id)
  }, [autoFlipMs, isFlipped])

  return (
    <div className="perspective">
      <div
        className={cn(
          "card-flip-container relative transition-transform duration-400 transform-style-3d",
          isFlipping && "is-flipping",
          isFlipped ? "flipped" : "",
        )}
        style={{ height: cardHeight ? `${cardHeight}px` : "auto" }}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        role={clickToFlip ? "button" : undefined}
        tabIndex={clickToFlip ? 0 : undefined}
        aria-pressed={clickToFlip ? isFlipped : undefined}
        aria-label={clickToFlip ? "Flip business card" : undefined}
      >
        {/* Front side */}
        <div
          ref={frontCardRef}
          className={cn(
            "absolute w-full backface-hidden transition-all duration-400",
            isFlipped ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
        >
          {frontContent}
        </div>

        {/* Back side */}
        <div
          ref={backCardRef}
          className={cn(
            "absolute w-full backface-hidden transition-all duration-400 rotateY-180",
            isFlipped ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          {backContent}
        </div>
      </div>
    </div>
  )
}
