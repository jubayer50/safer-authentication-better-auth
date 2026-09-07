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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type SignInData = {
  email: string;
  password: string;
};

const SigninPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInData>();

  const onSubmit = async (data: SignInData) => {
    const { data: authData, error } = await authClient.signIn.email({
      ...data,
    });

    if (authData?.token) {
      toast.add({ type: "success", description: "Signing successful!" });
      // const response = await fetch("/api/send-email", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     to: data.email,
      //     subject: "Welcome",
      //     html: "<p>welcome to our website</p>",
      //   }),
      // });

      router.push("/");
    } else {
      toast.add({
        type: "warning",
        description: error?.statusText || "Something went wrong!",
      });
    }

    reset();
  };

  return (
    <div className="flex items-center justify-center px-3 h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>SignIn to your account</CardTitle>

          <CardDescription className="mt-3">
            Enter your information below to signin to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { required: "Email is required" })}
                />

                {errors && (
                  <p className="text-[12px] text-red-500">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                {errors && (
                  <p className="text-[12px] text-red-500">
                    {errors.password?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3 mt-5">
              <Button type="submit" className="w-full">
                Signin
              </Button>
              <Button variant="outline" className="w-full">
                Signup with Google
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="">
          <p className="mx-auto">
            If you do not have account |{" "}
            <Link href={"/signup"} className="font-bold text-blue-600">
              Signup
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SigninPage;
