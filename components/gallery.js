import ContentfulImage from "./contentful-image";
import Container from '../components/container'
import Link from "next/link";
import Image from "next/image";

export default function Gallery({ pictures }){
    const layoutSizeA = "w-96 h-96 relative overflow-hidden col-span-1 row-span-1 mb-10"
    const layoutSize2ARow = "w-192 h-96 relative overflow-hidden col-span-2 row-span-1 mb-10"
    const layoutSize2ACol = "w-96 h-192 relative overflow-hidden col-span-1 row-span-2 mb-10"
    const imageStyle = "`m-10 hover:shadow-lg hover:transition ease-in-out duration-300 object-center hover:blur-md"
    return(
    <div className="grid grid-cols-3 auto-rows-auto">
        {/* {pictures.map((picture, idx) => (
                <div className={layoutSize2ACol}>
                    <Link href={`/projects/${picture.slug}`} key={picture.title}>
                        <a>
                            <ContentfulImage
                                layout="fill"
                                objectFit="cover"
                                src={picture.url}
                                className={`m-10 hover:shadow-lg hover:transition ease-in-out duration-300 object-center`}
                            />
                        </a>
                    </Link>
                    </div>           
        ))} */}
        <div className={layoutSizeA}>
            <Link href={`/projects/${pictures[0].slug}`} key={pictures[0].title}>
                <a>
                    <ContentfulImage
                        layout="fill"
                        objectFit="cover"
                        src={pictures[0].url}
                        className={imageStyle}
                    />
                </a>
            </Link>
        </div> 
        <div className={layoutSizeA}>
            <Link href={`/projects/${pictures[1].slug}`} key={pictures[1].title}>
                <a>
                    <ContentfulImage
                        layout="fill"
                        objectFit="cover"
                        src={pictures[1].url}
                        className={imageStyle}
                    />
                </a>
            </Link>
        </div> 
        <div className={layoutSizeA}>
            <Link href={`/projects/${pictures[2].slug}`} key={pictures[2].title}>
                <a>
                    <ContentfulImage
                        layout="fill"
                        objectFit="cover"
                        src={pictures[2].url}
                        className={imageStyle}
                    />
                </a>
            </Link>
        </div> 
        <div className={layoutSizeA}>
            <Link href={`/projects/${pictures[3].slug}`} key={pictures[3].title}>
                <a>
                    <ContentfulImage
                        layout="fill"
                        objectFit="cover"
                        src={pictures[3].url}
                        className={imageStyle}
                    />
                </a>
            </Link>
        </div> 
        <div className={layoutSize2ARow}>
            <Link href={`/projects/${pictures[0].slug}`} key={pictures[0].title}>
                <a>
                    <ContentfulImage
                        layout="fill"
                        objectFit="cover"
                        src={pictures[0].url}
                        className={imageStyle}
                    />
                </a>
            </Link>
        </div> 
        <div className={layoutSize2ACol}>
            <Link href={`/projects/${pictures[1].slug}`} key={pictures[1].title}>
                <a>
                    <ContentfulImage
                        layout="fill"
                        objectFit="cover"
                        src={pictures[1].url}
                        className={imageStyle}
                    />
                </a>
            </Link>
        </div> 
        <div className={layoutSize2ACol}>
            <Link href={`/projects/${pictures[2].slug}`} key={pictures[2].title}>
                <a>
                <div class="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-6xl text-white font-semibold">{pictures[2].title}</div>
                    <ContentfulImage
                        layout="fill"
                        objectFit="cover"
                        src={pictures[2].url}
                        className={imageStyle}
                    />
                </a>
            </Link>
        </div> 
        <div className={layoutSize2ACol}>
            <Link href={`/projects/${pictures[3].slug}`} key={pictures[3].title}>
                <a>
                    <ContentfulImage
                        layout="fill"
                        objectFit="cover"
                        src={pictures[3].url}
                        className={imageStyle}
                    />
                    <div class="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-4xl text-white font-semibold">{pictures[3].title}</div>
                </a>
            </Link>
        </div> 
    </div>
    )
}