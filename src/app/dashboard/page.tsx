import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = session.user.role;

  if (role === "ADMIN") {
    redirect("/dashboard/admin");
  } else if (role === "STAFF") {
    redirect("/dashboard/staff");
  } else {
    redirect("/dashboard/student");
  }
}
