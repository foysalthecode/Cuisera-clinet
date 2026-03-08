import { redirect } from "next/navigation";

export default function UserDashboard() {
  return redirect("/dashboard/my-order");
}
