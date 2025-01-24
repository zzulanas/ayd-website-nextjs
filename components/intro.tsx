interface IntroProps {
  introActionItem?: {
    displayText: string;
    link: string;
  } | null;
}

export default function Intro({ introActionItem }: IntroProps) {
  return (
    <section className="flex-col md:flex-col flex items-left md:justify-between md:mt-16 mb-16 md:mb-12">
      <h1 className="text-2xl md:text-6xl tracking-tighter font-extralight leading-tight md:pr-8 pb-2.5">
        ARQUITECTURA y DISEÑO
      </h1>
      {introActionItem && (
        <a href={introActionItem.link} className="text-blue-500 hover:text-blue-700">
          {introActionItem.displayText}
        </a>
      )}
      <h3 className="text-sm md:text-2xl font-thin">
        AyD is an architecture and design studio based in Los Angeles. We
        believe architecture is a catalyst of change for individuals,
        communities, and the planet.
      </h3>
    </section>
  );
}