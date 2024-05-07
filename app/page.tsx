import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    redirect("/page/someslug");
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p className="text-gray-500">Sign in to get started!</p>
    </div>
  );
}
