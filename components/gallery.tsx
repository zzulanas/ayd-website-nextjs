import ContentfulImage from "./contentful-image";
import Link from "next/link";

export default function Gallery({ pictures }) {
  const layoutSizeA = "relative overflow-hidden object-cover";
  const layoutSize2ARow =
    "relative overflow-hidden md:col-span-2 lg:col-span-2 sm:col-span-1";
  const layoutSize2ACol =
    "relative overflow-hidden md:row-span-2 sm:row-span-1";

  const widthSizeA = 800;
  const heightSizeA = 800;

  const textStyle =
    "opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-4xl text-white font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]";
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 pb-12">
      <div className={layoutSizeA}>
        <Link href={`/projects/${pictures[0].slug}`} key={pictures[0].title}>
          <a>
            <ContentfulImage
              objectFit="cover"
              src={pictures[0].homepageImageUrl}
              width={widthSizeA}
              height={heightSizeA}
            />
            <div className={textStyle}>{pictures[0].title}</div>
          </a>
        </Link>
      </div>
      <div className={layoutSizeA}>
        <Link href={`/projects/${pictures[1].slug}`} key={pictures[1].title}>
          <a>
            <ContentfulImage
              objectFit="cover"
              src={pictures[1].homepageImageUrl}
              width={widthSizeA}
              height={heightSizeA}
            />
            <div className={textStyle}>{pictures[1].title}</div>
          </a>
        </Link>
      </div>
      <div className={layoutSizeA}>
        <Link href={`/projects/${pictures[2].slug}`} key={pictures[2].title}>
          <a>
            <ContentfulImage
              objectFit="cover"
              src={pictures[2].homepageImageUrl}
              width={widthSizeA}
              height={heightSizeA}
            />
            <div className={textStyle}>{pictures[2].title}</div>
          </a>
        </Link>
      </div>
      <div className={layoutSizeA}>
        <Link href={`/projects/${pictures[3].slug}`} key={pictures[3].title}>
          <a>
            <ContentfulImage
              objectFit="cover"
              src={pictures[3].homepageImageUrl}
              width={widthSizeA}
              height={heightSizeA}
            />
            <div className={textStyle}>{pictures[3].title}</div>
          </a>
        </Link>
      </div>
      <div className={layoutSize2ARow}>
        <Link href={`/projects/${pictures[4].slug}`} key={pictures[4].title}>
          <a>
            <ContentfulImage
              objectFit="cover"
              src={pictures[4].homepageImageUrl}
              width={widthSizeA * 2}
              height={heightSizeA}
            />
            <div className={textStyle}>{pictures[4].title}</div>
          </a>
        </Link>
      </div>
      <div className={layoutSize2ACol}>
        <Link href={`/projects/${pictures[5].slug}`} key={pictures[5].title}>
          <a>
            <ContentfulImage
              objectFit="cover"
              width={widthSizeA}
              height={heightSizeA * 2}
              src={pictures[5].homepageImageUrl}
            />
            <div className={textStyle}>{pictures[5].title}</div>
          </a>
        </Link>
      </div>
      <div className={layoutSize2ACol}>
        <Link href={`/projects/${pictures[6].slug}`} key={pictures[6].title}>
          <a>
            <ContentfulImage
              objectFit="cover"
              src={pictures[6].homepageImageUrl}
              width={widthSizeA}
              height={heightSizeA * 2}
            />
            <div className={textStyle}>{pictures[6].title}</div>
          </a>
        </Link>
      </div>
      <div className={layoutSize2ACol}>
        <Link href={`/projects/${pictures[7].slug}`} key={pictures[7].title}>
          <a>
            <ContentfulImage
              objectFit="cover"
              src={pictures[7].homepageImageUrl}
              width={widthSizeA}
              height={heightSizeA * 2}
            />
            <div className={textStyle}>{pictures[7].title}</div>
          </a>
        </Link>
      </div>
    </div>
  );
}
