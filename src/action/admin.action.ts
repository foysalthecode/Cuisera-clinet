"use server";

import { updateTag } from "next/cache";
import { adminService } from "../services/admin.service";
import { StatusUpdateData } from "../types";

export const updateUserStatus = async (
  id: string,
  statusData: StatusUpdateData,
) => {
  const res = await adminService.updateUserStatus(id, statusData);
  updateTag("user-status");
  return res;
};
