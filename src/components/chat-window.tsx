"use client";

import React, { ReactNode } from "react";
import { ArrowUp, Settings, Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useChat } from "@ai-sdk/react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";

function ScrollToBottom() {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  return (
    !isAtBottom && (
      <button
        className="absolute i-ph-arrow-circle-down-fill text-4xl rounded-lg left-[50%] translate-x-[-50%] bottom-0"
        onClick={() => scrollToBottom()}
      />
    )
  );
}

function ChatLayout(props: { content: ReactNode; footer: ReactNode }) {
  return (
    <StickToBottom>
      <div></div>
    </StickToBottom>
  );
}

export function ChatWindow(props: {
  emptyStateComponent: React.ReactNode;
  placeholder: string;
}) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <>
      {/* Chatbot */}
      <div className="-top-px min-h-full w-[555px] flex flex-col overflow-hidden shrink-0 border border-l-2">
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
          {props.emptyStateComponent}
        </div>
        {/* CHATINPUT */}
        <div className=" p-3 border-t border-t-zinc-200 flex items-end gap-2 relative">
          <Textarea
            placeholder="What do you want to post about?"
            className=" bg-white resize-none mt-4 h-26 shadow-sm  placeholder:text-zinc-400 placeholder:font-bold"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-5 left-5"
          >
            🧠
          </Button>
          <Button
            disabled
            className="bg-[#4f47e1] text-white rounded-2xl absolute bottom-5 right-5"
          >
            <ArrowUp className="text-white" />
          </Button>
        </div>
      </div>
    </>
  );
}
