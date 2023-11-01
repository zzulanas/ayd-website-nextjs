export default function contentfulLoader({ src, width, quality }) {
    return `https://images.ctfassets.net/${src}?w=${width}&q=${quality || 100}`
}
