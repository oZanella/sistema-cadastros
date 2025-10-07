import Link from "next/link";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./sidebar-padrao";
import { Home, Package, Settings, User } from "lucide-react";

const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "Pessoas",
        url: "/person",
        icon: User,
    },
    {
        title: "Produtos",
        url: "/product",
        icon: Package,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>CADASTROS</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}