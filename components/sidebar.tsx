"use client";

import { navLinks } from "@/lib/data";
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
import { Category } from "./category";

export const Sidebar = () => {
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/category", {
          method: "GET",
        });

        if (response.ok) {
          const categories = await response.json();
          setCategories(categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchData();
  }, []);

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
      <nav>
        {categories &&
          categories.map((category: any) => (
            <Category
              key={category.id}
              user={category.authorId}
              title={category.name}
            />
          ))}
      </nav>
    </div>
  );
};
