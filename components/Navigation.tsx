'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const links = [
  ['Work', '#work'],
  ['About', '#about'],
  ['Playground', '#playground'],
  ['Resource', '#resource'],
]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <motion.nav
      className="capsule-nav"
      aria-label="Primary navigation"
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="capsule-logo" href="/" aria-label="Dispel home">d</a>
      <div className="capsule-links">
        {links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
      </div>
      <a className="capsule-email" href="mailto:hello@dispel.solutions">hello@dispel.solutions</a>
      <button className="capsule-toggle" type="button" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}><span /><span /></button>
      <AnimatePresence>
        {mobileOpen && <motion.div className="capsule-mobile-menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          {links.map(([label, href]) => <a href={href} key={label} onClick={() => setMobileOpen(false)}>{label}</a>)}
          <a className="capsule-mobile-email" href="mailto:hello@dispel.solutions" onClick={() => setMobileOpen(false)}>hello@dispel.solutions</a>
        </motion.div>}
      </AnimatePresence>
    </motion.nav>
  )
}
