import Chatbot from "@/components/chatbot";
import LinkedInPreview from "@/components/linkedin-preview";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="relative h-screen flex flex-col md:flex-row bg-gray-50 overflow-hidden">
      {/* <Navbar /> */}
      <div className="hidden bg-white md:block w-54 lg:w-54 border-r border-gray-100 p-6 h-full text-brand-900 relative z-10">
        <Sidebar />
      </div>
      <LinkedInPreview />
      <Chatbot />
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
