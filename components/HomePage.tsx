'use client'

import { motion, useReducedMotion } from 'motion/react'

const services = [
  ['01', 'Web Development', 'Responsive, high-performance websites and web applications.', '/web-development'],
  ['02', 'App Development', 'Useful, intuitive mobile experiences across devices.', '/app-development'],
  ['03', 'Social Media Management', 'Content strategies that connect brands with audiences.', '/social-media-management'],
  ['04', 'Photography', 'Visual content that communicates brand, products, and stories.', '/photography'],
  ['05', 'Videography', 'Campaigns and brand stories brought to life through motion.', '/videography'],
  ['06', 'AI Automations', 'Intelligent workflows that reduce repetitive work.', '/ai-automations'],
  ['07', 'SEO', 'Technical visibility, content optimization, and search strategy.', '/seo'],
]
const approach = [['01', 'Discover', 'Understand requirements, goals, audience, and challenges.'], ['02', 'Define', 'Develop the right strategy and establish a clear direction.'], ['03', 'Create', 'Design, develop, and bring the solution to life.'], ['04', 'Deliver', 'Test, refine, launch, and ensure everything works as intended.'], ['05', 'Evolve', 'Continue improving the experience as your business grows.']]
const principles = ['Creative thinking backed by technical execution.', 'Solutions designed around actual business requirements.', 'Attention to detail and user experience.', 'Modern development practices.', 'Performance and scalability.', 'Collaboration and transparent communication.']

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .65, ease: [0.22, 1, .36, 1] }}>{children}</motion.div>
}

export function HomePage() {
  return <main className="home-page">
    <section className="home-hero home-shell">
      <div className="hero-copy"><p className="home-eyebrow">Independent digital studio / 001</p><h1>Ideas deserve<br /><em>more than</em><br />just execution.</h1><p className="home-lede">We create digital experiences, build powerful products, and develop creative solutions that help businesses move forward.</p><div className="home-actions"><a className="home-button home-button-dark" href="#contact">Start a Project ↗</a><a className="home-button" href="#work">Explore Our Work</a></div></div>
      <motion.div className="hero-collage" initial={{ opacity: 0, rotate: 3, scale: .96 }} animate={{ opacity: 1, rotate: -3, scale: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, .36, 1] }}><div className="collage-top">dispel / 2026</div><div className="collage-word">make<br /><em>meaning.</em></div><div className="collage-line" /><div className="collage-index">digital / creative / technical</div><div className="collage-circle" /></motion.div>
    </section>

    <section className="home-intro home-shell"><p className="home-eyebrow">Who we are</p><div><h2>We bring creativity<br /><em>and technology together.</em></h2><p>From building digital products to creating visual stories and automating business operations, we help brands turn ambitious ideas into meaningful digital experiences.</p></div></section>

    <section className="home-section home-shell" id="services"><Reveal className="home-heading"><p className="home-eyebrow">What we do</p><h2>Everything your brand<br /><em>needs to grow digitally.</em></h2></Reveal><div className="service-list">{services.map(([number, title, description, href]) => <a className="service-row" href={href} key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><b>↗</b></a>)}</div></section>

    <section className="home-section home-work" id="work"><Reveal className="home-heading home-shell"><p className="home-eyebrow">Selected work</p><h2>A closer look at<br /><em>what we create.</em></h2></Reveal><div className="work-grid home-shell"><Reveal className="work-piece work-piece-large"><div className="work-art work-art-sand"><span>Concept / 001</span><strong>shape<br /><em>the story.</em></strong></div><p>Editorial commerce</p><h3>Concept 01</h3><small>Web development / strategy</small></Reveal><Reveal className="work-piece"><div className="work-art work-art-dark"><span>Concept / 002</span><strong>move<br /><em>forward.</em></strong></div><p>Digital product</p><h3>Concept 02</h3><small>Product / development</small></Reveal></div><a className="work-cta home-shell" href="#work">Explore All Projects ↗</a></section>

    <section className="home-section home-shell why"><Reveal className="home-heading"><p className="home-eyebrow">Why work with us</p><h2>Not just another<br /><em>service provider.</em></h2></Reveal><div className="principle-list">{principles.map((item, index) => <Reveal className="principle" key={item}><span>0{index + 1}</span><p>{item}</p></Reveal>)}</div></section>

    <section className="home-section home-shell approach"><Reveal className="home-heading"><p className="home-eyebrow">Our approach</p><h2>From the first conversation<br /><em>to the final launch.</em></h2></Reveal><div className="approach-list">{approach.map(([number, title, text]) => <Reveal className="approach-row" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></section>

    <section className="home-final home-shell" id="contact"><p className="home-eyebrow">Start a conversation</p><h2>Have an idea?<br /><em>Let&apos;s make it real.</em></h2><p>Whether you need a website, an application, creative content, or intelligent automation, let&apos;s discuss what we can build together.</p><div className="home-actions"><a className="home-button home-button-dark" href="mailto:hello@dispel.solutions">Start Your Project ↗</a><a className="home-button" href="mailto:hello@dispel.solutions">Contact Us</a></div></section>
  </main>
}
