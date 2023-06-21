import Container from './container'

export default function Footer(data) {
  console.log("footer data: ", data.data.footer)
  return (
    <footer className="bg-accent-1 ">
      <Container>
        <div className="py-28 flex md:flex-row items-center sm: flex-col px-5">
          <div className="basis-2/3 py-10">
            <h1 className="text-4xl tracking-wider font-light">arquitectura y diseño</h1>
            <h3 className="text-2xl font-medium text-slate-500 tracking-widest">roberto sheinberg</h3>
            <h3 className='text-slate-400 font-thin'>se habla ingles</h3>
            <div className='py-10'>
              <h4 className='text-1.5xl  text-left'><a href={"mailto:" + data.data.footer.infoEmail} className='hover:underline'>{data.data.footer.infoEmail}</a></h4>
              <h4 className='text-1.5xl text-gray-400 text-left'><a href={"tel:" + data.data.footer.phoneNumber} className='hover:underline'>{data.data.footer.phoneNumber}</a></h4>
              <br />
              <h4 className='text-1.5xl text-gray-400 hover:underline'><a href={'https://www.google.com/maps/search/?api=1&query=' + data.data.footer.address}>{data.data.footer.address}</a></h4>
            </div>
          </div>
          <div className='self-start py-10 flex'>
            <span className='text-gray-400'>a&nbsp;</span>
            <div>
              {data.data.footer.certifications.map((certification, index) => (
                <div>
                  <span key={index} className='text-gray-400 md:text-left'> {certification} </span> <br />
                </div>
              ))}
            </div>
          </div>
        </div>

      </Container>
    </footer>
  )
}
