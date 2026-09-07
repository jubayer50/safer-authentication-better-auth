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
import { imageUpload } from "@/lib/ImageUpload/ImageUpload";
import { ArrowUpFromLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type SignUpData = {
  name: string;
  email: string;
  password: string;
  image: FileList;
};

const SignupPage = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpData>();

  const handleImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imagePreviewUrl = URL.createObjectURL(file);
    setImageUrl(imagePreviewUrl);
  };

  const onSubmit = async (data: SignUpData) => {
    const imageFile = data.image?.[0];

    const imageLink = await imageUpload(imageFile);

    const signupNewData = { ...data, image: imageLink };

    const { data: authData, error } = await authClient.signUp.email({
      ...signupNewData,
    });

    if (authData?.token) {
      toast.add({ type: "success", description: "Signup successfully!" });

      const { data: otpData, error: otpError } =
        await authClient.emailOtp.sendVerificationOtp({
          email: data.email,
          type: "email-verification",
        });

      if (otpData) {
        toast.add({ type: "success", description: "OTP send successfully" });
      }

      if (otpError) {
        toast.add({ type: "warning", description: error || "Send otp failed" });
      }

      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
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
          <CardTitle>SignUp to your account</CardTitle>

          <CardDescription className="mt-3">
            Enter your information below to signup to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 ">
              <div>
                <Label
                  htmlFor="image"
                  className="w-16 h-16 rounded-full border mx-auto flex items-center justify-center overflow-hidden"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Profile Picture"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    ></Image>
                  ) : (
                    <ArrowUpFromLine size={30} />
                  )}

                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image", { onChange: handleImageUrl })}
                  ></Input>
                </Label>
              </div>

              <p className="mt-3 text-center">Upload Your profile Picture</p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", { required: "Name is required" })}
                />

                {errors && (
                  <p className="text-[12px] text-red-500">
                    {errors.name?.message}
                  </p>
                )}
              </div>

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
                Sign Up
              </Button>
              <Button variant="outline" className="w-full">
                Signup with Google
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="">
          <p className="mx-auto">
            If you have already account |{" "}
            <Link href={"/signin"} className="font-bold text-blue-600">
              Signin
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
