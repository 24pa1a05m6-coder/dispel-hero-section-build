'use client'

import { motion, useReducedMotion } from 'motion/react'

const services = [
  ['01', 'Web Development', 'Responsive websites, clear user journeys, and functional frontend experiences built around how your business works.', '/web-development'],
  ['02', 'App Development', 'Mobile products shaped around useful flows, thoughtful interactions, and the context in which people actually use them.', '/app-development'],
  ['03', 'Social Media Management', 'Content direction, publishing systems, and consistent brand communication for the platforms your audience uses.', '/social-media-management'],
  ['04', 'Photography', 'Planned and captured visual content for products, people, spaces, and the stories behind your brand.', '/photography'],
  ['05', 'Videography', 'From campaign concepts to finished edits, moving-image content that gives ideas pace, texture, and a point of view.', '/videography'],
  ['06', 'AI Automations', 'Practical workflows that connect tools, remove repetitive steps, and give teams more time for considered work.', '/ai-automations'],
  ['07', 'SEO', 'Technical cleanup, content structure, and search strategy that make your website easier to find and understand.', '/seo'],
]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
}

export function HomeSections() {
  return <div className="home-sections">
    <section className="home-point home-section-shell" id="about"><p className="home-section-index">01 / Point of view</p><div className="home-point-copy"><h2>Good ideas need<br /><em>somewhere to go.</em></h2><p>We bring creativity and technology together to make work that can be understood, used, and remembered. That means visual communication with a clear purpose, digital products grounded in real needs, and implementation that holds up beyond the presentation.</p></div><div className="home-point-note">Creative thinking<br />+ technical execution</div></section>

    <section className="home-services home-section-shell" id="services"><div className="home-section-intro"><p className="home-section-index">02 / Services</p><h2>Everything your brand<br /><em>needs to move forward.</em></h2></div><div className="home-service-list">{services.map(([number, title, description, href]) => <a href={href} className="home-service-row" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{description}</p><span className="service-arrow" aria-hidden="true">↗</span></a>)}</div></section>

    <section className="home-work-showcase" id="work"><div className="home-section-shell"><div className="home-section-intro"><p className="home-section-index">03 / Selected work</p><h2>A place for work<br /><em>still in the making.</em></h2></div><div className="home-work-layout"><Reveal className="home-work-item home-work-primary"><div className="home-work-visual"><span>Placeholder / project preview</span><strong>shape<br /><em>the story.</em></strong><i /></div><p>Editorial digital direction</p><h3>Project placeholder 01</h3></Reveal><Reveal className="home-work-item home-work-secondary"><div className="home-work-visual"><span>Placeholder / project preview</span><strong>useful<br /><em>by design.</em></strong></div><p>Product and web development</p><h3>Project placeholder 02</h3></Reveal></div><p className="home-placeholder-note">Our portfolio is being assembled. These placeholders mark the space for real work as projects are ready to share.</p></div></section>

    <section className="home-difference home-section-shell"><div className="home-section-intro"><p className="home-section-index">04 / What makes us different</p><h2>Not just good-looking<br /><em>solutions.</em></h2></div><div className="home-difference-copy"><p>We stay close to the details that make a digital experience useful: how it explains itself, how quickly it responds, how it behaves on a smaller screen, and how it supports the business behind it.</p><ul>{['Creative direction connected to implementation.', 'Design decisions grounded in user experience.', 'Useful systems, not just attractive screens.', 'Clear collaboration from first conversation to delivery.'].map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul></div></section>

    <section className="home-approach home-section-shell" id="motive"><div className="home-section-intro"><p className="home-section-index">05 / Our approach</p><h2>Make room for<br /><em>the right questions.</em></h2></div><div className="home-approach-list">{[['01', 'Understand', 'Learn about the business, audience, requirements, and problem.'], ['02', 'Explore', 'Develop the creative direction and identify the right approach.'], ['03', 'Create', 'Design, develop, and implement the solution with care.'], ['04', 'Refine', 'Test, improve, and prepare the final delivery.']].map(([number, title, text]) => <Reveal className="home-approach-row" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></section>

    <section className="home-final home-section-shell" id="contact"><p className="home-section-index">06 / Start a conversation</p><h2>Have something<br /><em>worth making?</em></h2><p>Whether you need a website, an application, visual content, or an intelligent workflow, tell us what you&apos;re working toward.</p><div><a className="home-final-button home-final-button-dark" href="mailto:hello@dispel.solutions">Start a Project ↗</a><a className="home-final-button" href="mailto:hello@dispel.solutions">Contact Us</a></div></section>
  </div>
}
