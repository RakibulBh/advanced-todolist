"use client";

import React, { FormEvent } from "react";
import { Input } from "./input";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "react-hot-toast";

export const Register = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (response.ok) {
      toast.success("Registered successfully");
    } else {
      toast.error("Error registering");
    }
  };

  return (
    <div className="w-full h-full flex items-center flex-col gap-y-10 justify-center">
      <h1 className="text-2xl font-bold text-gray-600 capitalize">Register</h1>
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
        <p className="w-full text-sm flex justify-start">
          have an account?{""}
          <Link
            className="underline text-gray-500 underline-offset-2"
            href="/login"
          >
            Login here.
          </Link>
        </p>
        <Button className="w-full ">Register</Button>
      </form>
    </div>
  );
};
