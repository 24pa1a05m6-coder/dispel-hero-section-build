import { InteractiveWord } from './InteractiveWord'
import { Navigation } from './Navigation'

export function Hero() {
  return (
    <main className="hero">
      <Navigation />
      <div className="hero-tagline">Ideas into impact.</div>
      <section className="hero-center" aria-labelledby="hero-title">
        <h1 id="hero-title">
          <InteractiveWord />
        </h1>
      </section>
      <p className="hero-caption">Independent Digital Marketing Agency</p>
    </main>
  )
}
