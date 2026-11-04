'use client'

import { useState } from 'react'

type InteractiveWordProps = {
  word?: string
  className?: string
  replacementWords?: string[]
}

export function InteractiveWord({
  word = 'dispel',
  className = '',
  replacementWords = [],
}: InteractiveWordProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const letters = Array.from(word)
  const activeLetter = activeIndex === null ? null : letters[activeIndex]
  const replacement = activeLetter
    ? replacementWords.find((candidate) => candidate.includes(activeLetter))
    : undefined
  const anchorIndex = replacement && activeLetter ? replacement.indexOf(activeLetter) : -1

  return (
    <span
      className={`interactive-word ${className}`}
      aria-label={word}
      onMouseLeave={() => setActiveIndex(null)}
    >
      {replacement && activeIndex !== null ? (
        <>
          <span className="interactive-segment" aria-hidden="true">
            {replacement.slice(0, anchorIndex)}
          </span>
          <span
            className="interactive-letter interactive-letter--anchor"
            data-letter={activeLetter}
            data-index={activeIndex}
            onMouseEnter={() => setActiveIndex(activeIndex)}
          >
            {activeLetter}
          </span>
          <span className="interactive-segment" aria-hidden="true">
            {replacement.slice(anchorIndex + 1)}
          </span>
        </>
      ) : (
        letters.map((character, index) => (
          <span
            className="interactive-letter"
            data-letter={character}
            data-index={index}
            key={`${character}-${index}`}
            onMouseEnter={() => setActiveIndex(index)}
          >
            {character}
          </span>
        ))
      )}
    </span>
  )
}
