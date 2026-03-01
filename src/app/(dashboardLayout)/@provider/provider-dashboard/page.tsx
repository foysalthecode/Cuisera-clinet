import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function ProviderDashboard() {
  return redirect("/provider-dashboard/create-meal");
}
