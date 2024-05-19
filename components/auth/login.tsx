"use client";

import { signIn } from "next-auth/react";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./input";
import { Button } from "../ui/button";
import Link from "next/link";

export const Login = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (!response?.error) {
      router.push("/todos");
      router.refresh();
    }
  };

  return (
    <div className="w-full h-full flex items-center flex-col gap-y-10 justify-center">
      <h1 className="text-2xl font-bold text-gray-600 capitalize">Login</h1>
      <form
        className="flex flex-col gap-y-5 mx-auto items-center w-1/2"
        onSubmit={handleSubmit}
      >
        <Input type="email" name="email" id="email" placeholder="email" />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <div className="w-full flex justify-start">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link
              className="underline text-gray-500 underline-offset-2"
              href="/register"
            >
              Register here.
            </Link>
          </p>
        </div>
        <Button className="w-full ">Login</Button>
      </form>
    </div>
  );
};
