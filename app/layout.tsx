import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

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
      <body className={cn("flex w-full min-h-screen", roboto.className)}>
        <Toaster />
        <Sidebar />
        <main className="pl-[250px] min-h-full w-full">{children}</main>
      </body>
    </html>
  );
}
