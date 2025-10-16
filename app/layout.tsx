"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui-padrao/sidebar-padrao";
import { AppSidebar } from "@/components/ui-padrao/app-sidebar";
import { ThemeProvider } from "@/src/providers/theme-provider";
import { ModeToggle } from "@/components/ui/themes-toogle";
import { SettingsButton } from "@/components/ui/settings-button";
import { LoginButton } from "@/components/ui/login-button";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/sign-up",
    "/auth/update-password",
    "/auth/forgot-password",
  ];
  const isPublicPage = publicRoutes.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {isPublicPage ? (
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex items-center justify-center min-h-screen">
              {children}
            </main>
          </ThemeProvider>
        ) : (
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={false}>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-13 shrink-0 items-center gap-2 border-b px-4">
                  <SidebarTrigger />
                  <div className="flex items-center w-full ml-1 justify-between">
                    <h1>Empresa Cadastro de Produtos</h1>
                  </div>
                  <div className="flex flex-row gap-2">
                    <ModeToggle />
                    <SettingsButton />
                    <LoginButton />
                  </div>
                </header>
                <main className="flex-1 p-6">{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
