import { runLLM } from "./llm";
import {
  addMessages,
  getLastMessage,
  getMessages,
  saveToolResponse,
} from "./memory";
import { runTool } from "./toolRunner";

import { tools } from "./tools/";

export async function runAgent({ userMessage }: { userMessage: string }) {
  await addMessages([{ role: "user", content: userMessage }]);

  while (true) {
    const history = await getMessages();
    const response = await runLLM({ messages: history, tools });

    await addMessages([response]);

    if (response.content) {
      // return getMessages()
      return getLastMessage();
    }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0];

      const toolResponse = await runTool(toolCall, userMessage);
      await saveToolResponse(toolCall.id, toolResponse);
    }
  }
}
