import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="bg-accent-1 ">
      <Container>
        <div className="py-28 flex flex-row items-center">
          <div className="basis-2/3">
            <h1 className="text-4xl tracking-wider font-light">arquitectura y diseño</h1>
            <h3 className="text-2xl font-medium text-slate-500 tracking-widest">roberto sheinberg</h3>
            <h3 className='text-slate-400 font-thin'>se habla ingles</h3>
            
          </div>
          <div>
          <h4 className='text-2xl text-gray-400'><a href="mailto: info@arq-y-di.com" className='hover:underline'>info@arq-y-di.com</a></h4>
            <h4 className='text-2xl text-gray-400'><a href="tel:3105914881" className='hover:underline'>310-591-4881</a></h4>
            <br/>
            <h4 className='text-2xl text-gray-400'>3526 East Olympic Blvd</h4>
            <h4 className='text-2xl text-gray-400'>Los Angeles, CA</h4>
            
          </div>
        </div>
      </Container>
    </footer>
  )
}
