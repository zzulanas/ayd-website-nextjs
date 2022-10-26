import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-28 flex flex-row items-center">
          <div className="basis-2/3">
            <h1 className="text-4xl">ARQUITECTURA y DISEÑO</h1>
            <h3 className="text-2xl">roberto sheinberg</h3>
            <h4 className='text-1xl text-slate-400'>Los Angeles</h4>
          </div>
          <div>
            <h3 className='text-right'>se habla ingles</h3>
          </div>
        </div>
      </Container>
    </footer>
  )
}
