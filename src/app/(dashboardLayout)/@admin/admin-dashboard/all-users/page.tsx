import { AllUserTable } from "@/components/modules/admin/AllUserTable";
import { adminService } from "@/src/services/admin.service";

export default async function AllUsers() {
  const { data } = await adminService.getAllUser();
  const response = data?.data;
  const totalUser = response?.length;
  return (
    <div>
      <h1 className="text-2xl text-green-400 font-bold">
        Total User : {totalUser}
      </h1>
      <AllUserTable response={response}></AllUserTable>
    </div>
  );
}
