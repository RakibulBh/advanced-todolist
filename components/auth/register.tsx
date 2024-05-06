"use client";

import React, { FormEvent } from "react";

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

    console.log(response);
  };

  return (
    <form className="flex flex-col gap-2 mx-auto" onSubmit={handleSubmit}>
      <input type="email" name="email" id="" placeholder="email" />
      <input type="password" name="password" id="" placeholder="password" />
      <button
        className="w-[10rem] p-2 rounded-md text-white bg-blue-500"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
