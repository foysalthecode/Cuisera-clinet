"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { authClient } from "@/lib/auth-client";
import { env } from "@/src/env";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as z from "zod";

const FRONTEND_URL = process.env.FRONTEND_URL;

const formSchema = z.object({
  name: z.string().min(1, "This Field is required"),
  email: z.email(),
  password: z.string().min(8, "Minimum 8 Character required"),
  role: z.string(),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: FRONTEND_URL,
    });
    console.log(data);
  };
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing...");
      try {
        const { data, error } = await authClient.signUp.email(value);
        const errorMessage = error?.message!;
        if (error) {
          toast.error(errorMessage, { id: toastId });
          return;
        }
        toast.success("Sucessfully Logged in", { id: toastId });
        router.push("/");
      } catch (err) {
        toast.error("Internel Server Error", { id: toastId });
      }
    },
  });
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="sign-up-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* name section */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></Input>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )}
                  </Field>
                );
              }}
            />
            {/* email section */}
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></Input>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )}
                  </Field>
                );
              }}
            />
            {/* password section */}
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></Input>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )}
                  </Field>
                );
              }}
            />
            {/* role section */}
            <form.Field
              name="role"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel>Choose Role</FieldLabel>
                    <RadioGroup
                      defaultValue="CUSTOMER"
                      onValueChange={(value) => field.handleChange(value)}
                      className="w-fit"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="USER" id="r2" />
                        <Label htmlFor="r2">Customer</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="PROVIDER" id="r3" />
                        <Label htmlFor="r3">Provider</Label>
                      </div>
                    </RadioGroup>
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button form="sign-up-form" type="submit" className="w-full">
          Sign up
        </Button>
        <Button
          onClick={() => handleGoogleLogin()}
          variant="outline"
          type="button"
          className="w-full"
        >
          Login with Google
        </Button>
        <FieldDescription className="text-center">
          Already have an account? <Link href="login">Login</Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
}
