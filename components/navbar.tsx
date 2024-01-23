"use client";
import Link from "next/link";
import links from "@/lib/menu-items";
import AuthenticationButton from "./auth/authentication-button";
import { usePathname } from "next/navigation";
export default function NavBar() {
  const pathname = usePathname();
  console.log("pathname", pathname);
  console.log("link.label ", links);
  return (
    <nav className="bg-grey-500 py-4 border ">
      <div className="flex items-center justify-between px-8 max-w-6xl mx-auto cursor-pointer">
        <Link href="/home">
          <span className="cursor-pointer"> Commune connect</span>
        </Link>
        <ul className="menu menu-horizontal flex space-x-4 ">
          {links.map((link) => (
            <li key={link.href} className="cursor-pointer">
              <Link
                href={link.href}
                className={`${pathname === link.href ? "active" : ""}`}
              >
                <button type="button" className="cursor-pointer ...">
                  {link.label}
                </button>
              </Link>
            </li>
          ))}
        </ul>
        {/* <AuthenticationButton /> */}
      </div>
    </nav>
  );
}
