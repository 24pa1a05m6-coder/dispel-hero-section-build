'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ondaHtml } from './onda-content'
import './onda.css'

export function OndaExperience() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.config({ ignoreMobileResize: true })

    const container = containerRef.current
    if (!container) return

    // Context for scoped GSAP animations and clean teardown
    const ctx = gsap.context(() => {
      // 1. Navigation menu script
      const nav = container.querySelector('#navigation')
      if (nav) {
        const toggle = nav.querySelector<HTMLButtonElement>('.nav__menu')
        const menu = nav.querySelector<HTMLElement>('.menu')
        const close = menu?.querySelector<HTMLButtonElement>('.menu__close')

        const setOpen = (open: boolean) => {
          if (!menu || !toggle) return
          menu.hidden = !open
          toggle.setAttribute('aria-expanded', String(open))
          if (open) {
            close?.focus()
          } else {
            toggle.focus()
          }
        }

        toggle?.addEventListener('click', () => setOpen(true))
        close?.addEventListener('click', () => setOpen(false))

        menu?.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') setOpen(false)
          if (event.key !== 'Tab') return
          const items = [...menu.querySelectorAll<HTMLElement>('a, button')]
          const first = items[0]
          const last = items[items.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
          }
        })

        menu?.querySelectorAll('a').forEach((link) =>
          link.addEventListener('click', () => {
            if (menu) menu.hidden = true
            toggle?.setAttribute('aria-expanded', 'false')
          })
        )
      }

      // 2. Hero observer
      const hero = container.querySelector('#hero')
      let heroObserver: IntersectionObserver | null = null
      if (hero && 'IntersectionObserver' in window) {
        heroObserver = new IntersectionObserver(([entry]) => {
          hero.classList.toggle('is-offscreen', !entry.isIntersecting)
        })
        heroObserver.observe(hero)
      }

      // Helper functions
      const layoutBox = (element: HTMLElement) => {
        let x = 0
        let y = 0
        let node: HTMLElement | null = element
        while (node) {
          x += node.offsetLeft
          y += node.offsetTop
          node = node.offsetParent as HTMLElement | null
        }
        return {
          x,
          y,
          w: element.offsetWidth,
          h: element.offsetHeight,
          cx: x + element.offsetWidth / 2,
          cy: y + element.offsetHeight / 2,
        }
      }

      const splitWords = (element: HTMLElement) => {
        const original = element.innerHTML
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
        const nodes: Node[] = []
        while (walker.nextNode()) nodes.push(walker.currentNode)
        nodes.forEach((node) => {
          const fragment = document.createDocumentFragment()
          node.textContent?.split(/(\s+)/).forEach((part) => {
            if (!part) return
            if (/^\s+$/.test(part)) {
              fragment.append(part)
              return
            }
            const word = document.createElement('span')
            word.className = 'ink__word'
            word.textContent = part
            fragment.append(word)
          })
          node.parentNode?.replaceChild(fragment, node)
        })
        return () => {
          element.innerHTML = original
        }
      }

      const effects = {
        rise(element: HTMLElement, vars = {}) {
          const dot = element.querySelector('.m-dot')
          const timeline = gsap.timeline(vars)
          timeline.fromTo(
            element,
            { yPercent: 38, clipPath: 'inset(0% -6% 100% -6%)' },
            {
              yPercent: 0,
              clipPath: 'inset(-30% -6% -30% -6%)',
              duration: 0.95,
              ease: 'expo.out',
              clearProps: 'clipPath,transform',
            },
            0
          )
          if (dot) {
            timeline.fromTo(
              dot,
              { scale: 0, yPercent: -260 },
              {
                scale: 1,
                yPercent: 0,
                duration: 0.75,
                ease: 'back.out(2.2)',
                clearProps: 'transform',
              },
              0.42
            )
          }
          return timeline
        },
        ink(element: HTMLElement, vars = {}) {
          const words = element.querySelectorAll('.ink__word')
          return gsap
            .timeline(vars)
            .fromTo(words, { opacity: 0.16 }, { opacity: 1, duration: 0.3, stagger: 0.06, ease: 'none' })
        },
        iris(element: HTMLElement, vars = {}) {
          const image = element.querySelector('img')
          const timeline = gsap.timeline(vars)
          timeline.fromTo(
            element,
            { clipPath: 'circle(0% at 50% 50%)' },
            { clipPath: 'circle(75% at 50% 50%)', duration: 1.15, ease: 'expo.inOut', clearProps: 'clipPath' },
            0
          )
          if (image) {
            timeline.fromTo(image, { scale: 1.2 }, { scale: 1, duration: 1.5, ease: 'expo.out', clearProps: 'transform' }, 0.15)
          }
          return timeline
        },
      }

      const adjacent = (a: string, b: string) => {
        const order = [...container.querySelectorAll<HTMLElement>('[data-8b-section]')]
          .filter((section) => section.getAttribute('data-8b-section') !== 'navigation')
          .map((section) => section.id)
        return order.indexOf(a) >= 0 && order[order.indexOf(a) + 1] === b
      }

      // prefers-reduced-motion check
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const inkReverts: (() => void)[] = []
        container.querySelectorAll<HTMLElement>('[data-8b-section]').forEach((section) => {
          const bound = (name: string) => [...section.querySelectorAll<HTMLElement>(`[data-8b-motion~="${name}"]`)]
          const rise = bound('rise')
          const ink = bound('ink')
          const iris = bound('iris')

          rise.forEach((element, index) => {
            ScrollTrigger.create({
              id: `effect:rise:${section.id}:${index}`,
              trigger: element,
              start: 'top 88%',
              once: true,
              animation: effects.rise(element, { paused: true }),
            })
          })

          ink.forEach((element, index) => {
            const revert = splitWords(element)
            inkReverts.push(revert)
            ScrollTrigger.create({
              id: `effect:ink:${section.id}:${index}`,
              trigger: element,
              start: 'top 88%',
              end: 'bottom 68%',
              scrub: 0.4,
              animation: effects.ink(element),
            })
          })

          iris.forEach((element, index) => {
            ScrollTrigger.create({
              id: `effect:iris:${section.id}:${index}`,
              trigger: element,
              start: 'top 86%',
              once: true,
              animation: effects.iris(element, { paused: true }),
            })
          })
        })

        // Scene: Hero (if adjacent to statement)
        if (adjacent('hero', 'statement')) {
          const heroEl = container.querySelector<HTMLElement>('#hero')
          const target = container.querySelector<HTMLElement>('#statement .statement__dot')
          const aperture = heroEl?.querySelector<HTMLElement>('.hero__aperture')
          if (heroEl && target && aperture) {
            const geometry = () => {
              const from = layoutBox(aperture)
              const to = layoutBox(target)
              return { x: to.cx - from.cx, y: to.cy - from.cy, scale: to.w / from.w }
            }
            gsap
              .timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                  id: 'hero:exit',
                  trigger: heroEl,
                  start: 'bottom bottom',
                  end: 'bottom 30%',
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              })
              .to(aperture, { x: () => geometry().x, y: () => geometry().y, ease: 'power1.inOut', duration: 1 }, 0)
              .to(aperture, { scale: () => geometry().scale, ease: 'power3.in', duration: 1 }, 0)
              .to(heroEl.querySelector('.hero__tint'), { opacity: 1, ease: 'power2.in', duration: 0.6 }, 0.4)
              .to(heroEl.querySelector('.hero__orbit'), { opacity: 0, duration: 0.3 }, 0)
              .to(
                heroEl.querySelector('.hero__word'),
                {
                  xPercent: () => (matchMedia('(min-width: 900px) and (orientation: landscape)').matches ? -14 : 0),
                  ease: 'power1.in',
                  duration: 1,
                },
                0
              )
              .to(heroEl.querySelector('.hero__intro'), { y: -70, ease: 'power1.in', duration: 1 }, 0)
          }
        }

        // Scene: Statement
        const statement = container.querySelector<HTMLElement>('#statement')
        if (statement) {
          const lines = statement.querySelectorAll('.statement__line')
          if (adjacent('hero', 'statement')) {
            gsap
              .timeline({
                defaults: { ease: 'none' },
                scrollTrigger: { id: 'statement:entry', trigger: statement, start: 'top bottom', end: 'top 30%', scrub: true },
              })
              .fromTo(lines, { yPercent: 85, xPercent: (index) => (index ? 9 : -6) }, { yPercent: 0, xPercent: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' }, 0)
              .fromTo(statement.querySelector('.statement__dot'), { scale: 0 }, { scale: 1, duration: 0.1 }, 0.9)
          }
          const items = statement.querySelectorAll('.statement__index li')
          gsap.from(items, {
            yPercent: 70,
            opacity: 0,
            duration: 0.8,
            stagger: 0.07,
            ease: 'expo.out',
            scrollTrigger: { id: 'statement:index', trigger: statement.querySelector('.statement__index'), start: 'top 85%', once: true },
          })
        }

        // Scene: Work (Horizontal sliding cards)
        const work = container.querySelector<HTMLElement>('#work')
        if (work) {
          const track = work.querySelector<HTMLElement>('.work__track')
          const frame = work.querySelector<HTMLElement>('.work__window')
          const stage = work.querySelector<HTMLElement>('.work__stage')
          if (track && stage && frame) {
            work.classList.add('is-track')
            const run = () => Math.max(0, track.offsetWidth - (work.clientWidth - 2 * parseFloat(getComputedStyle(stage).paddingLeft)))
            const setRun = () => work.style.setProperty('--run', `${Math.round(run())}px`)
            setRun()
            ScrollTrigger.addEventListener('refreshInit', setRun)

            gsap.fromTo(
              work.querySelector('.work__plate'),
              { clipPath: 'inset(0% 3.2% 0% 3.2% round 44px)' },
              {
                clipPath: 'inset(0% 0% 0% 0% round 0px)',
                ease: 'power1.out',
                scrollTrigger: { id: 'work:plate', trigger: work, start: 'top bottom', end: 'top 15%', scrub: true },
              }
            )

            const timeline = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: { id: 'work', trigger: work, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true },
            })
            timeline.to(track, { x: () => -run() }, 0)
            work.querySelectorAll<HTMLElement>('.case__img').forEach((image) => timeline.fromTo(image, { xPercent: -5 }, { xPercent: 5 }, 0))

            if (adjacent('work', 'again')) {
              const cases = [...track.querySelectorAll<HTMLElement>('.case')]
              const radius = () => (innerWidth < 700 ? innerWidth * 2.1 : innerWidth * 0.95)
              const bend = (card: HTMLElement) => {
                const offset = layoutBox(frame).x + card.offsetLeft + card.offsetWidth / 2 - run() - innerWidth / 2
                const angle = offset / radius()
                return { x: radius() * Math.sin(angle) - offset, y: radius() * (1 - Math.cos(angle)), rotation: (angle * 180) / Math.PI }
              }
              const exit = gsap.timeline({
                defaults: { ease: 'power1.in' },
                scrollTrigger: { id: 'work:exit', trigger: work, start: 'bottom bottom', end: 'bottom 30%', scrub: true, invalidateOnRefresh: true },
              })
              exit.to(frame, { x: () => -innerWidth * 0.2, duration: 1 }, 0)
              cases.forEach((card) =>
                exit.to(card, { x: () => bend(card).x, y: () => bend(card).y, rotation: () => bend(card).rotation, duration: 1 }, 0)
              )
            }
          }
        }

        // Scene: Again (Revolving partner wheel)
        const again = container.querySelector<HTMLElement>('#again')
        if (again) {
          const stage = again.querySelector<HTMLElement>('.again__stage')
          const head = again.querySelector<HTMLElement>('.again__head')
          const swing = again.querySelector<HTMLElement>('.again__swing')
          const wheel = again.querySelector<HTMLElement>('.again__wheel')
          const cards = [...wheel?.querySelectorAll<HTMLElement>('.partner') || []]
          if (stage && head && swing && wheel) {
            again.classList.add('is-wheel')
            cards.forEach((card, index) => card.style.setProperty('--i', String(index)))
            let step = 0
            let arcTop = 0
            let radius = 1
            const measure = () => {
              const width = innerWidth
              const height = stage.offsetHeight
              const headBottom = head.offsetTop + head.offsetHeight
              const room = height - headBottom - innerHeight * 0.04
              const card = Math.max(180, Math.min(width * (width < 700 ? 0.7 : 0.28), (room - 32) / 1.25))
              arcTop = headBottom + Math.max(28, (room - card * 1.25) * 0.4)
              radius = Math.max(width * 0.95, card * 3.3)
              step = 2 * Math.asin((card + Math.max(18, width * 0.024)) / (2 * radius)) * 180 / Math.PI
              again.style.setProperty('--card', `${card.toFixed(1)}px`)
              again.style.setProperty('--radius', `${radius.toFixed(1)}px`)
              again.style.setProperty('--step', `${step.toFixed(3)}deg`)
              again.style.setProperty('--arc-top', `${arcTop.toFixed(1)}px`)
              again.style.setProperty('--spin', `${Math.round(cards.length * innerHeight * 0.42)}px`)
            }
            measure()
            ScrollTrigger.addEventListener('refreshInit', measure)
            gsap.fromTo(
              wheel,
              { rotation: () => step * 0.55 },
              { rotation: () => -(cards.length - 0.45) * step, ease: 'none', scrollTrigger: { id: 'again', trigger: again, start: 'top 30%', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } }
            )
            if (adjacent('work', 'again')) {
              gsap
                .timeline({
                  defaults: { ease: 'none' },
                  scrollTrigger: { id: 'again:entry', trigger: again, start: 'top bottom', end: 'top 30%', scrub: true, invalidateOnRefresh: true },
                })
                .fromTo(
                  swing,
                  { rotation: () => Math.max(4, (Math.asin(Math.min(1, (innerWidth * 0.3) / radius)) * 180) / Math.PI - step * 0.55) },
                  { rotation: 0, ease: 'power1.out' },
                  0
                )
                .fromTo(swing, { y: () => -(arcTop - 40) }, { y: 0, ease: 'power2.in' }, 0)
                .fromTo(head, { yPercent: 45 }, { yPercent: 0, ease: 'power2.out' }, 0)
            }
          }
        }

        // Scene: Capabilities (Service cards stacking)
        const capabilities = container.querySelector<HTMLElement>('#capabilities')
        if (capabilities) {
          const cards = [...capabilities.querySelectorAll<HTMLElement>('.service')]
          capabilities.classList.add('is-deck')
          cards.forEach((card, index) => card.style.setProperty('--i', String(index)))
          cards.forEach((card, index) => {
            const next = cards[index + 1]
            if (!next) return
            gsap
              .timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                  id: `capabilities:${index}`,
                  trigger: next,
                  start: 'top bottom',
                  end: () => `top ${parseFloat(getComputedStyle(next).top) || 0}px`,
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              })
              .to(card, { scale: 0.9 }, 0)
              .to(card.querySelector('.service__shade'), { opacity: 0.55 }, 0)
          })
        }

        // Scene: Method (Interactive SVG circle arc)
        const method = container.querySelector<HTMLElement>('#method')
        if (method) {
          const steps = [...method.querySelectorAll<HTMLElement>('.step')]
          const stations = [...method.querySelectorAll<HTMLElement>('.method__station')]
          method.classList.add('is-cycle')
          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { id: 'method', trigger: method.querySelector('.method__steps'), start: 'top 62%', end: 'bottom 62%', scrub: true },
          })
          timeline
            .fromTo(method.querySelector('.method__arc'), { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 1 }, 0)
            .fromTo(method.querySelector('.method__arm'), { rotation: 0 }, { rotation: 360, duration: 1 }, 0)
          steps.forEach((step, index) => {
            const at = index / steps.length
            timeline.fromTo(step, { opacity: 0.2 }, { opacity: 1, duration: 0.07 }, Math.max(0, at - 0.03))
            if (stations[index]) {
              timeline.fromTo(stations[index], { scale: 0.4 }, { scale: 1.35, duration: 0.05, ease: 'back.out(3)' }, at).to(stations[index], { scale: 1, duration: 0.08 }, at + 0.06)
            }
          })
        }

        // Scene: Studio (Collage dealing out)
        const collage = container.querySelector<HTMLElement>('#studio .studio__collage')
        if (collage) {
          const shots = [...collage.querySelectorAll<HTMLElement>('.shot')]
          const tilt = [-8, 6, -4, 9, -6]
          const offset = (shot: HTMLElement, axis: 'x' | 'y') => {
            const centre = axis === 'x' ? collage.offsetWidth / 2 : Math.min(collage.offsetHeight / 2, innerHeight * 0.45)
            const own = axis === 'x' ? shot.offsetLeft + shot.offsetWidth / 2 : shot.offsetTop + shot.offsetHeight / 2
            return centre - own
          }
          const timeline = gsap.timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: { id: 'studio', trigger: collage, start: 'top 82%', end: () => (innerWidth < 900 ? 'top 10%' : 'center 55%'), scrub: true, invalidateOnRefresh: true },
          })
          shots.forEach((shot, index) =>
            timeline.fromTo(
              shot,
              { x: () => offset(shot, 'x'), y: () => offset(shot, 'y'), rotation: tilt[index % tilt.length], scale: 0.66 },
              { x: 0, y: 0, rotation: 0, scale: 1, duration: 1 },
              (shots.length - 1 - index) * 0.08
            )
          )
        }

        // Scene: Journal (Iris photo reveal)
        const journal = container.querySelector<HTMLElement>('#journal')
        if (journal) {
          const shots = [...journal.querySelectorAll<HTMLElement>('.journal__shot')]
          const stories = [...journal.querySelectorAll<HTMLElement>('.story')]
          journal.classList.add('is-swap')
          stories.forEach((story, index) => {
            const timeline = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: { id: `journal:${index}`, trigger: story, start: 'top 84%', end: 'top 50%', scrub: true },
            })
            timeline.fromTo(story, { opacity: 0.25 }, { opacity: 1, duration: 0.8 }, 0)
            if (index && shots[index]) {
              timeline.fromTo(shots[index], { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', ease: 'power1.inOut', duration: 1 }, 0)
            }
          })
        }

        // Scene: Contact (Voice title scale)
        const contact = container.querySelector<HTMLElement>('#contact')
        if (contact) {
          const voice = contact.querySelector<HTMLElement>('.contact__voice')
          if (voice) {
            gsap
              .timeline({
                defaults: { ease: 'none' },
                scrollTrigger: { id: 'contact', trigger: contact, start: 'top bottom', end: 'top 15%', scrub: true },
              })
              .fromTo(voice, { fontWeight: 400, scale: 0.82, transformOrigin: '0% 100%' }, { fontWeight: 800, scale: 1, duration: 1 }, 0)
              .fromTo(contact.querySelector('.contact__title .m-dot'), { scale: 0, yPercent: -400 }, { scale: 1, yPercent: 0, duration: 0.25, ease: 'power2.in' }, 0.75)
          }
        }

        // Scene: Footer (Aperture scale from dot)
        const footer = container.querySelector<HTMLElement>('#footer')
        if (footer) {
          const aperture = footer.querySelector<HTMLElement>('.footer__aperture')
          const period = footer.querySelector<HTMLElement>('.footer__period')
          const bye = footer.querySelector<HTMLElement>('.footer__bye')
          if (aperture && period && bye) {
            const dot = () => period.offsetWidth / aperture.offsetWidth
            gsap
              .timeline({
                defaults: { ease: 'none' },
                scrollTrigger: { id: 'footer', trigger: bye, start: 'bottom bottom', end: 'bottom 55%', scrub: true, invalidateOnRefresh: true },
              })
              .fromTo(aperture, { scale: dot }, { scale: 1, ease: 'power2.inOut', duration: 1 }, 0)
              .fromTo(footer.querySelector('.footer__tint'), { opacity: 1 }, { opacity: 0, duration: 0.5 }, 0.45)
              .fromTo(footer.querySelector('.footer__word'), { yPercent: 30 }, { yPercent: 0, ease: 'power2.out', duration: 0.8 }, 0)
          }
        }

        return () => {
          inkReverts.forEach((revert) => revert())
        }
      })

      // Form validation listeners
      const contactForm = container.querySelector<HTMLFormElement>('#contact .contact__form')
      const contactStatus = contactForm?.querySelector<HTMLElement>('.contact__status')
      const handleContactSubmit = (event: Event) => {
        event.preventDefault()
        if (!contactForm || !contactStatus) return
        const ok = contactForm.checkValidity()
        contactStatus.textContent = ok ? contactStatus.dataset.success || 'Sent' : contactStatus.dataset.error || 'Error'
        if (ok) contactForm.reset()
        else contactForm.querySelector<HTMLInputElement>(':invalid')?.focus()
      }
      contactForm?.addEventListener('submit', handleContactSubmit)

      const footerForm = container.querySelector<HTMLFormElement>('#footer .footer__news')
      const footerNote = footerForm?.querySelector<HTMLElement>('.footer__note')
      const handleFooterSubmit = (event: Event) => {
        event.preventDefault()
        if (!footerForm || !footerNote) return
        const ok = footerForm.checkValidity()
        footerNote.textContent = ok ? footerNote.dataset.success || 'Subscribed' : footerNote.dataset.error || 'Error'
        if (ok) footerForm.reset()
      }
      footerForm?.addEventListener('submit', handleFooterSubmit)

      const footerEl = container.querySelector<HTMLElement>('#footer')
      let footerObserver: IntersectionObserver | null = null
      if (footerEl && 'IntersectionObserver' in window) {
        footerObserver = new IntersectionObserver(([entry]) => {
          footerEl.classList.toggle('is-offscreen', !entry.isIntersecting)
        })
        footerObserver.observe(footerEl)
      }

      // Refresh ScrollTrigger
      ScrollTrigger.refresh()
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="onda-experience m-text w-full"
      dangerouslySetInnerHTML={{ __html: ondaHtml }}
    />
  )
}

export default OndaExperience
