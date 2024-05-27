"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { emailLogin, signup } from "./actions";

export const FormComponent = ({ mode }: { mode: "signup" | "login" }) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="abdi@example.com"
      />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <Button
        disabled={pending}
        formAction={mode === "signup" ? signup : emailLogin}
        className="w-full "
      >
        {mode === "signup" && !pending && "Sign up"}
        {mode === "login" && !pending && "Log in"}
        {pending && mode === "signup" && "Signing up..."}
        {pending && mode === "login" && "Logging in..."}
      </Button>
    </>
  );
};
