"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchMeal() {
  const [searchMeal, setSearchMeal] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSearchMeal = async () => {
    const params = new URLSearchParams(searchParams);
    params.set("search", searchMeal.toString());
    router.push(`?${params.toString()}`);
    router.refresh();
  };
  return (
    <Field orientation="horizontal">
      <Input
        value={searchMeal}
        onChange={(e) => {
          setSearchMeal(e.target.value);
        }}
        type="text"
        placeholder="Search..."
      />
      <Button onClick={handleSearchMeal}>Search</Button>
    </Field>
  );
}
