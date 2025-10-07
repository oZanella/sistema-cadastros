"use client"

import * as React from "react"
import { Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function SettingsButton() {
    return (
        <Button className="cursor-pointer h-5 w-5" size={"icon"} variant={"ghost"}>
            <Link href={"/settings"}>
                <Settings />
            </Link>
        </Button>
    )
}