import { env } from "@/src/env";
import { createAuthClient } from "better-auth/react";

const API_URL = process.env.API_URL;

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // baseURL: "http://localhost:5000",
  // baseURL: "https://cuisera-server.vercel.app",
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  },
});
