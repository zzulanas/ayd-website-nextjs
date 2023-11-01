export default function PostTitle({ children }) {
  return (
    <h1 className="text-4xl md:text-6.5xl font-medium lg:text-6.5xl tracking-tighter leading-tight md:leading-none text-center md:text-left mb-1">
    {/* < !-- in between 6xl 7xl --> */}
      {children}
    </h1>
  )
}
