'use client'

import { motion, useReducedMotion } from 'motion/react'

const buildItems = [
  ['01', 'Business Websites', 'Professional websites that establish credibility and build trust.'],
  ['02', 'Landing Pages', 'Conversion-focused pages designed to turn visitors into customers.'],
  ['03', 'E-commerce Websites', 'Scalable online stores with seamless shopping experiences.'],
  ['04', 'Portfolio Websites', 'Unique digital spaces that showcase your work.'],
  ['05', 'Custom Web Applications', 'Tailored web solutions built around your business requirements.'],
  ['06', 'CMS-Based Websites', 'Easy-to-manage websites with flexible content management.'],
]

const process = [
  ['01', 'Discovery', 'Understand your business, audience, and objectives.'],
  ['02', 'Strategy & Planning', 'Define the structure, features, and technical direction.'],
  ['03', 'Design', 'Create an intuitive and visually engaging user experience.'],
  ['04', 'Development', 'Build a responsive, scalable, and reliable website.'],
  ['05', 'Testing & Launch', 'Test performance, responsiveness, and functionality before deployment.'],
  ['06', 'Support & Growth', 'Provide ongoing improvements and technical support.'],
]

const technologyGroups = [
  ['Frontend', 'React', 'Next.js', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
  ['Backend', 'Node.js', 'Express.js'],
  ['Database', 'MongoDB', 'PostgreSQL', 'Firebase'],
  ['Deployment & Infrastructure', 'Vercel', 'Cloudflare', 'AWS'],
]

const projects = [
  ['Concept 01', 'Editorial commerce', 'A placeholder concept for a considered, conversion-ready storefront.', ['Next.js', 'Shopify']],
  ['Concept 02', 'Digital product', 'A placeholder concept for a focused product experience with room to grow.', ['React', 'PostgreSQL']],
]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function WebDevelopmentPage() {
  return (
    <main className="web-page">
      <section className="web-hero web-shell">
        <div className="web-hero-copy">
          <p className="eyebrow">Web development / 001</p>
          <h1>Websites that don&apos;t just look good. They work hard.</h1>
          <p className="web-lede">We design and develop high-performance, responsive, and scalable websites that turn ideas into impactful digital experiences.</p>
          <div className="web-actions">
            <a className="web-button web-button-dark" href="#contact">Start Your Project <span aria-hidden="true">↗</span></a>
            <a className="web-button web-button-line" href="#work">Explore Our Work</a>
          </div>
        </div>
        <div className="browser-mockup" aria-label="Abstract website preview">
          <div className="browser-bar"><span /><span /><span /><small>dispel / studio</small></div>
          <div className="browser-screen">
            <div className="screen-kicker">Independent digital studio</div>
            <div className="screen-title">Build<br /><em>with intent.</em></div>
            <div className="screen-rule" />
            <div className="screen-footer"><span>01 — 06</span><span>Scroll to explore</span></div>
            <div className="screen-orb" />
          </div>
        </div>
      </section>

      <section className="web-section web-shell" id="services">
        <Reveal className="section-heading"><p className="eyebrow">What we build</p><h2>Digital foundations<br /><em>built to last.</em></h2></Reveal>
        <div className="build-grid">{buildItems.map(([number, title, description]) => <Reveal className="build-card" key={number}><span className="card-number">{number}</span><h3>{title}</h3><p>{description}</p><span className="card-arrow" aria-hidden="true">↗</span></Reveal>)}</div>
      </section>

      <section className="web-section web-section-tint web-shell">
        <Reveal className="section-heading"><p className="eyebrow">Our technologies</p><h2>The right tools<br /><em>for the job.</em></h2></Reveal>
        <div className="tech-list">{technologyGroups.map(([group, ...tools]) => <div className="tech-group" key={group}><p>{group}</p><div>{tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>)}</div>
      </section>

      <section className="web-section web-shell">
        <Reveal className="section-heading"><p className="eyebrow">Our development process</p><h2>From first thought<br /><em>to first click.</em></h2></Reveal>
        <div className="process-list">{process.map(([number, title, description]) => <Reveal className="process-row" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></Reveal>)}</div>
      </section>

      <section className="web-section web-section-tint web-shell" id="work">
        <Reveal className="section-heading"><p className="eyebrow">Featured work</p><h2>Selected<br /><em>directions.</em></h2></Reveal>
        <div className="project-grid">{projects.map(([title, category, description, tech]) => <Reveal className="project-card" key={title}><div className="project-preview"><div className="preview-window"><span>{title}</span><strong>Make room<br /><em>for better.</em></strong><small>⌁</small></div></div><p className="project-meta">{category}</p><h3>{title}</h3><p>{description}</p><div className="project-foot"><span>{tech.join(' / ')}</span><a href="#contact">View project ↗</a></div></Reveal>)}</div>
      </section>

      <section className="web-section web-shell why-section"><Reveal className="section-heading"><p className="eyebrow">Why choose us?</p><h2>Good work is<br /><em>hard-working.</em></h2></Reveal><div className="why-grid">{['Performance-focused development.', 'Mobile-first responsive design.', 'Scalable architecture.', 'SEO-friendly development.', 'Modern technology stack.', 'Reliable post-launch support.'].map((item, index) => <Reveal className="why-item" key={item}><span>0{index + 1}</span><p>{item}</p></Reveal>)}</div></section>

      <section className="web-cta web-shell" id="contact"><p className="eyebrow">Let&apos;s make something useful</p><h2>Have an idea?<br /><em>Let&apos;s bring it to the web.</em></h2><p>Tell us what you&apos;re planning. We&apos;ll help turn your idea into a powerful digital experience.</p><a className="web-button web-button-dark" href="mailto:hello@dispel.solutions">Let&apos;s Build Something <span aria-hidden="true">↗</span></a></section>
    </main>
  )
}
