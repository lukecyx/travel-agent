import { openai } from "./ai";
import { systemPrompt } from "./systemPrompt";
import type { AIMessage } from "./types";

type runLLMParams = {
  messages: AIMessage[];
};

export async function runLLM({ messages }: runLLMParams) {
  console.log("🤔");
  // const response = await openai.chat.completions.create({
  //   model: "gpt-4o-mini",
  //   // messages: [{ role: "system", content: systemPrompt }, ...messages],
  //   messages: [...messages],
  //   temperature: 0.1,
  //   tools: [],
  //   parallel_tool_calls: false,
  // });
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.1,
    messages,
    // tools: formattedTools,
    // tool_choice: "auto",
    // parallel_tool_calls: false,
  });

  return response.choices[0].message;
}
