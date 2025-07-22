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
