import { UIMessage, Message as VercelChatMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: openai("ft:gpt-4o-mini-2024-07-18:prmise::C16dIUCN"),
      system:
        "You are a professional LinkedIn ghostwriter. You write engaging, insightful, and authentic posts and comments that reflect the user's voice and position them as a thought leader. Your tone balances professionalism with a touch of personality and warmth. You understand LinkedIn culture, avoiding hard sells and focusing on value, storytelling, and credibility.",
      messages,
    });

    return result.toDataStreamResponse();
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
