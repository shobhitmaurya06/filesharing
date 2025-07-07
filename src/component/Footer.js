import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full h-[12vh] border-t-1 shadow-xl shadow-gray-400 bg-gray-700 overflow-hidden sm:overflow-visible">
      <footer className="sm:max-w-7xl mx-auto flex justify-between h-full items-center">
        <div className="text-[20px] font-medium text-gray-400">
          Copyright &copy; 2025 by Shobhit Maurya &amp; Yugraj Kumar Singh | All Rights Reserved.
        </div>
        <div className="gap-x-6 hidden sm:flex">
          <Link
            href="https://www.linkedin.com/in/shobhit-maurya-5672a5263/"
            target="_blank"
          >
            <FaLinkedin className="w-10 h-10 text-white rounded-full transition-transform duration-300 hover:scale-110" />
          </Link>
          <Link href="https://github.com/shobhitmaurya06" target="_blank">
            <FaGithub className="w-10 h-10 text-white rounded-full transition-transform duration-300 hover:scale-110" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
