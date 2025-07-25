"use client";

import React, { ChangeEvent, ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  Divide,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useChat } from "@ai-sdk/react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";
import { cn } from "@/lib/utils";
import { ChatRequestOptions, CreateMessage, Message } from "ai";
import Image from "next/image";

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
      className="z-10 fixed w-[555px] bottom-0 p-3 border-t border-t-zinc-200 flex items-end gap-2"
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
        className="bg-[#4f47e1] text-white rounded-2xl absolute bottom-5 right-5"
      >
        <ArrowUp className="text-white" />
      </Button>
    </form>
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

function ChatLayout(props: { content: ReactNode; footer: ReactNode }) {
  return (
    <StickToBottom>
      <StickyToBottomContent
        content={props.content}
        footer={
          <div className="relative w-[555px]">
            <ScrollToBottom className="absolute right-1/2 bottom-15 " />
            {props.footer}
          </div>
        }
      />
    </StickToBottom>
  );
}

export function ChatWindow(props: {
  emptyStateComponent: React.ReactNode;
  placeholder: string;
}) {
  const { messages, input, handleInputChange, handleSubmit, append } =
    useChat();

  return (
    <>
      <div className="-top-px min-h-full w-[555px] flex flex-col shrink-0 border border-l-2">
        {/* CHATINPUT */}
        <ChatLayout
          content={
            messages.length === 0 ? (
              <div className="flex items-center text-center justify-center h-full">
                {props.emptyStateComponent}
              </div>
            ) : (
              <div className="h-full px-4 py-6">
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
            )
          }
          footer={
            <ChatInput
              value={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              placeholder={props.placeholder}
              append={append}
            />
          }
        />
      </div>
    </>
  );
}
