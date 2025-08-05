"use client";

import LinkedInPreview from "@/components/linkedin-editor/linkedin-preview";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

export default function Home() {
  const initialConfig = {
    namespace: `linkedin-editor`,
    theme: {
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
      },
    },
    onError: (error: Error) => {
      console.error("[Tweet Editor Error]", error);
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
