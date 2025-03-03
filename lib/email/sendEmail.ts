import { provider } from "./provider";

export type sendEmailParams = {
  fromAddress: string;
  toAddress: string;
  subject: string;
  body: string;
};

export async function sendEmail(params: sendEmailParams) {
  provider.sendEmail(params);

  return "Email sent!";
}

// test code

// const params = {
//   fromAddress: "agent@example.com",
//   toAddress: "test@example.com",
//   subject: "Test email",
//   body: "This is a test email",
// };
// await sendEmail(params);
