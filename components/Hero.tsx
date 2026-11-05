import { InteractiveWord } from './InteractiveWord'
import { Navigation } from './Navigation'

export function Hero() {
  return (
    <main className="hero">
      <Navigation />
      <section className="hero-center" aria-labelledby="hero-title">
        <h1 id="hero-title">
          <InteractiveWord />
        </h1>
      </section>
    </main>
  )
}
