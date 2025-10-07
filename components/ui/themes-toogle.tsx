"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        theme === "dark" ? (
            <Button onClick={() => setTheme("light")}><Sun /></Button>
        ) : (
            < Button onClick={() => setTheme("dark")}><Moon /></Button>
        )
    )
}