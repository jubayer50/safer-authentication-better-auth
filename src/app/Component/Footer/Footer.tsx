import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-330 px-6 py-12 lg:px-8">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                <LockKeyhole className="h-5 w-5 text-white" />
              </div>

              <span className="text-xl font-bold">Safer</span>
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              A simple and secure solution to protect your important files and
              personal information. Your privacy, our priority.
            </p>

            {/* Security Badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" />

              <span className="text-xs font-medium">
                Built with security in mind
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">Product</h3>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="#features"
                  className="transition-colors hover:text-foreground"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="transition-colors hover:text-foreground"
                >
                  How It Works
                </a>
              </li>

              <li>
                <a
                  href="#security"
                  className="transition-colors hover:text-foreground"
                >
                  Security
                </a>
              </li>

              <li>
                <a
                  href="#faq"
                  className="transition-colors hover:text-foreground"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold">Support</h3>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="#contact"
                  className="transition-colors hover:text-foreground"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="#privacy"
                  className="transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#terms"
                  className="transition-colors hover:text-foreground"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Safer. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <SocialLink
              href="mailto:hello@safer.com"
              label="Email"
              icon={<Mail className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {icon}
    </a>
  );
};

export default Footer;
