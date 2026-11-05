import DoodleCrewFooter from './ui/doodle-crew-footer'

const serviceLinks = [
  { title: 'Explore', links: [{ label: 'Home', href: '/' }, { label: 'About', href: '#about' }, { label: 'Motive', href: '#motive' }, { label: 'Services', href: '#services' }] },
  { title: 'Development', links: [{ label: 'Web Development', href: '/web-development' }, { label: 'App Development', href: '/app-development' }, { label: 'AI Automations', href: '/ai-automations' }] },
  { title: 'Creative', links: [{ label: 'Social Media Management', href: '/social-media-management' }, { label: 'Photography', href: '/photography' }, { label: 'Videography', href: '/videography' }] },
  { title: 'Growth', links: [{ label: 'SEO', href: '/seo' }, { label: 'Contact Us', href: '#contact' }] },
]

export function Footer() {
  const year = new Date().getFullYear()
  return <DoodleCrewFooter
    wordmark="DISPEL"
    brand="dispel.solutions"
    tagline="Creative thinking. Digital execution. Meaningful experiences."
    blurb="We bring creativity and technology together to build digital experiences, create compelling visual content, and develop intelligent solutions for businesses."
    columns={serviceLinks}
    actions={[{ label: 'Start a Project', href: '#contact', variant: 'outline' }, { label: 'Explore Services', href: '#services', variant: 'solid' }]}
    socials={[]}
    copyright={`© ${year} dispel.solutions. All rights reserved.`}
    legal={[{ label: 'Privacy Policy', href: '#privacy' }, { label: 'Terms & Conditions', href: '#terms' }]}
    backToTop
    interactive
    preset="paper"
    height="760px"
  />
}
