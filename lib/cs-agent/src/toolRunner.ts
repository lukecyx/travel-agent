import type OpenAI from "openai";
import { getWeather, weatherToolDefinition } from "./tools/weatherTool";
import {
  findFlights,
  flightFinderToolDefinition,
} from "./tools/flightFinderTool";

export async function runTool(
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string,
) {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || "{}"),
  };

  switch (toolCall.function.name) {
    case weatherToolDefinition.name:
      return getWeather(input);
    case flightFinderToolDefinition.name:
      return findFlights(input);

    default:
      throw new Error("undefined tool");
  }
}
