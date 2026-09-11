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
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { useState } from "react";

// type LoginOTPFormProps = {
//   email: string;
// };

const LoginOTPForm = () => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [ResendLoading, setResendLoading] = useState<boolean>(false);

  const router = useRouter();

  // useEffect(() => {
  //   const sendOTP = async () => {
  //     const { data, error } = await authClient.twoFactor.sendOtp({
  //       trustDevice: false,
  //     });

  //     console.log("SEND OTP:", {
  //       data,
  //       error,
  //     });
  //   };

  //   sendOTP();
  // }, []);

  const handleVerifyOtp = async () => {
    setError("");

    if (otp.length !== 6) {
      setError("Please inter 6 digit otp");
      return;
    }

    setLoading(true);

    const { data: verifyData, error } = await authClient.twoFactor.verifyOtp({
      code: otp,
      trustDevice: false,
    });

    if (verifyData) {
      toast.add({
        type: "success",
        description: "Login verification successful!",
      });

      router.push("/");
    }

    if (error) {
      toast.add({
        type: "Warning",
        description: error.message || "Fail to login verify",
      });
      setError("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Login Verify</CardTitle>
          <CardDescription>
            We sent a 6-digit login verification code to:
          </CardDescription>
          {/* <p className="mt-1 font-medium">
            Your Email: {email || "Your email is not found"}
          </p> */}
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
