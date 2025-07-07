import { FaLinkedin, FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full min-h-[12vh] border-t border-gray-600 shadow-xl shadow-gray-400 bg-gray-700">
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
        {/* Copyright text - responsive sizing and centered on mobile */}
        <div className="text-center sm:text-left">
          <p className="text-sm sm:text-base font-medium text-gray-300">
            Copyright &copy; 2025 by Shobhit Maurya &amp; Yugraj Kumar Singh
          </p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            All Rights Reserved
          </p>
        </div>

        {/* Social links - centered on mobile */}
        <div className="flex gap-4 sm:gap-6">
          <Link
            href="https://www.linkedin.com/in/shobhit-maurya-5672a5263/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect on LinkedIn"
            className="group"
          >
            <FaLinkedin className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 rounded-full transition-all duration-300 hover:scale-110 hover:text-white" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com/shobhitmaurya06"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GitHub profile"
            className="group"
          >
            <FaGithub className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 rounded-full transition-all duration-300 hover:scale-110 hover:text-white" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}