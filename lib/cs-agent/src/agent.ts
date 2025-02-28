import { runLLM } from "./llm";
import { addMessages, getMessages } from "./memory";

export async function runAgent({ userMessage }: { userMessage: string }) {
  console.log("RUN AGENT CALLED");
  await addMessages([{ role: "user", content: userMessage }]);
  console.log(1);
  const history = await getMessages();
  console.log({ history });
  console.log(2);
  // return;
  const agentResponse = await runLLM({ messages: history });
  console.log(3);
  await addMessages([agentResponse]);
  console.log(4);

  return agentResponse;
}
