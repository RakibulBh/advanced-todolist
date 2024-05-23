import Link from "next/link";
import Navlink from "./nav-link";
import { getServerSession } from "next-auth";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { LoginBtn } from "./auth/login-btn";
import { Calendar, CalendarCheck, CalendarClock, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/server";
import { signout } from "@/app/login/actions";

export const Sidebar = async () => {
  const summaryData = [
    {
      title: "Today",
      icon: <CalendarCheck className="text-green-500" />,
      count: 7,
    },
    {
      title: "Upcoming",
      icon: <Calendar className="text-purple-500" />,
      count: 7,
    },
    {
      title: "Future",
      icon: <CalendarClock className="text-orange-500" />,
      count: 7,
    },
  ];

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex pt-10 pb-3 px-3 space-y-6 fixed h-screen w-[350px] bg-gray-100 border-r-gray-200 border-[1px] flex-col justify-between rounded-r-xl">
      <div className="flex flex-col gap-y-3">
        {summaryData.map((data) => (
          <div key={data.title} className="flex justify-between items-center">
            <div className="flex gap-x-3 items-center">
              {data.icon}
              <p className="">{data.title}</p>
            </div>
            <p className="text-gray-400">{data.count}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-x-3 items-center">
        <Trash2 />
        <p className="">Trash</p>
      </div>
      <div className="h-[1px] w-full bg-gray-300" />
      <div className="flex justify-between flex-col h-full">
        <div className="mr-auto flex flex-col gap-y-2">
          {user && (
            <>
              <Link href="/">Home</Link>
              <Link href="/todos">Todos</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/settings">Settings</Link>
            </>
          )}
        </div>
        <div className="flex items-center mx-auto">
          {user ? (
            <form>
              <Button formAction={signout}>Sign out</Button>
            </form>
          ) : (
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
