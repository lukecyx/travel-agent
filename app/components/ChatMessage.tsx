import type { AIMessage } from "@/lib/cs-agent/src/types";
import clsx from "clsx";
import Markdown from "react-markdown";

type ChatMessageProps = {
  content: string;
  role: "user" | "assistant" | "tool";
};
export default function ChatMessage(props: ChatMessageProps) {
  return (
    <article
      className={clsx(
        "mb-8 mt-8 w-full max-w-full rounded-lg p-4 shadow prose",
        {
          "bg-sky-200": props.role === "user",
          "bg-teal-200": props.role === "assistant",
        },
      )}
    >
      {props.content
        ?.split("\n")
        .map((line, idx) => <Markdown key={idx}>{line}</Markdown>)}
    </article>
  );
}
