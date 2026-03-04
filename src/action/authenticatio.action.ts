"use server";

import { authClient } from "@/lib/auth-client";

interface valueType {
  email: string;
  password: string;
}

export const userLogin = async (value: valueType) => {
  const res = await authClient.signIn.email(value);
  console.log("form login action", value);
  return res;
};
