import Chatbot from "@/components/chatbot";
import LinkedInPreview from "@/components/linkedin-preview";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="relative h-screen flex flex-col md:flex-row bg-gray-50 overflow-hidden">
      {/* <Navbar /> */}
      <Sidebar />
      <LinkedInPreview />
      <Chatbot />
    </div>
  );
}
