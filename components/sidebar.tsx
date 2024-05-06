import { navLinks } from "@/lib/data"
import Link from "next/link"
import Navlink from "./nav-link"

export default function Sidebar() {
  return (
    <nav className="h-full w-[300px] p-3 bg-[#F9F9F9]">
      {navLinks.map((link) => (
        <Link key={link.title} href='/'>
          <Navlink icon={link.icon} title={link.title}/>
        </Link>
      ))}
    </nav>
  )
}
