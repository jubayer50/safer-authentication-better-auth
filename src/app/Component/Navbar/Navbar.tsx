"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "All Prompts",
      href: "/prompts",
    },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/80 backdrop-blur-lg">
      <header className="mx-auto flex max-w-330 items-center justify-between px-3 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h2 className="text-2xl font-bold">Logo</h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          {user ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Link href={"/signin"}>
              <Button>Signin</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger
            className="inline-flex items-center justify-center rounded-md hover:bg-accent md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>

          <SheetContent side="left" className="w-75">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="">
                  <h2 className="text-xl font-bold">Logo</h2>
                </Link>
              </SheetTitle>
            </SheetHeader>

            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </header>
    </nav>
  );
};

export default Navbar;
