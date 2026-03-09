import { cookies } from "next/headers";
import { env } from "../env";

export interface feedBackType {
  review: number;
  content: string;
  userId: string;
  mealId: string;
}

const API_URL = env.API_URL;

export const feedBackService = {
  createFeedBack: async function (feedBackData: feedBackType) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(feedBackData),
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: "Feedback Submit failed" };
    }
  },
};
