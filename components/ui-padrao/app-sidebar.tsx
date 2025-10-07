'use client';

import React, { useState } from 'react';
import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem
} from "./sidebar-padrao";
import { FileInput, Home, Package, User, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible";

const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home
    },
    {
        title: "Pessoas",
        url: "/person", icon: User
    },
    {
        title: "Produtos",
        url: "/product",
        icon: Package
    },
    {
        title: "Pedidos",
        url: "/docs",
        icon: FileInput
    },
];

export function AppSidebar() {
    // controla visualmente a rotação da seta
    const [open, setOpen] = useState(true);

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <Collapsible defaultOpen onOpenChange={(next) => setOpen(next)}>
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="flex items-center justify-between w-full">
                                            <span>Cadastro</span>
                                            <ChevronRight
                                                className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}
                                            />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {items.map((item) => (
                                                <SidebarMenuSubItem key={item.title}>
                                                    <Link
                                                        href={item.url}
                                                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                                                    >
                                                        <item.icon className="h-4 w-4" />
                                                        <span>{item.title}</span>
                                                    </Link>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
