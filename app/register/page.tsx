import { Register } from "@/components/auth/register";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function RegisterPage() {
  const session = await getServerSession();
  console.log(session);
  if (session) {
    redirect("/");
  }
  return <Register />;
}

export default RegisterPage;
