'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

const replacementByIndex = ['design', 'pixels', 'assets', 'coupon', 'market', 'funnel']
const descriptions = [
  'Turning bold ideas into thoughtful visual experiences.',
  'Every pixel crafted to create a stronger digital presence.',
  'Building the creative assets that make brands recognizable.',
  'Smart campaigns that turn attention into action.',
  'Connecting brands with the right people, at the right time.',
  'Turning meaningful interactions into measurable growth.',
]

const transitions = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as const,
}

type InteractiveWordProps = {
  word?: string
  className?: string
}

export function InteractiveWord({ word = 'dispel', className = '' }: InteractiveWordProps) {
  const letters = Array.from(word)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const replacement = activeIndex === null ? word : replacementByIndex[activeIndex]
  const prefix = activeIndex === null ? '' : replacement.slice(0, activeIndex)
  const anchor = activeIndex === null ? '' : replacement[activeIndex]
  const suffix = activeIndex === null ? '' : replacement.slice(activeIndex + 1)
  const visibleLetters = activeIndex === null ? letters : Array.from(prefix + anchor + suffix)

  return (
    <>
      <span
        className={`interactive-word ${className}`}
        aria-label={activeIndex === null ? word : replacement}
        onMouseLeave={() => setActiveIndex(null)}
      >
      {visibleLetters.map((character, index) => {
        const isAnchor = activeIndex === index
        return (
          <motion.span
            className={`interactive-letter${isAnchor ? ' interactive-letter--anchor' : ''}`}
            data-letter={character}
            data-index={index}
            key={`${activeIndex ?? 'base'}-${index}`}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            role="button"
            tabIndex={0}
            aria-label={`Letter ${character}, position ${index + 1}`}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setActiveIndex((current) => (current === index ? null : index))
              }
            }}
            layout="position"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={transitions}
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={`${activeIndex ?? 'base'}-${character}`}
                className="interactive-glyph"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={transitions}
              >
                {character}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        )
      })}
      </span>
      <AnimatePresence mode="wait">
        {activeIndex !== null && (
          <motion.p
            className="interactive-description"
            key={replacement}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            {descriptions[activeIndex]}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  )
}
