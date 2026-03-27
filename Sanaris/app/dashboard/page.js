import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function Dashboard() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/");
  }

  return <DashboardClient user={session.user} />;
}
