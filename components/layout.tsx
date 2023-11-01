import Footer from "./footer";
import Meta from "./meta";
import Nav from "./nav";

export default function Layout({ preview, children, footer, pageMeta }) {
  return (
    <>
      <Meta {...pageMeta} />
      <Nav />
      <div className="min-h-screen md:mt-10">
        <main>{children}</main>
      </div>
      <Footer data={footer} />
    </>
  );
}
