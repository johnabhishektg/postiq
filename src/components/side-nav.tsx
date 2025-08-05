"use client";

import { cn } from "@/lib/utils";
import {
  AudioWaveform,
  Brain,
  Calendar,
  ChevronsDownUp,
  LibraryBig,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from "./ui/sidebar";

function SideNav() {
  const { open, toggleSidebar, state } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      className="bg-white border-r border-zinc-200"
      variant="inset"
      collapsible="icon"
    >
      <SidebarHeader className="space-y-3">
        <div className="text-sm text-center font-medium text-gray-500">
          postiq.
        </div>
        <Button variant="outline" className="cursor-pointer">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/evilrabbit.png" />
              <AvatarFallback>John Abhishek</AvatarFallback>
            </Avatar>
          </div>

          <div
            className={cn(
              "flex items-center gap-2",
              isCollapsed ? "hidden" : "flex"
            )}
          >
            <h3 className="text-zinc-400">Professional</h3>
            <ChevronsDownUp />
          </div>
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            className={cn(
              "transition-all duration-200 ease-out px-3 opacity-100  overflow-hidden"
            )}
          >
            Create
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Link
              href={"#"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start gap-2 px-3 py-2",
                })
              )}
            >
              <div className="size-6 flex items-center justify-center flex-shrink-0">
                <Pencil className="w-5 h-5 text-zinc-400" />
              </div>
              <span
                className={cn(
                  "transition-all duration-200 ease-out delay-200 overflow-hidden opacity-100"
                )}
              >
                Write Post
              </span>
            </Link>
          </SidebarGroupContent>
          <SidebarGroupContent>
            <Link
              href={"#"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start gap-2 px-3 py-2",
                })
              )}
            >
              <div className="size-6 flex items-center justify-center flex-shrink-0">
                <LibraryBig className="w-5 h-5 text-zinc-400" />
              </div>
              <span
                className={cn(
                  "transition-all duration-200 ease-out delay-200 overflow-hidden opacity-100"
                )}
              >
                Post Library
              </span>
            </Link>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel
            className={cn(
              "transition-all duration-200 ease-out px-3 opacity-100  overflow-hidden"
            )}
          >
            Manage
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Link
              href={"#"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start gap-2 px-3 py-2",
                })
              )}
            >
              <div className="size-6 flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-zinc-400" />
              </div>
              <span
                className={cn(
                  "transition-all duration-200 ease-out delay-200 overflow-hidden opacity-100"
                )}
              >
                Knowledge Base
              </span>
            </Link>
          </SidebarGroupContent>
          <SidebarGroupContent>
            <Link
              href={"#"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start gap-2 px-3 py-2",
                })
              )}
            >
              <div className="size-6 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-zinc-400" />
              </div>
              <span
                className={cn(
                  "transition-all duration-200 ease-out delay-200 overflow-hidden opacity-100"
                )}
              >
                Schedule
              </span>
            </Link>
          </SidebarGroupContent>
          <SidebarGroupContent>
            <Link
              href={"#"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start gap-2 px-3 py-2",
                })
              )}
            >
              <div className="size-6 flex items-center justify-center flex-shrink-0">
                <AudioWaveform className="w-5 h-5 text-zinc-400" />
              </div>
              <span
                className={cn(
                  "transition-all duration-200 ease-out delay-200 overflow-hidden opacity-100"
                )}
              >
                Voice
              </span>
            </Link>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default SideNav;
