import Image from "next/image";
import "yet-another-react-lightbox/styles.css";

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 100}`;
};

const ContentfulImage = (props) => {
  return (
    <>
      <Image
        loader={contentfulLoader}
        className={props.lightboxEnabled ? "cursor-pointer" : ""}
        {...props}
      />
    </>
  );
};

export default ContentfulImage;
