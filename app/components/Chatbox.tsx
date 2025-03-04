"use client";

import { sendMessageAction } from "@/actions/sendMessage";
import React, { useActionState, useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import ChatMessage from "./ChatMessage";
import type { AIMessage } from "@/lib/cs-agent/src/types";

function removeToolMessages(messages: AIMessage[]) {
  const ret = [];
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    if (message.role === "tool") {
      continue;
    }

    if (!message.content) {
      continue;
    }

    ret.push(message);
  }

  return ret;
}

function Chatbox() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setIsLoading] = useState(false);
  const [textAreaContent, setTextAreaContent] = useState("");
  const [textAreaOrigHeight, setTextAreaOrigHeight] = useState("");

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextAreaContent(e.target.value);
  }

  useEffect(() => {
    if (textAreaContent.length === 0 && inputRef.current) {
      inputRef.current.style.height = textAreaOrigHeight;
    }

    if (inputRef.current) {
      if (
        Number(inputRef.current.style.height) > inputRef.current?.scrollHeight
      ) {
        inputRef.current.style.height = inputRef.current?.scrollHeight + "px";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textAreaContent]);

  useEffect(() => {
    if (inputRef.current) {
      setTextAreaOrigHeight(inputRef.current.style.height);
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("trigger");
    e.preventDefault();
    if (!textAreaContent) {
      return;
    }

    setMessages((prevState) => [
      ...prevState,
      { role: "user", content: textAreaContent },
    ]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setIsLoading((prevState) => !prevState);

    const agentResponse = await sendMessageAction(textAreaContent);
    // const prunedAgentResponse = removeToolMessages(agentResponse!);
    // setMessages((prevState) => [...prevState, ...prunedAgentResponse!]);
    setMessages((prevState) => [...prevState, agentResponse!]);

    setIsLoading((prevState) => !prevState);
  }

  return (
    <div>
      {messages.map((message, idx) => (
        <ChatMessage
          key={idx}
          content={(message.content as string) ?? ""}
          role={message.role}
        />
      ))}
      {loading && <Loading />}
      <form onSubmit={onSubmit}>
        <div className="flex gap-2 rounded-lg bg-gray-50 p-4 shadow-md">
          <textarea
            ref={inputRef}
            name="userMessage"
            // type="text"
            onChange={handleTextAreaChange}
            className="form-textarea prose w-full max-w-full resize-none overflow-hidden rounded-lg border-gray-300 text-sm"
            placeholder="Ask anything"
          />
          <button
            className="max-h-14 w-36 rounded-lg bg-sky-500 px-4 py-2 text-white"
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
