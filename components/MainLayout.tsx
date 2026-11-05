import { Footer } from './Footer'
import { Navigation } from './Navigation'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return <><Navigation />{children}<Footer /></>
}
