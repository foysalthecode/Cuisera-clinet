import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Couldn not Found Requested Resources</p>
      <Button>
        <Link href={"/"}>Return Home</Link>
      </Button>
    </div>
  );
}
