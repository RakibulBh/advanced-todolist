import Link from "next/link";
import { Button } from "./ui/button";
import {
  AlarmClockCheck,
  Calendar,
  CalendarCheck,
  CalendarClock,
  CircleUser,
  Hash,
  Home,
  Settings,
  Trash2,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { signout } from "@/app/login/actions";
import { Breaker } from "./breaker";
import Navlink from "./nav-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// TODO: center nav contents

export const Sidebar = async () => {
  const summaryData = [
    {
      title: "Today",
      count: 7,
    },
    {
      title: "Upcoming",
      count: 7,
    },
    {
      title: "Future",
      count: 7,
    },
  ];

  const navData = [
    {
      name: "Home",
      link: "/",
      icon: <Home />,
    },
    {
      name: "Todos",
      link: "/todos",
      icon: <CalendarCheck />,
    },
    {
      name: "Categories",
      link: "/categories",
      icon: <CalendarClock />,
    },
    {
      name: "Settings",
      link: "/settings",
      icon: <Settings />,
    },
  ];

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  return (
    <div className="flex pt-10 pb-3 px-3 space-y-6 fixed h-screen w-[250px] md:w-[350px] bg-gray-100 border-r-gray-200 border-[1px] flex-col justify-between rounded-r-xl">
      <div className="flex gap-x-2 items-center">
        <AlarmClockCheck size={30} />
        <h1 className="font-bold md:text-2xl text-xl">Todo Manager</h1>
      </div>
      <Breaker />
      {user && (
        <div className="flex flex-col">
          {navData.map((data) => (
            <Navlink
              key={data.name}
              name={data.name}
              link={data.link}
              icon={data.icon}
            />
          ))}
        </div>
      )}
      {user && <Breaker />}
      <div className="flex flex-col h-full gap-y-8">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-full flex p-3 gap-x-4 bg-gray-200 items-center rounded-xl">
                <CircleUser size={30} />
                <div>
                  <h1 className="md:text-md text-sm font-bold">{user.email}</h1>
                  <p className="text-gray-400 text-xs  md:text-sm">User</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="items-center justify-center flex hover:cursor-default hover:bg-white">
                <form>
                  <Button formAction={signout}>Sign out</Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {!user && (
          <Link href="/login">
            <Button className="w-full">Sign in</Button>
          </Link>
        )}
        {user && (
          <>
            <div className="flex flex-col gap-y-3">
              {summaryData.map((data) => (
                <div
                  key={data.title}
                  className="flex justify-between items-center"
                >
                  <div className="flex gap-x-3 items-center">
                    <Hash className="text-gray-300" />
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
          </>
        )}
      </div>
    </div>
  );
};
