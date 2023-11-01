import Avatar from "./avatar";
import DateComponent from "./date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import ContentfulImage from "./contentful-image";
import Container from "./container";

export default function PostHeader({ title, coverImage, date }) {
  return (
    <>
      <Container>
        <PostTitle>{title}</PostTitle>
        <div>
          <ContentfulImage
            width={500}
            height={1000}
            alt={`Cover Image for ${title}`}
            className="shadow-small"
            src={coverImage.url}
            key={coverImage.url}
          />
        </div>
        <div className="place">
          <h1 className="text-8xl font-semibold">TEST</h1>
        </div>
      </Container>
      <div className="flex mb-8 md:mb-16 sm:mx-0 relative">
        <CoverImage title={title} url={coverImage.url} slug={undefined} />
        <ContentfulImage
          width={2000}
          height={1000}
          alt={`Cover Image for ${title}`}
          className="shadow-small"
          src={coverImage.url}
          key={coverImage.url}
        />
      </div>
      <div className="max-w-2xl mx-auto">
        {/* <div className="block md:hidden mb-6">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div> */}
        <div className="mb-6 text-lg">
          <DateComponent dateString={date} />
        </div>
      </div>
    </>
  );
}
