'use client'

import { motion } from 'motion/react'
import { services } from '@/lib/services'
import { EnquiryForm, BackLink } from './ServiceExperience'

export function GetStartedPage() {
  return <main className="get-started-page"><div className="service-shell"><BackLink /><section className="get-started-hero"><p className="service-index">WHAT WE DO</p><h1>Let&apos;s make<br /><em>something matter.</em></h1><p>From building memorable identities to creating digital experiences that drive growth, explore how we can turn your ideas into impact.</p><span className="scroll-indicator">Scroll to explore ↓</span></section><section className="started-services" id="services"><div className="service-heading"><p className="service-index">Explore the possibilities</p><h2>Explore what we can<br /><em>create together.</em></h2><p>Different challenges. Different possibilities. One goal — meaningful impact.</p></div><div className="started-grid">{services.map((service) => <motion.a href={`/services/${service.slug}`} className="started-card" key={service.slug} whileHover={{ y: -6 }}><div><span className="service-index">{service.number} / {service.category}</span><h3>{service.name}</h3><p>{service.description}</p></div><img src={service.image} alt="" /><span className="started-link">Explore service ↗</span></motion.a>)}</div></section><EnquiryForm /></div></main>
}
