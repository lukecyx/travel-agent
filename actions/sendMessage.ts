"use server";

import { runAgent } from "@/lib/cs-agent/src/agent";

export async function sendMessageAction(userMessage: string) {
  return await runAgent({ userMessage: userMessage });
}
