import { CMS_NAME, CMS_URL } from '../lib/constants'

export default function Intro() {
  return (
    <section className="flex-col md:flex-col flex items-left md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
      Arquitectura y Diseño
      </h1>
      <h3 className='text-3xl'>
        <b>AyD </b> is an architecture and design studio based in Los Angeles.
      </h3>
      <h3 className='text-3xl'>
        We believe architecture is a catalyst of change for individuals, communities, and the planet.
      </h3>
    </section>
  )
}
