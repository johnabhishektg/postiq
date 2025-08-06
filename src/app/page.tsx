"use client";

import LinkedInPreview from "@/components/linkedin-editor/linkedin-preview";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

export default function Home() {
  const getTheme = () => ({
    ltr: "ltr",
    rtl: "rtl",
    paragraph: "mb-2 relative",
    text: {
      bold: "font-bold",
      italic: "italic",
    },
  });

  const initialConfig = {
    namespace: `linkedin-editor`,
    theme: getTheme,
    onError: (error: Error) => {
      console.error("[Linkedin Editor Error]", error);
    },
  };

  return (
    <div className="max-w-full mx-auto bg-gray-50">
      <LexicalComposer initialConfig={initialConfig}>
        <LinkedInPreview />
      </LexicalComposer>
    </div>
  );
}
