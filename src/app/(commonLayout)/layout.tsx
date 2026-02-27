import { Navbar } from "@/components/layout/Navbar";
import { userService } from "@/src/services/user.service";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const isLoggedIn = data?.user?.role;
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn}></Navbar>
      {children}
    </div>
  );
}
