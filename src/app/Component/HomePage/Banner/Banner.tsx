import {
  ArrowRight,
  CheckCircle2,
  FileLock2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-150 max-w-330 items-center gap-12 px-6 py-20 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            Your privacy matters
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-5xl font-bold tracking-tight sm:text-6xl">
            Keep Your Files
            <span className="block text-blue-600">Safer.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Protect your important files and personal information with a simple,
            secure, and reliable privacy solution.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>

          {/* Features */}
          <div className="mt-10 flex flex-wrap gap-6">
            <Feature
              icon={<FileLock2 className="h-5 w-5" />}
              text="File Protection"
            />

            <Feature
              icon={<LockKeyhole className="h-5 w-5" />}
              text="Private"
            />

            <Feature icon={<ShieldCheck className="h-5 w-5" />} text="Secure" />
          </div>
        </div>

        {/* Right Visual */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            {/* Main Card */}
            <div className="rounded-3xl border bg-card p-8 shadow-xl">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600/10">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600">
                    <LockKeyhole className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-semibold">
                  Your Data is Protected
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Safer keeps your important information secure and private.
                </p>
              </div>

              {/* Security Status */}
              <div className="mt-8 space-y-3">
                <SecurityItem text="Files are protected" />
                <SecurityItem text="Privacy is enabled" />
                <SecurityItem text="Security is active" />
              </div>
            </div>

            {/* Small Status */}
            <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-background px-5 py-3 shadow-lg">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

              <span className="text-sm font-medium">Protection Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="text-blue-600">{icon}</div>

      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

const SecurityItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-muted/30 px-4 py-3">
      <CheckCircle2 className="h-5 w-5 text-green-500" />

      <span className="text-sm">{text}</span>
    </div>
  );
};

export default Banner;
