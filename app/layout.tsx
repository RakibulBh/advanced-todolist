import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import { MobileSidebar } from "@/components/mobile-sidebar";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

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
      <body className={cn("h-screen overflow-hidden flex", roboto.className)}>
        <Toaster />
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <MobileSidebar />
        <main className="flex-1 overflow-y-auto md:pl-[300px]">{children}</main>
      </body>
    </html>
  );
}
