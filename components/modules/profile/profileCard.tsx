"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  name: string;
  email: string;
  emailVerified: true;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  phone: string;
  status: string;
  id: string;
}

export default function UserProfileBigCard({ user }: { user: User }) {
  const initials =
    user?.name
      ?.trim()
      ?.split(" ")
      ?.slice(0, 2)
      ?.map((n) => n[0])
      ?.join("") ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  return (
    <div className="w-full">
      <Card className="w-11/12 mx-auto overflow-hidden rounded-3xl border bg-background shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border">
              <AvatarImage src={user?.image ?? undefined} alt={user?.name} />
              <AvatarFallback className="font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-xl font-semibold">
                  {user?.name ?? "Unnamed User"}
                </h2>

                <Badge
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    user?.status === "ACTIVE"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-white"
                  }`}
                >
                  {user?.status ?? "UNKNOWN"}
                </Badge>

                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 text-xs"
                >
                  {user?.role ?? "USER"}
                </Badge>
              </div>

              <p className="mt-1 truncate text-sm text-muted-foreground">
                {user?.email ?? "No email"}
              </p>
            </div>
          </div>

          {/* Right mini info */}
          <div className="grid w-full gap-3 md:w-auto md:grid-cols-2">
            <div className="rounded-2xl border bg-muted/30 px-4 py-3">
              <p className="text-[11px] text-muted-foreground">Email</p>
              <p className="mt-1 text-sm font-semibold">
                {user?.emailVerified ? "Verified" : "Not verified"}
              </p>
            </div>

            <div className="rounded-2xl border bg-muted/30 px-4 py-3">
              <p className="text-[11px] text-muted-foreground">Phone</p>
              <p className="mt-1 text-sm font-semibold">
                {user?.phone ?? "Not added"}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Body */}
        <div className="grid gap-5 p-6 md:grid-cols-3">
          {/* Left: Identity */}
          <div className="rounded-2xl border p-5 md:col-span-1">
            <p className="text-sm font-semibold">Identity</p>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">User ID</p>
                <p className="max-w-[70%] truncate text-sm font-medium">
                  {user?.id ?? "—"}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="text-sm font-medium">{user?.role ?? "—"}</p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm font-medium">{user?.status ?? "—"}</p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">Profile Image</p>
                <p className="text-sm font-medium">
                  {user?.image ? "Available" : "Not added"}
                </p>
              </div>
            </div>
          </div>

          {/* Middle: Timeline */}
          <div className="rounded-2xl border p-5 md:col-span-1">
            <p className="text-sm font-semibold">Activity</p>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl border bg-muted/20 p-4">
                <p className="text-[11px] text-muted-foreground">
                  Profile Created
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {user?.createdAt ?? "—"}
                </p>
              </div>

              <div className="rounded-xl border bg-muted/20 p-4">
                <p className="text-[11px] text-muted-foreground">Last Update</p>
                <p className="mt-1 text-sm font-semibold">
                  {user?.updatedAt ?? "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Account Summary */}
          <div className="rounded-2xl border p-5 md:col-span-1">
            <p className="text-sm font-semibold">Account Summary</p>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl border bg-emerald-50/40 p-4">
                <p className="text-[11px] text-muted-foreground">Security</p>
                <p className="mt-1 text-sm font-semibold">
                  {user?.emailVerified
                    ? "Email verified"
                    : "Email not verified"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Keep your email verified to secure your account.
                </p>
              </div>

              <div className="rounded-xl border bg-muted/20 p-4">
                <p className="text-[11px] text-muted-foreground">Tip</p>
                <p className="mt-1 text-sm font-semibold">
                  Complete your profile
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Add a profile photo + phone for smoother order confirmations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div className="flex flex-col gap-2 border-t bg-muted/10 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            Keep your information updated for a better experience.
          </p>
          <p className="text-xs text-muted-foreground">
            Status:{" "}
            <span className="font-semibold text-foreground">
              {user?.status ?? "—"}
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}
