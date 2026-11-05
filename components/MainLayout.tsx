import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return <><Navbar />{children}<Footer /></>
}
