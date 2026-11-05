const serviceLinks = [
  ['Web Development', '/web-development'], ['App Development', '/app-development'], ['Social Media Management', '/social-media-management'], ['Photography', '/photography'], ['Videography', '/videography'], ['AI Automations', '/ai-automations'], ['SEO', '/seo'],
]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="global-footer" id="global-footer">
      <section className="footer-cta" id="footer-contact">
        <p className="footer-eyebrow">Start a conversation</p>
        <h2>Have something in mind?<br /><em>Let&apos;s make it happen.</em></h2>
        <p>Have an idea, a project, or simply want to explore possibilities? We&apos;d love to hear from you.</p>
        <div className="footer-actions"><a className="footer-button footer-button-dark" href="mailto:hello@dispel.solutions">Start a Project <span aria-hidden="true">↗</span></a><a className="footer-button" href="mailto:hello@dispel.solutions">Get in Touch</a></div>
      </section>
      <div className="footer-columns">
        <div><p className="footer-label">Explore</p><a href="/">Home</a><a href="#about">About Us</a><a href="#work">Our Work</a><a href="#contact">Contact</a></div>
        <div><p className="footer-label">Our Services</p>{serviceLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div>
        <div><p className="footer-label">Connect</p><a href="#instagram">Instagram</a><a href="#linkedin">LinkedIn</a><a href="#facebook">Facebook</a><a href="#youtube">YouTube</a><a href="mailto:hello@dispel.solutions">Email</a></div>
        <div><p className="footer-label">Get In Touch</p><p className="footer-placeholder">Contact details coming soon.</p><p className="footer-placeholder">We&apos;re building something considered.</p></div>
      </div>
      <div className="footer-identity"><strong>dispel.solutions</strong><p>Independent digital marketing and development studio.</p></div>
      <div className="footer-bottom"><span>© {year} dispel.solutions</span><span><a href="#privacy">Privacy Policy</a><a href="#terms">Terms &amp; Conditions</a></span></div>
    </footer>
  )
}
