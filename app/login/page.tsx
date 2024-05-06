import { Login } from "@/components/auth/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <Login />;
}

export default LoginPage;
