"use client";

import * as React from "react";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LoginButton() {
  return (
    <Button className="cursor-pointer h-5 w-5" size={"icon"} variant={"ghost"}>
      <Link href={"/auth/login"}>
        <LogIn />
      </Link>
    </Button>
  );
}
