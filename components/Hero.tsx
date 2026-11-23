'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export interface WordStage {
  word: string
  color: string
  image?: string
}

export const WORD_STAGES: WordStage[] = [
  {
    word: 'dispel',
    color: '#dbbf99',
    image: undefined,
  },
  {
    word: 'design',
    color: '#E9E1D5',
    image: '/hero-design.png',
  },
  {
    word: 'pixels',
    color: '#DCE8F0',
    image: '/hero-pixels.png',
  },
  {
    word: 'assets',
    color: '#E5E8D8',
    image: '/hero-assets.png',
  },
  {
    word: 'adspot',
    color: '#F0DFD5',
    image: '/hero-adspot.png',
  },
  {
    word: 'market',
    color: '#E8E1F0',
    image: '/hero-market.png',
  },
  {
    word: 'funnel',
    color: '#DDE9E5',
    image: '/hero-funnel.png',
  },
]

// 6 columns, each containing the 7 characters across the word stages
const COLUMN_LETTERS: string[][] = [0, 1, 2, 3, 4, 5].map((colIdx) =>
  WORD_STAGES.map((stage) => stage.word[colIdx])
)

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  const stripRefs = useRef<(HTMLSpanElement | null)[]>([])
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    // Preload background images
    WORD_STAGES.forEach((stage) => {
      if (stage.image) {
        const img = new Image()
        img.src = stage.image
      }
    })

    const ctx = gsap.context(() => {
      const totalStages = WORD_STAGES.length // 7
      const totalTransitions = totalStages - 1 // 6
      const stepDuration = 1.0
      const stripTransDuration = 0.65
      const stripStagger = 0.045

      // Set initial positions
      stripRefs.current.forEach((strip) => {
        if (strip) gsap.set(strip, { yPercent: 0 })
      })

      if (stageRef.current) {
        gsap.set(stageRef.current, { backgroundColor: WORD_STAGES[0].color })
      }

      imgRefs.current.forEach((img) => {
        if (img) gsap.set(img, { opacity: 0 })
      })

      // Timeline for scrubbed kinetic strip roll
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
      })

      for (let step = 1; step <= totalTransitions; step++) {
        const stepTime = (step - 1) * stepDuration
        const targetPercent = -(step * (100 / totalStages))

        // 1. Roll the 6 column strips with a left-to-right staggered wave
        const validStrips = stripRefs.current.filter(Boolean)
        if (validStrips.length > 0) {
          tl.to(
            validStrips,
            {
              yPercent: targetPercent,
              duration: stripTransDuration,
              stagger: stripStagger,
              ease: 'power2.inOut',
            },
            stepTime
          )
        }

        // 2. Stage background color smoothly transitions
        if (stageRef.current) {
          tl.to(
            stageRef.current,
            {
              backgroundColor: WORD_STAGES[step].color,
              duration: 0.8,
              ease: 'power1.inOut',
            },
            stepTime
          )
        }

        // 3. Background images crossfade
        if (step > 1 && imgRefs.current[step - 2]) {
          tl.to(
            imgRefs.current[step - 2],
            {
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
            },
            stepTime
          )
        }

        if (imgRefs.current[step - 1]) {
          tl.fromTo(
            imgRefs.current[step - 1],
            { opacity: 0, scale: 1.05 },
            {
              opacity: 0.85,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
            },
            stepTime + 0.05
          )
        }
      }

      // Add resting hold at the final word (funnel)
      tl.set({}, {}, totalTransitions * stepDuration)

      // Pin the hero section with GSAP ScrollTrigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 4.5}`,
        pin: heroRef.current,
        scrub: 0.6,
        snap: {
          snapTo: 1 / totalTransitions,
          duration: { min: 0.25, max: 0.55 },
          delay: 0.12,
          ease: 'power2.out',
        },
        animation: tl,
      })
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div className="hero-scroll-container" ref={containerRef}>
      <main className="hero" ref={heroRef}>
        {/* Top-bar branding & CTA */}
        <span className="hero-caption" aria-hidden="true">dispel.solutions</span>
        <a className="site-cta" href="/get-started">Get started</a>

        {/* Dynamic Background Image Layers */}
        <div className="interactive-image-layer" aria-hidden="true">
          {WORD_STAGES.slice(1).map((stage, idx) => (
            <img
              key={stage.word}
              ref={(el) => {
                imgRefs.current[idx] = el
              }}
              src={stage.image}
              alt=""
              className="interactive-hero-image"
            />
          ))}
        </div>

        {/* Dynamic Background Color Stage */}
        <div
          ref={stageRef}
          className="interactive-stage"
          aria-hidden="true"
        />

        {/* Hero Center - Kinetic Typography */}
        <section className="hero-center" aria-label="Hero showcase">
          <div className="hero-words-container">
            <h1 className="hero-word-display" aria-label="dispel">
              {COLUMN_LETTERS.map((letters, colIdx) => (
                <span key={colIdx} className="hero-col-slot">
                  <span
                    ref={(el) => {
                      stripRefs.current[colIdx] = el
                    }}
                    className="hero-col-strip"
                  >
                    {letters.map((char, charIdx) => (
                      <span key={charIdx} className="hero-col-char">
                        {char}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>
          </div>
        </section>
      </main>
    </div>
  )
}
