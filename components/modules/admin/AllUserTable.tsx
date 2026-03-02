"use client";

import { UsersTypes } from "@/src/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { updateUserStatus } from "@/src/action/admin.action";

const userSchema = z.object({
  id: z.string(),
  status: z.string(),
});

export function AllUserTable({ response }: { response: UsersTypes[] }) {
  const form = useForm({
    defaultValues: {
      id: "",
      status: "",
    },
    validators: {
      onSubmit: userSchema,
    },
    onSubmit: async ({ value }) => {
      const status = value.status;
      const id = value.id;
      const statusData = {
        status,
      };
      Swal.fire({
        title: "Updating Status",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const res = await updateUserStatus(id, statusData);
      console.log("user table", res.data.success);
      if (res?.data?.success) {
        Swal.close();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });
  return (
    <div>
      {response.map((data: UsersTypes) => (
        <div
          key={data.id}
          className="w-full flex justify-between items-center m-2 border rounded-lg p-3"
        >
          <div className=" w-8/12 flex justify-between">
            <h1>{data.name}</h1>
            <p>{data.role}</p>
          </div>
          <form
            id="status-update"
            onSubmit={(e) => {
              (e.preventDefault(), form.handleSubmit());
            }}
            className="flex gap-2"
          >
            <form.Field
              name="status"
              children={(field) => {
                return (
                  <Select
                    name={field.name}
                    onValueChange={(value: string) => {
                      (field.handleChange(value),
                        form.setFieldValue("id", data.id));
                    }}
                  >
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue placeholder={data.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="STALLED">Suspend</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            <Button form="status-update">Update</Button>
          </form>
        </div>
      ))}
    </div>
  );
}
