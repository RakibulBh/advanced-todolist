import { navLinks } from "@/lib/data";
import Link from "next/link";
import Navlink from "./nav-link";
import { getServerSession } from "next-auth";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { LoginBtn } from "./auth/login-btn";
import { Logout } from "./auth/logout";

export const Sidebar = async () => {
  const session = await getServerSession();

  return (
    <nav
      className={cn(
        "fixed h-screen w-[250px] p-3 bg-[#F9F9F9] flex flex-col  items-center",
        session && "justify-between pt-20 ",
        !session && "justify-center"
      )}
    >
      <div className="flex flex-col gap-y-6">
        {session &&
          navLinks.map((link) => (
            <Link key={link.title} href="/">
              <Navlink icon={link.icon} title={link.title} />
            </Link>
          ))}
      </div>
      {session && <Logout />}
      {!session && <LoginBtn />}
    </nav>
  );
};
