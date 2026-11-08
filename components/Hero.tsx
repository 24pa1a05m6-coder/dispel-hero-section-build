import { InteractiveWord } from './InteractiveWord'

export function Hero() {
  return (
    <main className="hero">
      <a className="site-cta" href="/get-started">Get started</a>
      <section className="hero-center" aria-labelledby="hero-title">
        <h1 id="hero-title">
          <InteractiveWord />
        </h1>
      </section>
    </main>
  )
}
