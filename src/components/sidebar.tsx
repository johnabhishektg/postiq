"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, PanelLeft, Plus } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { NavItems } from "./nav-items";
import { Button, buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const Sidebar = () => {
  const navItems = NavItems();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div>
      <div
        className={cn(
          isSidebarExpanded ? "w-[220px]" : "w-[68px]",
          "border-r transition-all duration-300 ease-in-out transform hidden sm:flex h-full bg-white text-sm font-medium leading-6 text-zinc-700"
        )}
      >
        {/* logo */}

        <aside className="flex h-full flex-col w-full break-words px-4 overflow-x-hidden columns-1">
          <div className="mt-4 relative pb-2">
            <div className="flex items-center gap-2 rounded-3xl">
              <Button
                onClick={toggleSidebar}
                variant="outline"
                className="rounded-full cursor-pointer"
              >
                <PanelLeft className="text-zinc-700 w-8" />
              </Button>
              {isSidebarExpanded ? (
                <p className="text-sm font-medium text-gray-500">postiq.</p>
              ) : (
                ""
              )}
            </div>
            <hr className="w-full h-px bg-gray-100 my-3" />
            <Button className="bg-[#4f47e1] text-white font-bold rounded flex items-center gap-2 w-full cursor-pointer p-0">
              <Plus size={16} />
              {isSidebarExpanded ? "New Post" : ""}
            </Button>

            {isSidebarExpanded ? (
              <p className="text-xs font-medium leading-6 text-zinc-500 my-2">
                Recents
              </p>
            ) : (
              <hr className="w-full h-px bg-gray-100 my-3" />
            )}

            <div className="flex flex-col space-y-1">
              {navItems.map((item, idx) => {
                if (item.position === "top") {
                  return (
                    <SideNavItem
                      key={idx}
                      label={item.name}
                      icon={item.icon}
                      active={item.active}
                      path={item.href}
                      isSidebarExpanded={isSidebarExpanded}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div className="sticky bottom-15 mt-auto whitespace-nowrap mb-4 transition duration-200 block">
            {navItems.map((item, idx) => {
              if (item.position === "bottom") {
                return (
                  <Fragment key={idx}>
                    <div className="space-y-1">
                      <SideNavItem
                        label={item.name}
                        icon={item.icon}
                        path={item.href}
                        active={item.active}
                        isSidebarExpanded={isSidebarExpanded}
                      />
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
        </aside>

        {/* navigation items */}
      </div>
    </div>
  );
};

export const SideNavItem: React.FC<{
  label: string;
  icon: any;
  active: any;
  path: string;
  isSidebarExpanded: boolean;
}> = ({ label, icon, path, active, isSidebarExpanded }) => {
  return (
    <>
      {isSidebarExpanded ? (
        <Link
          href={path}
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: `text-left relative flex items-center justify-start ${
                active ? "bg-gray-50 text-accent-foreground" : ""
              } `,
            })
          )}
          // className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
          //   active
          //     ? "font-base text-sm bg-neutral-200 shadow-sm text-neutral-700 dark:bg-neutral-800 dark:text-white"
          //     : "hover:bg-neutral-200 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          // }`}
        >
          <div className="relative size-4 font-bold text-zinc-500 group-hover:text-zinc-700">
            {icon}
            <span> {label}</span>
          </div>
        </Link>
      ) : (
        <TooltipProvider delayDuration={70}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={path}
                className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                  active
                    ? "font-base text-sm bg-gray-50 text-neutral-700 dark:bg-neutral-800 dark:text-white"
                    : "hover:bg-gray-50 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                }`}
              >
                <div className="relative font-bold text-md p-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                  {icon}
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="px-3 py-1.5 text-xs"
              sideOffset={10}
            >
              <span>{label}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};

{
  /* <hr className="w-full h-px bg-gray-100" />
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
              No post yet */
}
