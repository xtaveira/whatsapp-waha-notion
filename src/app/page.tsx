import { Notion } from "./components/Notion";
import { SendMessage } from "./components/SendMessage";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="bg-foreground p-4 rounded">
        <SendMessage />
        <Notion />
      </div>
    </main>
  );
}
