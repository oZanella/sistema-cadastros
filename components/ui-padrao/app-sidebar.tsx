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
  HandCoinsIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../ui/collapsible";
import Image from "next/image";

const fixItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
];

const pessoasItems = [
  {
    title: "Clientes",
    url: "/person",
  },
  {
    title: "Fornecedores",
    url: "/supplier",
  },
];

const produtosSubItems = [
  {
    title: "Produtos",
    url: "/product/products",
  },
  {
    title: "Unidade de Medida",
    url: "/product/units",
  },
  {
    title: "Marcas",
    url: "/product/brands",
  },
  {
    title: "Subtipo",
    url: "/product/subtype",
  },
];

const financeiroItems = [
  {
    title: "Contas a Pagar",
    url: "/finance/pay",
    icon: CoinsIcon,
  },
  {
    title: "Contas a Receber",
    url: "/finance/receive",
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
  const [PessoasOpen, setPessoasOpen] = useState(false);
  const [ProdutosOpen, setProdutosOpen] = useState(false);
  const [FinanceOpen, setFinanceOpen] = useState(false);

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
                  <div className="flex items-center gap-3 px-3 py-4 border-b">
                    <div className="h-9 w-9 rounded-full overflow-hidden flex items-center justify-center">
                      <Image
                        src="/images/logo-zynk.png"
                        alt="Logo Zynk"
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>

                    <span className="font-semibold text-lg">Zynk Sistema</span>
                  </div>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <div className="flex items-center gap-2 px-2 py-1.5">
                    <span>Geral</span>
                  </div>

                  <CollapsibleContent>
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
                      {/* PEOPLE */}
                      <SidebarMenuSubItem>
                        <Collapsible
                          open={PessoasOpen}
                          onOpenChange={setPessoasOpen}
                        >
                          <CollapsibleTrigger asChild>
                            <button className="flex w-full items-center justify-between px-2 py-1.5 hover:bg-accent rounded-md transition-colors">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>Pessoas</span>
                              </div>

                              <ChevronRight
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  PessoasOpen ? "rotate-90" : ""
                                }`}
                              />
                            </button>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <SidebarMenuSub className="ml-4">
                              {pessoasItems.map((item) => (
                                <SidebarMenuSubItem key={item.title}>
                                  <Link
                                    href={item.url}
                                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                                  >
                                    <span>{item.title}</span>
                                  </Link>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuSubItem>
                      {/* PRODUCTS */}
                      <SidebarMenuSubItem>
                        <Collapsible
                          open={ProdutosOpen}
                          onOpenChange={setProdutosOpen}
                        >
                          <CollapsibleTrigger asChild>
                            <button className="flex w-full items-center justify-between px-2 py-1.5 hover:bg-accent rounded-md transition-colors">
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                <span>Produtos</span>
                              </div>

                              <ChevronRight
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  ProdutosOpen ? "rotate-90" : ""
                                }`}
                              />
                            </button>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <SidebarMenuSub className="ml-4">
                              {produtosSubItems.map((item) => (
                                <SidebarMenuSubItem key={item.title}>
                                  <Link
                                    href={item.url}
                                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                                  >
                                    <span>{item.title}</span>
                                  </Link>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuSubItem>
                      {/* FINANCE */}
                      <SidebarMenuSubItem>
                        <Collapsible
                          open={FinanceOpen}
                          onOpenChange={setFinanceOpen}
                        >
                          <CollapsibleTrigger asChild>
                            <button className="flex w-full items-center justify-between px-2 py-1.5 hover:bg-accent rounded-md transition-colors">
                              <div className="flex items-center gap-2">
                                <HandCoinsIcon className="h-4 w-4" />
                                <span>Financeiro</span>
                              </div>

                              <ChevronRight
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  FinanceOpen ? "rotate-90" : ""
                                }`}
                              />
                            </button>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <SidebarMenuSub className="ml-4">
                              {financeiroItems.map((item) => (
                                <SidebarMenuSubItem key={item.title}>
                                  <Link
                                    href={item.url}
                                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                                  >
                                    <span>{item.title}</span>
                                  </Link>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuSubItem>
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
