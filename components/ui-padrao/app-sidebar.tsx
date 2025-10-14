"use client";

import React, { useState } from "react";
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
  SidebarMenuSubItem,
} from "./sidebar-padrao";
import {
  Home,
  Package,
  User,
  ChevronRight,
  File,
  CoinsIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../ui/collapsible";

const fixItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
];

const cadastroItems = [
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
    title: "Financeiro",
    url: "/finance",
    icon: CoinsIcon,
  },
];

const emissaoItems = [
  {
    title: "Pedido",
    url: "/docs/order",
    icon: File,
  },
  {
    title: "Orçamento",
    url: "/docs/salesorder",
    icon: File,
  },
  {
    title: "Ordem de Serviço",
    url: "/docs/orderservice",
    icon: File,
  },
];

export function AppSidebar() {
  const [geralOpen, setGeralOpen] = useState(true);
  const [CadastroOpen, setCadastroOpen] = useState(true);
  const [VendasOpen, setVendasOpen] = useState(true);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible
                defaultOpen
                open={geralOpen}
                onOpenChange={setGeralOpen}
              >
                <SidebarMenuItem>
                  <div className="flex items-center gap-2 px-2 py-1.5">
                    <span>Geral</span>
                  </div>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {fixItems.map((item) => (
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

              <Collapsible
                defaultOpen
                open={CadastroOpen}
                onOpenChange={setCadastroOpen}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center justify-between w-full cursor-pointer">
                      <span>Cadastro</span>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-200 ${
                          CadastroOpen ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {cadastroItems.map((item) => (
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

              <Collapsible
                defaultOpen
                open={VendasOpen}
                onOpenChange={setVendasOpen}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center justify-between w-full cursor-pointer">
                      <span>Vendas</span>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-200 ${
                          VendasOpen ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {emissaoItems.map((item) => (
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
