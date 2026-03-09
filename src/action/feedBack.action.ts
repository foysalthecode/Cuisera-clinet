"use server";

import { feedBackService, feedBackType } from "../services/feedback.service";

export const createFeedBack = async (feedBackData: feedBackType) => {
  const res = await feedBackService.createFeedBack(feedBackData);
  return res;
};
