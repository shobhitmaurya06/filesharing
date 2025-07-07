import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full bg-white shadow-md border-b border-gray-200">
      <header className="sticky top-0 z-50 mx-auto flex h-[12vh] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 ">
        {/* Logo */}
        <Link href="/">
          <img
            src="/fileSharingLogo.jpg"
            alt="Logo"
            className="h-12 w-auto cursor-pointer transition-transform duration-300 hover:scale-110"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-8 text-lg font-medium text-gray-600">
          {/* Home */}
          <div className="group relative">
            <Link
              href="/"
              className="transition-colors duration-300 group-hover:text-orange-500"
            >
              Home
            </Link>
            <div className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
          </div>

          {/* Contact */}
          <div className="group relative">
            <Link
              href="/contact-page"
              className="transition-colors duration-300 group-hover:text-orange-500"
            >
              Contact
            </Link>
            <div className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
          </div>
        </nav>
      </header>
    </div>
  );
}
