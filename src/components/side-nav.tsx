"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  AudioWaveform,
  Brain,
  Calendar,
  ChevronsDownUp,
  LibraryBig,
  PanelLeft,
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
      className="border-r border-zinc-200"
      variant="inset"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center justify-start gap-2">
          <button
            onClick={toggleSidebar}
            className="h-8 w-8 rounded-md hover:bg-accent/50 transition-colors flex items-center justify-center group/toggle-button flex-shrink-0"
          >
            <PanelLeft className="h-4 w-4 transition-all duration-200 group-hover/toggle-button:opacity-0 group-hover/toggle-button:scale-75" />
            <div className="absolute transition-all duration-200 opacity-0 scale-75 group-hover/toggle-button:opacity-100 group-hover/toggle-button:scale-100">
              {isCollapsed ? (
                <ArrowRightFromLine className="h-4 w-4" />
              ) : (
                <ArrowLeftFromLine className="h-4 w-4" />
              )}
            </div>
          </button>
          <div
            className={cn(
              "flex items-center gap-1 transition-all duration-200 ease-out",
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            )}
          >
            {/* <Icons.logo className="size-4" /> */}
            <p className={cn("text-sm/6 text-zinc-500 ")}>postiq</p>
          </div>
        </div>
        <Button variant="outline" className="cursor-pointer">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/evilrabbit.png" />
              <AvatarFallback>JA</AvatarFallback>
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
