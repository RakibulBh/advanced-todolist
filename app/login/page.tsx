import { Button } from "@/components/ui/button";
import { signup } from "./actions";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { FormComponent } from "./FormComponent";
import Link from "next/link";

async function Login() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/todos");
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white w-[300px] md:w-[40%] h-[60%] flex items-center justify-center flex-col gap-y-5 border-2 border-gray-200 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-600">Login</h1>
        <p className="text-md text-gray-400">
          Enter your email below to login to your account
        </p>
        <form
          id="login-form"
          className="flex w-full flex-col gap-y-5 mx-auto items-center"
        >
          <FormComponent mode="login" />
        </form>
        <div className="flex items-center gap-x-2">
          <p className="text-s md:text-md text-gray-400">
            Don&apos;t have an account?
          </p>
          <Link href="/signup">
            <p className="underline underline-offset-1 md:text-md text-s">
              Sign up here.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
