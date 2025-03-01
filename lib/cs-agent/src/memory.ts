import { JSONFilePreset } from "lowdb/node";
import cuid from "cuid";
import type { AIMessage } from "./types";

type MessageWithMetadata = AIMessage & {
  id: string;
  createdAt: string;
};

type Data = {
  messages: MessageWithMetadata[];
};

const defaultData = { messages: [] };

export async function getDb() {
  return await JSONFilePreset<Data>("db.json", defaultData);
}

function addMetadata(message: AIMessage) {
  return {
    ...message,
    createdAt: new Date().toISOString(),
    id: cuid(),
  };
}

function removeMetadata(message: MessageWithMetadata) {
  const { id, createdAt, ...rest } = message; // eslint-disable-line @typescript-eslint/no-unused-vars

  return rest;
}

export async function addMessages(messages: AIMessage[]) {
  const db = await getDb();
  db.data.messages.push(...messages.map(addMetadata));

  await db.write();
}

export async function getMessages() {
  const db = await getDb();
  return db.data.messages.map(removeMetadata);
}

export async function getLastMessage() {
  const db = await getDb();
  return db.data.messages.map(removeMetadata).pop();
}

export const saveToolResponse = async (
  toolCallId: string,
  toolResponse: string,
) => {
  return addMessages([
    {
      role: "tool",
      content: toolResponse,
      tool_call_id: toolCallId,
    },
  ]);
};
