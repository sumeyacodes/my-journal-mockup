import { BackButton }from "@/components/back-button"
import { Journal } from "@/components/journal"

export default function JournalApp() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full p-4 md:p-6 lg:p-8 mx-auto">

        <BackButton/>
        <Journal />

    </main>
  )
}

