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
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type EmailVerifyProps = {
  email: string;
};

const EmailVerifyForm = ({ email }: EmailVerifyProps) => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((pre) => pre - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const router = useRouter();

  const handleVerify = async () => {
    setError("");

    if (!email) {
      return setError("Email is missing");
    }

    if (otp.length !== 6) {
      setError("Please enter a 6 digit otp.");
      return;
    }

    setLoading(true);
    console.log(email, otp);

    const { data, error } = await authClient.emailOtp.verifyEmail({
      email,
      otp,
    });

    setLoading(false);

    console.log("Verify data:", data);
    console.log("Verify error:", error);

    if (data) {
      router.push("/");
    }

    if (error) {
      setError(error?.message || "Verification failed");
    }
  };

  // const handleSendOTP = async () => {
  //   setError("");

  //   if (!email) {
  //     setError("Email is missing.");
  //     return;
  //   }

  //   const { data, error } = await authClient.emailOtp.sendVerificationOtp({
  //     email,
  //     type: "email-verification",
  //   });

  //   if (error) {
  //     setError(error.message || "Failed to send OTP.");
  //     return;
  //   }

  //   console.log("OTP sent successfully");
  // };

  const handleResendOTP = async () => {
    setError("");

    if (!email) {
      setError("Email is missing");
      return;
    }

    if (resendCooldown > 0) return;

    setResendLoading(true);

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });

    setResendLoading(false);

    if (error) {
      setError(error.message || "Failed to resend OTP.");
      return;
    }

    setResendCooldown(60);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            We sent a 6-digit verification code to:
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
            <Button onClick={handleVerify} className={"w-full"}>
              {loading ? "Verifying Email..." : "Verify Email"}
            </Button>
          </div>

          <div className="mt-5">
            <Button
              variant={"outline"}
              onClick={handleResendOTP}
              disabled={resendLoading || resendCooldown > 0}
              className={"w-full"}
            >
              {resendLoading
                ? "Sending..."
                : resendCooldown > 0
                  ? `Resend available in ${resendCooldown}s`
                  : "Resend code"}
            </Button>
          </div>

          {/* <div>
            <Button
              type="button"
              variant="outline"
              onClick={handleSendOTP}
              className="w-full mt-3"
            >
              Send Verification Code
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerifyForm;
