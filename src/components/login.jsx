
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Notebook, ArrowRight } from 'lucide-react'

export function Login() {

  return (
    <Card className="text-center w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-4xl shadow-lg">

      <CardHeader className="space-y-4 pb-8">
        <CardTitle className="text-2xl">Hello Journal 👋</CardTitle>

        <CardDescription className="text-md">
          Welcome to your personal journaling app
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-8">

        <Link href="/journal" className="w-full block">
          <Button 
            className="w-full p-6 text-md flex items-center justify-center gap-2 group"
            variant="default"
          >
            Login
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        
      </CardContent>

    </Card>
  )
}