import { streamText, type UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { assistantPrompt } from "@/lib/prompt-utlis";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    // console.dir(
    //   messages.map((message) => {
    //     console.log(message);
    //   })
    // );

    const result = streamText({
      model: openai("gpt-4o"),
      messages,
      // model: openai("ft:gpt-4o-mini-2024-07-18:prmise::C16dIUCN"),
      system: assistantPrompt({
        editorContent:
          "You're a professinal linkedin ghostwriter called postiq",
      }),
    });

    return result.toDataStreamResponse();
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
