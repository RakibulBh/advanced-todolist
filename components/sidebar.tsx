"use client";
import Link from "next/link";
import Navlink from "./nav-link";
import { getServerSession } from "next-auth";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { LoginBtn } from "./auth/login-btn";
import { Logout } from "./auth/logout";
import { Calendar, CalendarCheck, CalendarClock, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export const Sidebar = () => {
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

  return (
    <div className="pt-10 px-3 space-y-6 fixed h-screen w-[250px] bg-gray-100 border-r-gray-200 border-[1px]">
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
    </div>
  );
};
