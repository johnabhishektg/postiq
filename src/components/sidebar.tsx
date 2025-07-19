"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import {
  Gem,
  Home,
  Key,
  LucideIcon,
  PanelLeft,
  Plus,
  Settings,
  Wallet,
} from "lucide-react";
import Link from "next/link";

interface SidebarItem {
  href: string;
  icon: LucideIcon;
  text: string;
}

interface SidebarCategory {
  category: string;
  items: SidebarItem[];
}

const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Overview",
    items: [{ href: "/dashboard", icon: Home, text: "Dashboard" }],
  },
  {
    category: "Account",
    items: [{ href: "/dashboard/upgrade", icon: Gem, text: "Upgrade" }],
  },
  {
    category: "Settings",
    items: [
      { href: "/dashboard/api-key", icon: Key, text: "API Key" },
      {
        href: "/dashboard/account-settings",
        icon: Settings,
        text: "Account Settings",
      },
    ],
  },
];

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="space-y-4 md:space-y-6 relative z-20 flex flex-col h-full">
      {/* logo */}
      <div className="flex items-center gap-2 rounded-3xl">
        <PanelLeft className="text-gray-400 w-3 h-3" />
        <p className="text-md/7 font-medium text-gray-500">postiq.</p>
      </div>
      {/* navigation items */}
      <hr className="w-full h-px bg-gray-100" />
      <div className="flex-grow">
        <li className="mb-4 md:mb-8 list-none">
          <div className="-mx-2 flex flex-1 flex-col">
            <Button className="bg-[#4f47e1] text-white font-bold rounded flex items-center gap-2 w-full cursor-pointer p-0">
              <Plus className="size-3" />
              New Post
            </Button>
            <Link
              href="/knowledge-dump"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6 text-zinc-700 hover:bg-gray-50 transition"
              )}
            >
              <div className="size-4 font-bold text-zinc-500 group-hover:text-zinc-700">
                🧠 Knowledge Base
              </div>
            </Link>

            <p className="text-xs font-medium leading-6 text-zinc-500 mt-4">
              Recents
            </p>
            <div className="text-xs text-gray-500 text-center mt-6">
              No post yet
            </div>
          </div>
        </li>
      </div>
      {/* <div className="flex-grow">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className="mb-4 md:mb-8">
              <p className="text-xs font-medium leading-6 text-zinc-500">
                {category}
              </p>
              <div className="-mx-2 flex flex-1 flex-col">
                {items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6 text-zinc-700 hover:bg-gray-50 transition"
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="size-4 text-zinc-500 group-hover:text-zinc-700" />
                    {item.text}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div> */}
      <div className="flex flex-col">
        <hr className="my-4 md:my-6 w-full h-px bg-gray-100" />
        <div>John Abhishek</div>
        {/* <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox: "flex-row-reverse",
            },
          }}
        /> */}
      </div>
    </div>
  );
};

export default Sidebar;
