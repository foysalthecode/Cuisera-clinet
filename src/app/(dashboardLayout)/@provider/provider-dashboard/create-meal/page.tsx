import CreateMealFormClient from "@/components/modules/provider/createMeal/CreateMealFormClient";
import { userService } from "@/src/services/user.service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CreateMeal() {
  const { data: userData } = await userService.getSession();
  if (!userData?.user?.id) {
    redirect("/login");
  }
  const UserId = userData?.user?.id as string;

  return (
    <div>
      <CreateMealFormClient UserId={UserId}></CreateMealFormClient>
    </div>
  );
}
