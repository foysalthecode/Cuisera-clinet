import ProfileCard from "@/components/modules/profile/profileCard";
import { userService } from "@/src/services/user.service";

export default async function MyProfile() {
  const { data } = await userService.getUserProfile();
  return (
    <div className="mb-44">
      <ProfileCard user={data}></ProfileCard>
    </div>
  );
}
