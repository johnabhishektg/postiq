import { ArrowUp, Settings, Sparkles, X } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ChatWindow } from "./chat-window";

function Chatbot() {
  const infoCard = (
    <div className="bg-white flex-1 overflow-y-auto  px-4 flex flex-col justify-center text-center">
      <div>
        <div className="text-3xl font-bold ">Let's write a banger post ✏️</div>
        <div className="text-zinc-400 text-sm mt-2 ">
          Reference a blog post, a product update or rough idea — I'll write it
          like you.
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
    </div>
  );
  return (
    <ChatWindow
      emptyStateComponent={infoCard}
      placeholder="What do you want to post about?"
    />
  );
}

export default Chatbot;
