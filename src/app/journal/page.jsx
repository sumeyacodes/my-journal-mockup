import { BackButton } from "@/components/back-button";
import { Journal } from "@/components/journal";

export default function JournalApp() {
  return (
    <main className="min-h-screen overflow-hidden flex flex-col">

      <header className="absolute top-4 left-4 z-10">
        <BackButton />
      </header>
      <div className="flex flex-1 justify-center items-center p-5">
        <Journal />
      </div>

    </main>
  );
}
