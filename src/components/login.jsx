"use client";

import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function Login() {
  return (
    <Card className="flex flex-col items-center justify-around w-full md:max-w-md lg:max-w-lg xl:max-w-xl shadow-lg p-6">
      <CardHeader className="w-full">
        <CardTitle className="text-2xl">Hello Journal 👋</CardTitle>
        <CardDescription className="">
          Welcome to your personal journaling app.
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        <Input className="py-6 w-full" placeholder="Enter fake name" />
      </CardContent>

      <CardFooter className="w-full mt-4">
        <Link href="/journal" className="w-full">
          <Button className="w-full p-6 text-lg">
            <span>Login</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
