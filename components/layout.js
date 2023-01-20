import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
import Nav from './nav'

export default function Layout({ preview, children, footer }) {
  return (
    <>
      <Meta />
      <Nav/>
      <div className="min-h-screen md:mt-10">
        <main>{children}</main>
      </div>
      <Footer data={footer}/>
    </>
  )
}
