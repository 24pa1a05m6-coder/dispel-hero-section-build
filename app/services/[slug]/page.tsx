import { notFound } from 'next/navigation'
import { ServiceExperience } from '@/components/ServiceExperience'
import { getService, services } from '@/lib/services'
import '../../service-pages.css'

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })) }
export default async function ServiceRoute({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const service = getService(slug); if (!service) notFound(); return <ServiceExperience service={service} /> }
