import LinkedInPreview from "@/components/linkedin-preview";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Settings, Sparkles, X } from "lucide-react";

export default function Home() {
  return (
    <div className="relative h-screen flex flex-col md:flex-row bg-gray-50 overflow-hidden">
      {/* <Navbar /> */}
      {/* sidebar for desktop */}
      <div className="hidden bg-white md:block w-54 lg:w-54 border-r border-gray-100 p-6 h-full text-brand-900 relative z-10">
        <Sidebar />
      </div>
      <LinkedInPreview />

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
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-5 left-1"
            >
              🧠
            </Button>

            <Button className="bg-[#4f47e1] text-white rounded-2xl absolute bottom-5 right-5">
              <ArrowUp className="text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <MaxWidthWrapper className="text-center mt-10 w-1/2 grid gap-4">
          <h1 className="text-3xl font-medium">What do you want to post?</h1>

          <Textarea
            placeholder="Enter your prompt here..."
            className="resize-none mt-4 h-20"
          />
          <Button className="w-full">Draft Post 🚀</Button>

          <div className="flex items-center justify-between mt-6 ">
            <div
              className={cn(
                "px-3 py-2 text-zinc-600 cursor-pointer rounded-2xl border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
              )}
            >
              Write a post on my Series A announcement
            </div>
            <div
              className={cn(
                "px-3 py-2 text-zinc-600 cursor-pointer rounded-2xl border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
              )}
            >
              Help me write a post..{" "}
            </div>
            <div
              className={cn(
                "px-3 py-2 text-zinc-600 cursor-pointer rounded-2xl border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
              )}
            >
              Help me write a post..{" "}
            </div>
          </div>
        </MaxWidthWrapper> */
}
