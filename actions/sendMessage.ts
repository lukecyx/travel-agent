"use server";

import { runAgent } from "@/lib/cs-agent/src/agent";
import { z } from "zod";

export async function sendMessageAction(formData: unknown) {
  if (!(formData instanceof FormData)) {
    throw new Error("no form data");
  }

  const userMessageSchema = z.object({
    userMessage: z.string(),
  });

  const result = userMessageSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    console.error(result.error.format());
    return;
  } else {
    console.log("✅", result.data);
  }

  const ret = await runAgent({ userMessage: result.data?.userMessage });

  return ret;
}
