"use client";

import { sendMessageAction } from "@/actions/sendMessage";
import { useActionState, useRef, useState } from "react";
import Loading from "./Loading";
import ChatMessage from "./ChatMessage";
import { AIMessage } from "@/lib/cs-agent/src/types";

function Chatbox() {
  // const [actionState, action, pending] = useActionState(
  //   sendMessageAction,
  //   null,
  // );
  //
  type messages = {
    sender: string;
    content: string;
  };
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userMessage = formData.get("userMessage");
    setMessages((prevState) => [
      ...prevState,
      { role: "user", content: userMessage as string },
    ]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setIsLoading((prevState) => !prevState);
    const agentResponse = await sendMessageAction(formData);
    setIsLoading((prevState) => !prevState);

    setMessages((prevState) => [...prevState, agentResponse!]);
  }
  return (
    <div>
      {loading && <Loading />}
      {/* TODO: Messages, extract into its own component */}
      {messages.map((message, idx) => (
        <ChatMessage
          key={idx}
          content={message.content as string}
          role={message.role}
        />
      ))}
      <form onSubmit={onSubmit}>
        <div className="flex gap-2 rounded-lg bg-gray-50 p-4 shadow-md">
          <textarea
            ref={inputRef}
            name="userMessage"
            className="form-textarea w-full rounded-lg border-gray-300 text-sm"
            rows={1}
            placeholder="Ask anything"
          />
          <button
            className="w-36 rounded-lg bg-sky-500 px-4 py-2 text-white"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chatbox;
