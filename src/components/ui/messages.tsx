import { cn } from "@/lib/utils";
import { UIMessage } from "ai";
import { ArrowDown, Settings, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";
import { Button } from "./button";

type MessagesProps = {
  messages: UIMessage[];
};

export default function Messages({ messages }: MessagesProps) {
  function ScrollToBottom(props: { className?: string }) {
    const { isAtBottom, scrollToBottom } = useStickToBottomContext();

    if (isAtBottom) return null;
    return (
      <Button
        className={cn(
          "bg-[#4f47e1] text-white rounded-full cursor-pointer shadow border border-zinc-100",
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
  return (
    <>
      {messages.length === 0 ? (
        <div className="text-center">
          <div className="text-3xl font-bold ">
            Let's write a banger post ✏️
          </div>
          <div className="text-zinc-400 text-sm mt-2 ">
            Reference a blog post, a product update or rough idea — I'll write
            it like you.
          </div>
          {/* Examples */}
          <div className="flex items-center justify-between my-4">
            <div className="bg-gray-400 border-1 border-gray-100 rounded-lg w-full" />
            <div className="text-zinc-400 text-xs font-bold px-2">Examples</div>
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
                      <span className="mb-4 whitespace-pre-wrap">
                        {message.content}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          }
        />
      )}
    </>
  );
}
