import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { FormComponent } from "../login/FormComponent";
import { signup } from "../login/actions";
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
        <h1 className="text-2xl font-bold text-gray-600">Sign up</h1>
        <p className="text-md text-gray-400">
          Enter your email below to sign up for free
        </p>
        <form
          id="login-form"
          className="flex w-full flex-col gap-y-5 mx-auto items-center"
        >
          <FormComponent mode={"signup"} />
        </form>
        <div className="flex items-center gap-x-2">
          <p className="text-s md:text-md text-gray-400">Already registered?</p>
          <Link href="/login">
            <p className="underline underline-offset-1 md:text-md text-s">
              Login here
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
