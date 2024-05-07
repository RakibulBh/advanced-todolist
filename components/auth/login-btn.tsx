"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

export const LoginBtn = async () => {
  return (
    <Link href="/login">
      <Button>Sign in</Button>
    </Link>
  );
};
