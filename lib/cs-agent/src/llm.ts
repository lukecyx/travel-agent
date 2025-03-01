import { openai } from "./ai";
import { systemPrompt } from "./systemPrompt";
import type { AIMessage } from "./types";
import { zodFunction } from "openai/helpers/zod";

type runLLMParams = {
  messages: AIMessage[];
  tools: any[];
};

export async function runLLM({ messages, tools }: runLLMParams) {
  console.log("🤔");
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.1,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    tools: tools.map(zodFunction),
    // llm figures out which tool to use.
    tool_choice: "auto",
    parallel_tool_calls: false,
  });

  return response.choices[0].message;
}
