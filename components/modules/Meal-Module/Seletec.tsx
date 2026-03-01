"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export function SelectGroups() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onChage = async (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value.toString());
    router.push(`?${params.toString()}`);
    console.log(value);
  };
  return (
    <Select onValueChange={onChage}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Sort By Price" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="asc">Low To High</SelectItem>
          <SelectItem value="desc">High To Low</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
