const services = [['Web Development', '/web-development'], ['App Development', '/app-development'], ['Social Media Management', '/social-media-management'], ['Photography', '/photography'], ['Videography', '/videography'], ['AI Automations', '/ai-automations'], ['SEO', '/seo']]

export function Footer() {
  const year = new Date().getFullYear()
  return <footer className="global-footer" id="footer-contact">
    <section className="footer-contact"><p className="footer-eyebrow">Start a conversation</p><h2>Have a project in mind?<br /><em>Let&apos;s make something meaningful.</em></h2><p>From digital products and creative content to intelligent automation, we&apos;re ready to help turn your ideas into reality.</p><div className="footer-actions"><a className="footer-button footer-button-dark" href="mailto:hello@dispel.solutions">Start a Project ↗</a><a className="footer-button" href="mailto:hello@dispel.solutions">Get in Touch</a></div></section>
    <div className="footer-columns"><div><p className="footer-label">Brand</p><strong className="footer-logo">dispel.solutions</strong><p className="footer-copy">Independent digital studio for ambitious ideas.</p><a href="#instagram">Instagram</a><a href="#linkedin">LinkedIn</a></div><div><p className="footer-label">Explore</p><a href="/">Home</a><a href="#about">About</a><a href="#motive">Motive</a><a href="#services">Services</a></div><div><p className="footer-label">Our Services</p>{services.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div><div><p className="footer-label">Contact</p><a href="mailto:hello@dispel.solutions">hello@dispel.solutions</a><p className="footer-placeholder">Phone and location details coming soon.</p></div></div>
    <div className="footer-bottom"><span>© {year} dispel.solutions</span><span><a href="#privacy">Privacy Policy</a><a href="#terms">Terms &amp; Conditions</a></span></div>
  </footer>
}
