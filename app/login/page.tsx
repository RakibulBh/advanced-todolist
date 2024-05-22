import { Input } from "@/components/auth/input";
import { Button } from "@/components/ui/button";
import { emailLogin, signup } from "./actions";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

async function Login() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/todos");
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white w-[40%] h-[60%] flex items-center justify-center flex-col gap-y-5 border-2 border-gray-200 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-600">Login</h1>
        <p className="text-md text-gray-400">
          Enter your email below to login to your account
        </p>
        <form
          id="login-form"
          className="flex w-full flex-col gap-y-5 mx-auto items-center"
        >
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
          <Button formAction={emailLogin} className="w-full ">
            Login
          </Button>
        </form>
        <div className="flex items-center">
          <p className="text-md">Don&apos;t have an account?</p>
          <Button variant="link" form="login-form" formAction={signup}>
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
