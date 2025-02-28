import Chatbox from "./components/Chatbox";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-5/6">
        <Chatbox />
      </div>
    </div>
  );
}
