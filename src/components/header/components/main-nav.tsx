"use client";

import NextLink from "next/link";
import { Play, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <NextLink
        href="/"
        className={`${
          !(pathname === "/") ? "text-muted-foreground" : ""
        } inline-flex items-center text-sm font-medium transition-colors hover:text-primary`}
      >
        <PlusCircle className="mr-1" />
        New session
      </NextLink>
      <NextLink
        href="/join"
        className={`${
          !(pathname === "/join") ? "text-muted-foreground" : ""
        } inline-flex items-center text-sm font-medium transition-colors hover:text-primary`}
      >
        <Play className="mr-1" />
        Join Session
      </NextLink>
    </nav>
  );
}