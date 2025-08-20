"use client";

import React, { ChangeEvent, ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "./ui/sidebar";
import { ArrowDown, ArrowUp, Settings, Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";
import { ChatRequestOptions, CreateMessage, Message } from "ai";
import { Textarea } from "./ui/textarea";
import { useChat } from "ai/react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";
import { cn } from "@/lib/utils";
import Messages from "./ui/messages";

export function ChatInput(props: {
  placeholder?: string;
  value: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement> | undefined,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
}) {
  return (
    <form
      onSubmit={props.handleSubmit}
      className="border-t border-t-zinc-200 flex items-end gap-2"
    >
      <Textarea
        value={props.value}
        onChange={props.handleInputChange}
        placeholder={props.placeholder}
        className=" bg-white resize-none mt-4 h-32 shadow-sm  placeholder:text-zinc-400 placeholder:font-bold"
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            props.append({ content: props.value, role: "user" });
            props.handleInputChange({
              target: { value: "" },
            } as ChangeEvent<HTMLInputElement>);
          }
        }}
      />
      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-5 left-5"
      >
        🧠
      </Button>
      <Button
        type="submit"
        className="bg-[#4f47e1] absolute w-8 h-8 text-white rounded-full  bottom-5 right-5"
      >
        <ArrowUp className="text-white" />
      </Button>
    </form>
  );
}

function AppSidebar({ children }: { children: React.ReactNode }) {
  const { toggleSidebar } = useSidebar();
  const { messages, input, handleInputChange, handleSubmit, append } =
    useChat();
  return (
    <>
      {children}
      <Sidebar collapsible="offcanvas" side="right">
        <SidebarHeader className="flex-row justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4" />
            Assistant
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Settings />
            </Button>
            <Button
              onClick={() => toggleSidebar()}
              variant="outline"
              size="icon"
            >
              <X />
            </Button>
          </div>
        </SidebarHeader>

        <SidebarContent className="bg-white flex-1 overflow-y-auto px-4 flex flex-col justify-center">
          <Messages messages={messages} />
        </SidebarContent>
        <SidebarFooter>
          <div>
            <ChatInput
              value={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              placeholder={"What do you want to write about?"}
              append={append}
            />
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

export default AppSidebar;
