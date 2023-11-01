import Container from "./container";

export default function Footer(data) {
  return (
    <footer className="bg-accent-1 ">
      <Container>
        <div className="py-28 flex md:flex-row items-center sm: flex-col px-5">
          <div className="basis-3/8 py-10">
            <h1 className="text-4xl tracking-wider font-light">
              arquitectura y diseño
            </h1>
            <h3 className="text-2xl font-medium text-slate-500 tracking-widest">
              roberto sheinberg
            </h3>
            <div className="flex justify-between">
              <h3 className="text-slate-400 font-thin">se habla ingles</h3>
              <span className="text-gray-400 self-end invisible md:visible">
                a&nbsp;&nbsp;
              </span>
            </div>
            <div className="py-10">
              <h4 className="text-1.5xl  text-left">
                <a
                  href={"mailto:" + data.data.footer.fields.infoEmail}
                  className="hover:underline"
                >
                  {data.data.footer.fields.infoEmail}
                </a>
              </h4>
              <h4 className="text-1.5xl text-gray-400 text-left">
                <a
                  href={"tel:" + data.data.footer.fields.phoneNumber}
                  className="hover:underline"
                >
                  {data.data.footer.fields.phoneNumber}
                </a>
              </h4>
              <br />
              <h4 className="text-1.5xl text-gray-400 hover:underline">
                <a
                  href={
                    "https://www.google.com/maps/search/?api=1&query=" +
                    data.data.footer.fields.address
                  }
                >
                  {data.data.footer.fields.address}
                </a>
              </h4>
            </div>
          </div>
          <div className="self-start pt-28 flex">
            <div>
              {data.data.footer.fields.certifications.map(
                (certification, index) => (
                  <div>
                    <span key={index} className="text-gray-400 md:text-left">
                      {" "}
                      {certification}{" "}
                    </span>{" "}
                    <br />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
