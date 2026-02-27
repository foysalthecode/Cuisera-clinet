"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Logout() {
  const router = useRouter();
  const handleSignOut = async () => {
    const toastId = toast.loading("Signing out...");
    const data = await authClient.signOut();
    if (data.data?.success) {
      router.push("/login");
    }
    toast.success("Logout success", { id: toastId });
  };
  return <Button onClick={handleSignOut}>Logout</Button>;
}
