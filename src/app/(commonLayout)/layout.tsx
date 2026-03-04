import { Footer } from "@/components/layout/Foooter";
import { Navbar } from "@/components/layout/Navbar";
import { userService } from "@/src/services/user.service";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}
