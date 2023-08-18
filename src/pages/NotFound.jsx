import { Link } from "react-router-dom";
import p1 from '../assets/frame-36.jpg'

export default function NotFound() {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* content - start */}
          <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32 text-gray-800 dark:text-white">
            <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">Error 404</p>
            <h1 className="mb-2 text-center text-2xl font-bold sm:text-left md:text-3xl">Page not found</h1>
            <p className="mb-8 text-center sm:text-left md:text-lg">The page you’re looking for doesn’t exist.</p>
            <Link to="/" className="inline-block rounded-lg bg-gray-200 dark:bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-gray-500 dark:text-gray-300 outline-none ring-indigo-300 dark:ring-gray-600 transition duration-100 hover:bg-gray-300 dark:hover:bg-gray-700 focus-visible:ring active:text-gray-700 md:text-base">Go home</Link>
          </div>
          {/* content - end */}

          {/* image - start */}
          <div className="relative h-96 overflow-hidden rounded-lg shadow-lg md:h-auto">
            <img src={p1} loading="lazy" alt="Jaldi waha se hato" className="absolute inset-0 h-full w-full object-cover object-center" />
          </div>
          {/* image - end */}
        </div>
      </div>
    </div>
  )
}
