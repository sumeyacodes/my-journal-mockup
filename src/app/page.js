import { Login } from "@/components/login";

export default function Home() {
  return (

    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Login/>
      </div>
    </main>
  );
}
