'use client'

import { useEffect, useRef, useState } from 'react'

const services = [
  ['Web Development', '/web-development'],
  ['App Development', '/app-development'],
  ['Social Media Management', '/social-media-management'],
  ['Photography', '/photography'],
  ['Videography', '/videography'],
  ['AI Automations', '/ai-automations'],
  ['SEO', '/seo'],
]

const links = ['Work', 'About', 'Contact']

export function Navigation() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <ul>
        {links.slice(0, 1).map((link) => <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>)}
        <li><a href="#about">About</a></li>
        <li
          className="services-trigger"
          ref={menuRef}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((value) => !value)}>
            Services <span aria-hidden="true">↓</span>
          </button>
          <div className={`services-dropdown${open ? ' services-dropdown--open' : ''}`}>
            {services.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}
          </div>
        </li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}
