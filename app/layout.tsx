import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

import { getServerSession } from "next-auth";

import { SessionProvider } from "next-auth/react";
import { Logout } from "@/components/auth/logout";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "To-do list",
  description: "A really good todo list",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("flex w-full min-h-screen", roboto.className)}>
        <Sidebar />
        <main className="pl-[250px] min-h-full w-full">{children}</main>
      </body>
    </html>
  );
}
