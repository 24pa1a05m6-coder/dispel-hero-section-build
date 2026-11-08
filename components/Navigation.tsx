'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const services = [
  ['Web Development', '/web-development'],
  ['App Development', '/app-development'],
  ['SEO', '/seo'],
  ['Social Media Management', '/social-media-management'],
]
const links = [['Work', '#work'], ['About', '#about'], ['Resource', '#resource']]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <motion.nav className="capsule-nav" aria-label="Primary navigation" initial={{ opacity: 0, y: 12, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .15, duration: .65, ease: [.22, 1, .36, 1] }}>
      <a className="capsule-logo" href="/" aria-label="Dispel home">dispel.solutions</a>
      <div className="capsule-links">
        {links.slice(0, 2).map(([label, href]) => <a href={href} key={label}>{label}</a>)}
        <div className="capsule-service-menu" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
          <button type="button" aria-expanded={servicesOpen} onClick={() => setServicesOpen((value) => !value)}>Services</button>
          <AnimatePresence>{servicesOpen && <motion.div className="capsule-service-dropdown" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: .22, ease: [.22, 1, .36, 1] }}>{services.map(([label, href]) => <a href={href} key={href} onClick={() => setServicesOpen(false)}>{label}</a>)}</motion.div>}</AnimatePresence>
        </div>
        <a href="#resource">Resource</a>
      </div>
      <a className="capsule-email" href="mailto:hello@dispel.solutions">hello@dispel.solutions</a>
      <button className="capsule-toggle" type="button" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}><span /><span /></button>
      <AnimatePresence>{mobileOpen && <motion.div className="capsule-mobile-menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: .3, ease: [.22, 1, .36, 1] }}>
        <a href="#work" onClick={() => setMobileOpen(false)}>Work</a><a href="#about" onClick={() => setMobileOpen(false)}>About</a>
        <details><summary>Services</summary><div>{services.map(([label, href]) => <a href={href} key={href} onClick={() => setMobileOpen(false)}>{label}</a>)}</div></details>
        <a href="#resource" onClick={() => setMobileOpen(false)}>Resource</a><a className="capsule-mobile-email" href="mailto:hello@dispel.solutions" onClick={() => setMobileOpen(false)}>hello@dispel.solutions</a>
      </motion.div>}</AnimatePresence>
    </motion.nav>
  )
}
