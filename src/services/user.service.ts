import { cookies } from "next/headers";
import { env } from "../env";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export let isAuthenticated = false;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing" } };
      }

      if (session) {
        isAuthenticated = true;
      }

      return { data: session, error: null };
    } catch (err) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },
  getUserProfile: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/my-profile`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: "Cannot get User Profile" };
    }
  },

  logOutUser: async function () {
    try {
      const res = await fetch(`${API_URL}/api/logout`, {
        method: "POST",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: "Logout Failed" };
    }
  },
};
