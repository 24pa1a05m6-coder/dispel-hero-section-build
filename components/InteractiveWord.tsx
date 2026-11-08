'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

const replacementByIndex = ['design', 'pixels', 'assets', 'adspot', 'market', 'funnel']
const descriptions = [
  'Turning bold ideas into thoughtful visual experiences.',
  'Every pixel crafted to create a stronger digital presence.',
  'Building the creative assets that make brands recognizable.',
  'Creating memorable ad placements that put brands in front of the right audience.',
  'Connecting brands with the right people, at the right time.',
  'Turning meaningful interactions into measurable growth.',
]
const backgroundColors = ['#E9E1D5', '#DCE8F0', '#E5E8D8', '#F0DFD5', '#E8E1F0', '#DDE9E5']
const backgroundImages = ['/hero-design.png', '/hero-pixels.png', '/hero-assets.png', '/hero-adspot.png', '/hero-market.png', '/hero-funnel.png']
const ease = [0.22, 1, 0.36, 1] as const

export function InteractiveWord({ word = 'dispel', className = '' }: { word?: string; className?: string }) {
  const letters = Array.from(word)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    backgroundImages.forEach((src) => {
      const image = new Image()
      image.src = src
    })
  }, [])
  const replacement = activeIndex === null ? word : replacementByIndex[activeIndex]
  const renderedLetters = Array.from(replacement)
  const backgroundColor = activeIndex === null ? '#F3F0E8' : backgroundColors[activeIndex]
  const motionTransition = reducedMotion ? { duration: 0 } : { duration: 0.8, ease }

  const activate = (index: number) => setActiveIndex(index)
  const toggle = (index: number) => setActiveIndex((current) => (current === index ? null : index))

  return (
    <>
      <div className="interactive-image-layer" aria-hidden="true">
        {backgroundImages.map((src, index) => <motion.img className="interactive-hero-image" key={src} src={src} alt="" animate={{ opacity: activeIndex === index ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 1.05, ease }} />)}
      </div>
      <motion.div className="interactive-stage" aria-hidden="true" animate={{ backgroundColor }} transition={{ duration: reducedMotion ? 0 : 1.05, ease }} />
      <span className={`interactive-word ${className}`} aria-label={replacement} onMouseLeave={() => setActiveIndex(null)}>
        {renderedLetters.map((character, index) => {
          const isAnchor = activeIndex === index
          return <span className={`interactive-letter${isAnchor ? ' interactive-letter--anchor' : ''}`} data-letter={character} data-index={index} key={`slot-${index}`} onMouseEnter={() => activate(index)} onClick={() => toggle(index)} role="button" tabIndex={0} aria-label={`Letter ${character}, position ${index + 1}`} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(index) } }}>
            <AnimatePresence initial={false} mode="sync">
              <motion.span key={`${index}-${character}`} className="interactive-glyph" initial={reducedMotion ? false : { opacity: 0, x: index < (activeIndex ?? 3) ? -6 : 6, y: 4 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, x: index < (activeIndex ?? 3) ? 6 : -6, y: -4 }} transition={{ ...motionTransition, delay: reducedMotion ? 0 : index * 0.02 }}>
                {character}
              </motion.span>
            </AnimatePresence>
          </span>
        })}
      </span>
      <AnimatePresence initial={false} mode="wait">
        {activeIndex !== null && <motion.p className="interactive-description" key={replacement} initial={reducedMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -3 }} transition={{ duration: reducedMotion ? 0 : 0.52, ease }}>{descriptions[activeIndex]}</motion.p>}
      </AnimatePresence>
    </>
  )
}
