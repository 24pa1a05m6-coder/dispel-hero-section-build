import { Footer } from './Footer'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<Footer /></>
}
