import { z } from "zod";

import { sendEmail } from "@/lib/email";

export const sendEmailToolDefinition = {
  name: "send_email",
  parameters: z.object({
    toAddress: z
      .string()
      .describe(
        "The email address to send the email to. This should be provided by the user.",
      ),
    subject: z
      .string()
      .describe(
        "The subject of the email. This should be relevant to the body of the email.",
      ),
    body: z.string().describe("The body of the email, it should be in HTML."),
  }),
  description: "send an email to a user",
};

type Args = z.infer<typeof sendEmailToolDefinition.parameters>;

export async function sendEmailTool({
  toolArgs,
}: {
  toolArgs: Args;
}): Promise<string> {
  console.log("✉️  sending emails... ");

  const args = {
    fromAddress: "agent@example.com ",
    toAddress: toolArgs.toAddress,
    subject: toolArgs.subject,
    body: toolArgs.body,
  };

  const ret = await sendEmail(args);

  return JSON.stringify(ret, null, 2);
}
