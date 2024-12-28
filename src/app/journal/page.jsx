import { BackButton } from "@/components/back-button"
import { Journal } from "@/components/journal"

export default function JournalApp() {
  return (
    <main className="min-h-screen">
      <header className="fixed top-4 left-4">
        <BackButton />
      </header>
      <div className="flex justify-center items-center min-h-screen p-5">
        <Journal />
      </div>
    </main>
  )
}