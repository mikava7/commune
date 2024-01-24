"use client";
import { useState } from "react";
import Link from "next/link";
import { navbarLinks } from "@/lib/menu-items";
import { usePathname } from "next/navigation";
import FormLinks from "./ui/posts/form-links";
export default function NavBar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState("");

  return (
    <nav className="bg-blue-500 py-4 border-b border-blue-700 lg:px-8">
      <div className="flex items-center justify-between px-4 sm:px-0 max-w-6xl mx-auto">
        <Link href="/">Commune Connect</Link>
        {/* Responsive Menu Button for Small Screens */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu for Large Screens */}
        <ul className={`menu menu-horizontal hidden sm:flex space-x-4`}>
          {navbarLinks.map((link) => (
            <li key={link.href} className="cursor-pointer">
              <Link href={link.href}>
                <button
                  className={`${
                    pathname === link.href
                      ? "text-white font-bold"
                      : "text-gray-300"
                  } hover:text-white transition duration-300 focus:outline-none`}
                >
                  {link.label}
                </button>
              </Link>

              {/* Conditionally render sublinks (FormLinks) based on hover */}
              {/* {link.href === "/create" && <FormLinks />} */}
            </li>
          ))}
        </ul>
        {children}

        {/* Responsive Menu for Small Screens */}
        {menuOpen && (
          <div className="sm:hidden absolute top-16 left-4 right-4 bg-white p-4 rounded shadow-md">
            <ul className="flex flex-col space-y-2">
              {navbarLinks.map((link) => (
                <li key={link.href} className="cursor-pointer">
                  <Link href={link.href}>
                    <button
                      className={`${
                        pathname === link.href
                          ? "text-blue-500 font-bold"
                          : "text-gray-800"
                      } hover:text-blue-500 transition duration-300 focus:outline-none`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
