"use client";

import { cn } from "@/lib/utils";
import { Message, useChat } from "@ai-sdk/react";
import { ArrowDown, ArrowUp, LoaderCircle, Paperclip } from "lucide-react";
import { FormEvent, ReactNode, useState } from "react";
import { toast } from "sonner";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";
import { ChatMessageBubble } from "./chat-message-bubble";
import { IntermediateStep } from "./intermediate-step";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function ChatMessages(props: {
  messages: Message[];
  emptyStateComponent: ReactNode;
  sourcesForMessages: Record<string, any>;
  aiEmoji?: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col max-w-[768px] mx-auto pb-12 w-full">
      {props.messages.map((m, i) => {
        if (m.role === "system") {
          return <IntermediateStep key={m.id} message={m} />;
        }

        const sourceKey = (props.messages.length - 1 - i).toString();
        return (
          <ChatMessageBubble
            key={m.id}
            message={m}
            sources={props.sourcesForMessages[sourceKey]}
          />
        );
      })}
    </div>
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
    <div
      ref={context.scrollRef}
      style={{ width: "100%", height: "100%" }}
      className={cn("grid grid-rows-[1fr,auto]", props.className)}
    >
      <div ref={context.contentRef} className={props.contentClassName}>
        {props.content}
      </div>

      {props.footer}
    </div>
  );
}

function ScrollToBottom(props: { className?: string }) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  if (isAtBottom) return null;
  return (
    <Button
      variant="outline"
      className={props.className}
      onClick={() => scrollToBottom()}
    >
      <ArrowDown className="w-4 h-4" />
      <span>Scroll to bottom</span>
    </Button>
  );
}

export function ChatInput(props: {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onStop?: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
  placeholder?: string;
  children?: ReactNode;
  className?: string;
  actions?: ReactNode;
}) {
  const disabled = props.loading && props.onStop == null;
  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();

        if (props.loading) {
          props.onStop?.();
        } else {
          props.onSubmit(e);
        }
      }}
      className={cn("flex w-full flex-col", props.className)}
    >
      <div className="p-3 border-t border-t-zinc-200">
        <div className="border border-input bg-white shadow-md rounded-lg flex flex-col gap-2 max-w-[768px] w-full mx-auto">
          <input
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            className="border-none outline-none  bg-transparent p-4 placeholder:text-zinc-400 placeholder:font-bold"
          />
          <div className="strech space-x-4">
            <div className="flex justify-between ml-4 mr-2 mb-2">
              <div className="flex gap-3">{props.actions}</div>
              <div className="flex gap-2 self-end">
                <Button variant="outline" size="icon" className="">
                  🧠
                </Button>
                <Button
                  type="submit"
                  className="bg-[#4f47e1] text-white rounded-2xl self-end "
                >
                  {props.loading ? (
                    <span role="status" className="flex justify-center">
                      <LoaderCircle className="animate-spin" />
                    </span>
                  ) : (
                    <ArrowUp className="text-white" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export function ChatLayout(props: { content: ReactNode; footer: ReactNode }) {
  return (
    <StickToBottom>
      <StickyToBottomContent
        contentClassName="py-8 px-2"
        content={props.content}
        footer={
          <div className="">
            <ScrollToBottom className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4" />
            {props.footer}
          </div>
        }
      />
    </StickToBottom>
  );
}

export function ChatWindow(props: {
  endpoint: string;
  emptyStateComponent: ReactNode;
  placeholder?: string;
  emoji?: string;
  showIngestForm?: boolean;
  showIntermediateStepsToggle?: boolean;
}) {
  const [showIntermediateSteps, setShowIntermediateSteps] = useState(
    !!props.showIntermediateStepsToggle
  );
  const [intermediateStepsLoading, setIntermediateStepsLoading] =
    useState(false);

  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});

  const chat = useChat({
    api: props.endpoint,
    onResponse(response) {
      const sourcesHeader = response.headers.get("x-sources");
      const sources = sourcesHeader
        ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8"))
        : [];

      const messageIndexHeader = response.headers.get("x-message-index");
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({
          ...sourcesForMessages,
          [messageIndexHeader]: sources,
        });
      }
    },
    streamProtocol: "text",
    onError: (e) =>
      toast.error(`Error while processing your request`, {
        description: e.message,
      }),
  });

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (chat.isLoading || intermediateStepsLoading) return;

    if (!showIntermediateSteps) {
      chat.handleSubmit(e);
      return;
    }

    // Some extra work to show intermediate steps properly
    setIntermediateStepsLoading(true);

    chat.setInput("");
    const messagesWithUserReply = chat.messages.concat({
      id: chat.messages.length.toString(),
      content: chat.input,
      role: "user",
      parts: [{ type: "text", text: chat.input }],
    });
    chat.setMessages(messagesWithUserReply);

    const response = await fetch(props.endpoint, {
      method: "POST",
      body: JSON.stringify({
        messages: messagesWithUserReply,
        show_intermediate_steps: true,
      }),
    });
    const json = await response.json();
    setIntermediateStepsLoading(false);

    if (!response.ok) {
      toast.error(`Error while processing your request`, {
        description: json.error,
      });
      return;
    }

    const responseMessages: Message[] = json.messages;

    // Represent intermediate steps as system messages for display purposes
    // TODO: Add proper support for tool messages
    const toolCallMessages = responseMessages.filter(
      (responseMessage: Message) => {
        return (
          (responseMessage.role === "assistant" &&
            !!(responseMessage as any).tool_calls?.length) ||
          (responseMessage as any).role === "tool"
        );
      }
    );

    const intermediateStepMessages = [];
    for (let i = 0; i < toolCallMessages.length; i += 2) {
      const aiMessage = toolCallMessages[i];
      const toolMessage = toolCallMessages[i + 1];
      intermediateStepMessages.push({
        id: (messagesWithUserReply.length + i / 2).toString(),
        role: "system" as const,
        content: JSON.stringify({
          action: (aiMessage as any).tool_calls?.[0],
          observation: toolMessage.content,
        }),
      });
    }
    const newMessages = messagesWithUserReply;
    for (const message of intermediateStepMessages) {
      newMessages.push({
        ...message,
        parts: [{ type: "text", text: message.content }],
      });
      chat.setMessages([...newMessages]);
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1000)
      );
    }

    chat.setMessages([
      ...newMessages,
      {
        id: newMessages.length.toString(),
        content: responseMessages[responseMessages.length - 1].content,
        role: "assistant",
      },
    ]);
  }

  return (
    <ChatLayout
      content={
        chat.messages.length === 0 ? (
          <div>{props.emptyStateComponent}</div>
        ) : (
          <ChatMessages
            aiEmoji={props.emoji}
            messages={chat.messages}
            emptyStateComponent={props.emptyStateComponent}
            sourcesForMessages={sourcesForMessages}
          />
        )
      }
      footer={
        <ChatInput
          value={chat.input}
          onChange={chat.handleInputChange}
          onSubmit={sendMessage}
          loading={chat.isLoading || intermediateStepsLoading}
          placeholder={props.placeholder ?? "What's it like to be a pirate?"}
        >
          {props.showIngestForm && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="pl-2 pr-3 -ml-2"
                  disabled={chat.messages.length !== 0}
                >
                  <Paperclip className="size-4" />
                  <span>Upload document</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload document</DialogTitle>
                  <DialogDescription>
                    Upload a document to use for the chat.
                  </DialogDescription>
                </DialogHeader>

                {/* <UploadDocumentsForm /> */}
              </DialogContent>
            </Dialog>
          )}

          {props.showIntermediateStepsToggle && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="show_intermediate_steps"
                name="show_intermediate_steps"
                checked={showIntermediateSteps}
                disabled={chat.isLoading || intermediateStepsLoading}
                onCheckedChange={(e) => setShowIntermediateSteps(!!e)}
              />
              <label htmlFor="show_intermediate_steps" className="text-sm">
                Show intermediate steps
              </label>
            </div>
          )}
        </ChatInput>
      }
    />
  );
}

export default ChatWindow;
{
  // PREVIOUS CODE
  // 1.
  // <div className="p-3 border-t border-t-zinc-200">
  //   <form
  //     onSubmit={(e) => {
  //       e.preventDefault();
  //       handleSubmit(e);
  //     }}
  //     className={cn("flex w-full flex-col")}
  //   >
  //     <div className="border border-input bg-white shadow-md rounded-lg flex flex-col gap-2 max-w-[768px] w-full mx-auto">
  //       <input
  //         placeholder="What do you want to post about?"
  //         value={input}
  //         className="border-none outline-none  bg-transparent p-4 placeholder:text-zinc-400 placeholder:font-bold"
  //         onChange={handleInputChange}
  //       />
  //       <div className="strech space-x-4">
  //         {messages.map((m, index) => (
  //           <div key={index} className="whitespace-pre-wrap">
  //             {m.role === "user" ? (
  //               <li key={m.id} className="flex flex-row px-3">
  //                 <div className="flex flex-row gap-3 rounded-lg font-medium p-4 bg-zinc-100">
  //                   <Image
  //                     className="size-6 rounded-full object-cover"
  //                     src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij4KICA8cGF0aCBmaWxsPSIjZTdlMmRjIiBkPSJNMCAwaDEyOHYxMjhIMHoiLz4KICA8cGF0aCBkPSJNODguNDEgODQuNjdhMzIgMzIgMCAxMC00OC44MiAwIDY2LjEzIDY2LjEzIDAgMDE0OC44MiAweiIgZmlsbD0iIzc4OGZhNSIvPgogIDxwYXRoIGQ9Ik04OC40MSA4NC42N2EzMiAzMiAwIDAxLTQ4LjgyIDBBNjYuNzkgNjYuNzkgMCAwMDAgMTI4aDEyOGE2Ni43OSA2Ni43OSAwIDAwLTM5LjU5LTQzLjMzeiIgZmlsbD0iIzlkYjNjOCIvPgogIDxwYXRoIGQ9Ik02NCA5NmEzMS45MyAzMS45MyAwIDAwMjQuNDEtMTEuMzMgNjYuMTMgNjYuMTMgMCAwMC00OC44MiAwQTMxLjkzIDMxLjkzIDAgMDA2NCA5NnoiIGZpbGw9IiM1NjY4N2EiLz4KPC9zdmc+Cg=="
  //                     alt={""}
  //                     width={14}
  //                     height={14}
  //                   />
  //                   <p className="text-zinc-700">{m.content}</p>
  //                 </div>
  //               </li>
  //             ) : (
  //               <li key={m.id} className="flex flex-row-reverse px-3">
  //                 <div className="flex p-4">
  //                   <p className="text-zinc-700 font-medium">{m.content}</p>
  //                 </div>
  //               </li>
  //             )}
  //           </div>
  //         ))}
  //         <div className="flex justify-between ml-4 mr-2 mb-2">
  //           <div className="flex gap-3"></div>
  //           <div className="flex gap-2 self-end">
  //             <Button variant="outline" size="icon" className="">
  //               🧠
  //             </Button>
  //             <Button
  //               type="submit"
  //               className="bg-[#4f47e1] text-white rounded-2xl self-end "
  //             >
  //               <ArrowUp className="text-white" />
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </form>
  // </div>
}
{
  /* 2.
   <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className={cn("flex w-full flex-col")}
      >
        <div className="border border-input bg-white shadow-md rounded-lg flex flex-col gap-2 max-w-[768px] w-full mx-auto">
          <input
            placeholder="What do you want to post about?"
            value={input}
            className="border-none outline-none  bg-transparent p-4 placeholder:text-zinc-400 placeholder:font-bold"
            onChange={handleInputChange}
          />
          <div className="strech">
            {messages.map((message) => (
              <div key={message.id} className="whitespace-pre-wrap">
                {message.role === "user" ? "User: " : "AI: "}
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return <div key={`${message.id}-${i}`}>{part.text}</div>;
                  }
                })}
              </div>
            ))}

            <div className="flex justify-between ml-4 mr-2 mb-2">
              <div className="flex gap-3"></div>

              <div className="flex gap-2 self-end">
                <Button variant="outline" size="icon" className="">
                  🧠
                </Button>
                <Button
                  type="submit"
                  className="bg-[#4f47e1] text-white rounded-2xl self-end "
                >
                  <ArrowUp className="text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form> */
}
