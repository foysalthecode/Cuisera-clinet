"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserIcon } from "lucide-react";
import { ProfileAvatar } from "./Avatar";
import Logout from "../authentication/logout";
import Link from "next/link";

export function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <ProfileAvatar></ProfileAvatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={"/profile"}>
          <DropdownMenuItem>
            <UserIcon />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          <Logout></Logout>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
