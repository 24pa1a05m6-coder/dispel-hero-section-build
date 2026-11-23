import { TiltedGridHero } from '@/components/ui/tilted-grid-hero'
import { OndaExperience } from '@/components/onda/OndaExperience'

// Our R2 artwork, alternating photos with gradients — the same set as the
// Halo Reel demo. Portrait sources are cropped to the tiles by object-cover.
const CDN = 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev'

const IMAGES = [
  {
    src: `${CDN}/stock-images/767d99bb371a54d0d36751e8cecae43c.jpg`,
    alt: 'Diver silhouetted inside a sunset seascape shaped like a profile',
  },
  {
    src: `${CDN}/gradients/hero_gradient/hero-gradients-01.png`,
    alt: 'Soft multi-tone gradient wash',
  },
  {
    src: `${CDN}/stock-images/821d815affa6496c39cbdeeec7a84603.jpg`,
    alt: 'Double-exposure portrait blended with a city skyline at dusk',
  },
  {
    src: `${CDN}/gradients/moon/moon-grade-03.png`,
    alt: 'Moon-toned gradient',
  },
  {
    src: `${CDN}/stock-images/937438c560ada1c83317f2c11b3454b0.jpg`,
    alt: 'Motion-blurred side-profile portrait against a deep orange backdrop',
  },
  {
    src: `${CDN}/gradients/shade_shiters/shade-shifters-05.png`,
    alt: 'Shifting shade gradient',
  },
  {
    src: `${CDN}/stock-images/98f89cb9994f5c382ab964062c4039db.jpg`,
    alt: 'Figure holding a racket that dissolves into a swirling colourful cloud',
  },
  {
    src: `${CDN}/gradients/shade_shiters/shade-shifters-09.png`,
    alt: 'Shifting shade gradient',
  },
  {
    src: `${CDN}/stock-images/ddcbee38be8b7274e19e132d7ab35b53.jpg`,
    alt: 'Hand gesture with a colourful cutout of a bird flying through the fingers',
  },
  {
    src: `${CDN}/gradients/moon/moon-grade-06.png`,
    alt: 'Moon-toned gradient',
  },
]

export default function GetStartedPage() {
  return (
    <main className="w-full">
      <TiltedGridHero
        images={IMAGES}
        className="relative h-screen min-h-[640px] w-full bg-background"
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-between py-16 sm:py-20 text-center pointer-events-none">
          <div className="px-6 max-w-4xl mx-auto">
            <h1 className="text-balance text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-foreground">
              Ideas into impact,
              <br />
              brought into focus.
            </h1>
          </div>
          <div className="px-6 max-w-xl mx-auto">
            <p className="text-balance text-sm sm:text-base text-muted-foreground">
              We turn creative thinking and modern technology into high-impact digital experiences and measurable growth.
            </p>
          </div>
        </div>
      </TiltedGridHero>

      <OndaExperience />
    </main>
  )
}
