import ProfileCard from "@/components/modules/profile/profileCard";
import { userService } from "@/src/services/user.service";

export const dynamic = "force-dynamic";

export default async function MyProfile() {
  const { data: userData } = await userService.getSession();
  const data = userData?.user || {};
  console.log(data);
  return (
    <div className="mb-44">
      <ProfileCard user={data}></ProfileCard>
    </div>
  );
}
