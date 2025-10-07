import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui-padrao/sidebar-padrao";
import { AppSidebar } from "@/components/ui-padrao/app-sidebar";
import { ThemeProvider } from "@/src/providers/theme-provider";
import { ModeToggle } from "@/components/ui/themes-toogle";
import { SettingsButton } from "@/components/ui/settings-button";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
                </div>
              </header>
              <main className="flex-1 p-6">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}