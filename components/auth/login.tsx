"use client";

import { signIn } from "next-auth/react";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";

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
      router.push("/");
      router.refresh();
    }
  };

  return (
    <form className="flex flex-col gap-2 mx-auto" onSubmit={handleSubmit}>
      <input type="email" name="email" id="" placeholder="email" />
      <input type="password" name="password" id="" placeholder="password" />
      <button
        className="w-[10rem] p-2 rounded-md text-white bg-blue-500"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};
