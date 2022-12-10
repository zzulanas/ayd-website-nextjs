export default function PostTitle({ children }) {
  return (
    <h1 className="text-4xl md:text-7xl font-bold lg:text-7xl tracking-tighter leading-tight md:leading-none text-center md:text-left">
    {/* < !-- in between 6xl 7xl --> */}
      {children}
    </h1>
  )
}
