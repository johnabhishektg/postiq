import AppSidebar from "@/components/app-sidebar";
import Chatbot from "@/components/chatbot";
import LinkedInPreview from "@/components/linkedin-preview";
import SideNav from "@/components/side-nav";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Home() {
  return (
    // <div className="relative h-screen flex flex-col md:flex-row bg-gray-50 overflow-hidden">
    //   {/* <Navbar /> */}
    //   {/* <Sidebar /> */}
    //   <Chatbot />
    // </div>
    <div className="max-w-full mx-auto bg-gray-50">
      <LinkedInPreview />
    </div>
  );
}
