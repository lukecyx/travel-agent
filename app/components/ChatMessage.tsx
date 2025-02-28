import type { AIMessage } from "@/lib/cs-agent/src/types";
import clsx from "clsx";

type ChatMessageProps = {
  content: string;
  role: "user" | "assistant" | "tool";
};
export default function ChatMessage(props: ChatMessageProps) {
  // TODO: bg-sky-200 for user
  // bg-teal-200 for assistant
  return (
    <article
      className={clsx(
        "prose mb-8 mt-8 w-full max-w-full rounded-lg p-4 shadow",
        {
          "bg-sky-200": props.role === "user",
          "bg-teal-200": props.role === "assistant",
        },
      )}
    >
      {/* {props.content?.split("\n").map((line, idx) => ( */}
      {/*   <p key={idx}>{line}</p> */}
      {/* ))} */}
      {props.content as string}
    </article>
  );
}
