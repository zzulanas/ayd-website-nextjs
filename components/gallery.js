import ContentfulImage from "./contentful-image";
import Container from '../components/container'
import Link from "next/link";

export default function Gallery({ pictures }){
    return(
    <div className="grid grid-cols-4 gap-4 py-10">
        {pictures.map((picture, idx) => (
            <Link href={`/projects/${picture.slug}`} className={idx%2==0 ? " col-span-2": ""}>
                <a>
                    <ContentfulImage
                        width="350px"
                        height="350px"
                        src={picture.url}
                        className={`m-10 hover:shadow-lg hover:transition ease-in-out duration-300`}
                    />
                    <h3>{picture.title}</h3>
                </a>
            </Link>
        ))}
    </div>
    )
}