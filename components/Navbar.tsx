'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const services = [
  ['Web Development', '/web-development'],
  ['App Development', '/app-development'],
  ['Social Media Management', '/social-media-management'],
  ['Photography', '/photography'],
  ['Videography', '/videography'],
  ['AI Automations', '/ai-automations'],
  ['SEO', '/seo'],
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className={`global-nav${scrolled ? ' global-nav--scrolled' : ''}`}>
      <a className="global-brand" href="/" onClick={() => setMobileOpen(false)}>dispel.solutions</a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="#about">About</a>
        <div className="services-menu">
          <button aria-expanded={open} onClick={() => setOpen((value) => !value)}>Services <span aria-hidden="true">↓</span></button>
          <AnimatePresence>
            {open && <motion.div className="services-dropdown" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}>
              {services.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}
            </motion.div>}
          </AnimatePresence>
        </div>
        <a href="#work">Our Work</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="global-talk" href="#contact">Let&apos;s Talk <span aria-hidden="true">↗</span></a>
      <button className="mobile-toggle" aria-expanded={mobileOpen} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileOpen((value) => !value)}><span /><span /></button>
      <AnimatePresence>
        {mobileOpen && <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <a href="/" onClick={() => setMobileOpen(false)}>Home</a><a href="#about" onClick={() => setMobileOpen(false)}>About</a>
          <details><summary>Services</summary><div>{services.map(([label, href]) => <a href={href} key={href} onClick={() => setMobileOpen(false)}>{label}</a>)}</div></details>
          <a href="#work" onClick={() => setMobileOpen(false)}>Our Work</a><a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
          <a className="global-talk mobile-talk" href="#contact" onClick={() => setMobileOpen(false)}>Let&apos;s Talk <span aria-hidden="true">↗</span></a>
        </motion.nav>}
      </AnimatePresence>
    </header>
  )
}
