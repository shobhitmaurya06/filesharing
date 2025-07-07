import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-100 px-4 text-center">

      <h1 className="text-[100px] font-extrabold text-gray-800 leading-none tracking-tight">
        404
      </h1>
      <p className="mt-2 text-2xl sm:text-3xl text-gray-600 font-semibold">
        Oops! Page not found.
      </p>
      <p className="text-md mt-1 text-gray-500 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="mt-6 inline-block">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300">
          Go Home
        </button>
      </Link>
    </div>
  );
}
