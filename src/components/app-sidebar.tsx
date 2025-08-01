"use client";

import React, { ChangeEvent, ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  useSidebar,
} from "./ui/sidebar";
import { ArrowDown, ArrowUp, Settings, Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";
import { ChatRequestOptions, CreateMessage, Message } from "ai";
import { Textarea } from "./ui/textarea";
import { useChat } from "ai/react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
        className=" bg-white resize-none mt-4 h-26 shadow-sm  placeholder:text-zinc-400 placeholder:font-bold"
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
        className="bg-[#4f47e1] w-8 h-8 text-white rounded-full absolute bottom-5 right-5"
      >
        <ArrowUp className="text-white" />
      </Button>
    </form>
  );
}

function ScrollToBottom(props: { className?: string }) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  if (isAtBottom) return null;
  return (
    <Button
      className={cn(
        "bg-primary text-white rounded-full cursor-pointer shadow border border-zinc-100",
        props.className
      )}
      onClick={() => scrollToBottom()}
    >
      <ArrowDown className="w-4 h-4 text-white" />
    </Button>
  );
}

function StickyToBottomContent(props: {
  content: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const context = useStickToBottomContext();

  // scrollRef will also switch between overflow: unset to overflow: auto
  return (
    <div className="w-full flex flex-col h-full">
      {/* Header */}
      <div className="h-12 p-3 border-b border-b-zinc-200 flex items-center font-semibold justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Assistant
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Settings />
          </Button>
          <Button variant="outline" size="icon">
            <X />
          </Button>
        </div>
      </div>
      {/* CHATWINDOW */}
      <div ref={context.scrollRef} className="bg-white overflow-y-auto">
        <div className="h-[820px] items-center" ref={context.contentRef}>
          {props.content}
        </div>
      </div>
      {props.footer}
    </div>
  );
}

function ChatLayout(props: { content: ReactNode }) {
  return (
    <StickToBottom>
      <StickyToBottomContent content={props.content} />
      <ScrollToBottom className="absolute right-1/2 bottom-38" />
    </StickToBottom>
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
          {messages.length === 0 ? (
            <div className="text-center">
              <div className="text-3xl font-bold ">
                Let's write a banger post ✏️
              </div>
              <div className="text-zinc-400 text-sm mt-2 ">
                Reference a blog post, a product update or rough idea — I'll
                write it like you.
              </div>
              {/* Examples */}
              <div className="flex items-center justify-between my-4">
                <div className="bg-gray-400 border-1 border-gray-100 rounded-lg w-full" />
                <div className="text-zinc-400 text-xs font-bold px-2">
                  Examples
                </div>
                <div className="bg-gray-400 border-1 border-gray-100 rounded-lg w-full" />
              </div>

              {/* Examples */}
              <div className="flex flex-col justify-between gap-4">
                <div className="text-md py-4 font-medium outline outline-dashed rounded-xl shadow-xs hover:bg-accent hover:text-accent-foreground">
                  Write a post about how we raised our{" "}
                  <span className="font-bold bg-[#DEE3fd] text-[#514f98] p-1 rounded">
                    {" "}
                    Series A round at Unify
                  </span>
                </div>
                <div className="text-md font-medium py-4 border rounded-xl shadow-xs hover:bg-accent hover:text-accent-foreground">
                  Write a post about{" "}
                  <span className="font-bold bg-[#DEE3fd] text-[#514f98] p-1 rounded">
                    {" "}
                    SaasCon 2025
                  </span>{" "}
                  and how amazing it was!
                </div>
              </div>
            </div>
          ) : (
            <ChatLayout
              content={
                <div className="h-fit px-4 py-6">
                  {messages.map((message) => (
                    <div key={message.id}>
                      {message.role === "user" ? (
                        <div className="rounded-lg w-full mb-8 gap-3 flex px-4 py-4 bg-[#EAE9E7] font-medium">
                          <Image
                            className="size-6 rounded-full object-cover"
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij4KICA8cGF0aCBmaWxsPSIjZTdlMmRjIiBkPSJNMCAwaDEyOHYxMjhIMHoiLz4KICA8cGF0aCBkPSJNODguNDEgODQuNjdhMzIgMzIgMCAxMC00OC44MiAwIDY2LjEzIDY2LjEzIDAgMDE0OC44MiAweiIgZmlsbD0iIzc4OGZhNSIvPgogIDxwYXRoIGQ9Ik04OC40MSA4NC42N2EzMiAzMiAwIDAxLTQ4LjgyIDBBNjYuNzkgNjYuNzkgMCAwMDAgMTI4aDEyOGE2Ni43OSA2Ni43OSAwIDAwLTM5LjU5LTQzLjMzeiIgZmlsbD0iIzlkYjNjOCIvPgogIDxwYXRoIGQ9Ik02NCA5NmEzMS45MyAzMS45MyAwIDAwMjQuNDEtMTEuMzMgNjYuMTMgNjYuMTMgMCAwMC00OC44MiAwQTMxLjkzIDMxLjkzIDAgMDA2NCA5NnoiIGZpbGw9IiM1NjY4N2EiLz4KPC9zdmc+Cg=="
                            alt={""}
                            width={14}
                            height={14}
                          />
                          <span>{message.content}</span>
                        </div>
                      ) : (
                        <div className="rounded-lg w-full mb-8 text-zinc-600 font-medium tracking-normal">
                          <span className="mb-4">{message.content}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              }
            />
          )}
        </SidebarContent>
        <SidebarFooter>
          <ChatInput
            value={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            placeholder={"What do you want to write about?"}
            append={append}
          />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

export default AppSidebar;
