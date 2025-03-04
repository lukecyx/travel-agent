import type OpenAI from "openai";

import {
  getWeather,
  weatherToolDefinition,
  findFlights,
  flightFinderToolDefinition,
  sendEmailTool,
  sendEmailToolDefinition,
  hotelFinderToolDefinition,
  findHotels,
} from "./tools";

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
    case sendEmailToolDefinition.name:
      return sendEmailTool(input);
    case hotelFinderToolDefinition.name:
      return findHotels(input);

    default:
      throw new Error("undefined tool");
  }
}
