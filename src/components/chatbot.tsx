import { ArrowUp, Settings, Sparkles, X } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

function Chatbot() {
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
          {/* ChatArea */}
          <div className="bg-white flex-1 overflow-y-auto relative px-4 flex flex-col justify-center text-center">
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
        </div>
        {/* ChatInput */}
        <div className=" p-3 border-t border-t-zinc-200 ">
          <Textarea
            placeholder="What do you want to post about?"
            className="relative bg-white resize-none mt-4 h-26 shadow-sm  placeholder:text-zinc-400 placeholder:font-bold"
          />
          <Button variant="outline" size="icon" className="absolute bottom-5">
            🧠
          </Button>
          <Button className="bg-[#4f47e1] text-white rounded-2xl absolute bottom-5 right-5">
            <ArrowUp className="text-white" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
