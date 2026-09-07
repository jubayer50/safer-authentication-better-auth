"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

type LoginOTPFormProps = {
  email: string;
};

const LoginOTPForm = ({ email }: LoginOTPFormProps) => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [ResendLoading, setResendLoading] = useState<boolean>(false);

  const handleVerifyOtp = async () => {};

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Login Verify</CardTitle>
          <CardDescription>
            We sent a 6-digit login verification code to:
          </CardDescription>
          <p className="mt-1 font-medium">
            Your Email: {email || "Your email is not found"}
          </p>
        </CardHeader>

        <CardContent className="mt-8">
          <div>
            <Label>Enter your 6 Digit code</Label>
            <Input
              type="text"
              inputMode="numeric"
              className={"w-full mt-2"}
              maxLength={6}
              value={otp}
              placeholder="Enter code"
              onChange={(e) => setOtp(e.target.value)}
            ></Input>

            {error && (
              <p className="mt-0.5 text-red-600 text-[12px]">{error}</p>
            )}
          </div>

          <div className="mt-5">
            <Button onClick={handleVerifyOtp} className={"w-full"}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>

          <div className="mt-3">
            <Button
              onClick={handleVerifyOtp}
              variant={"link"}
              className={"w-full"}
            >
              {ResendLoading ? "Resending..." : "Resend OTP"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginOTPForm;
