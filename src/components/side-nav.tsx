"use client";

import { PanelLeft, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

const items = [
  {
    title: "Canvas",
    url: "#",
    icon: "✏️",
  },
  {
    title: "Knowledge Base",
    url: "#",
    icon: "🧠",
  },
  {
    title: "Calendar",
    url: "#",
    icon: "📅",
  },
  {
    title: "Account",
    url: "#",
    icon: "👤",
  },
  {
    title: "Settings",
    url: "#",
    icon: "⚙️",
  },
];

function SideNav() {
  const { open, toggleSidebar } = useSidebar();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex flex-row items-center">
        <Button
          onClick={toggleSidebar}
          variant="outline"
          className="rounded-full w-8 h-8 cursor-pointer"
        >
          <PanelLeft className="text-zinc-700 w-8" />
        </Button>
        {open ? (
          <span className="text-sm font-medium text-gray-500">postiq.</span>
        ) : (
          ""
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu className={`${open == true ? "" : "items-center"}`}>
            {open ? (
              <SidebarMenuButton className="bg-[#4f47e1] text-white font-bold flex items-center justify-center cursor-pointer rounded-xl">
                <Plus className="w-7 h-7" /> New Post{" "}
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton className="bg-[#4f47e1] text-white font-bold flex  rounded-full">
                <Plus className="w-7 h-7" />
              </SidebarMenuButton>
            )}
            <SidebarGroupLabel>Write</SidebarGroupLabel>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-bold text-zinc-500">
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default SideNav;
