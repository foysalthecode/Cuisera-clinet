import { Button } from "@/components/ui/button";
import { userService } from "@/src/services/user.service";

export default async function Home() {
  const { data } = await userService.getSession();
  console.log(data);
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
