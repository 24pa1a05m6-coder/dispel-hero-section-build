const links = ['Work', 'About', 'Services', 'Contact']

export function Navigation() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <ul>
        {links.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`}>{link}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
