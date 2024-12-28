"use client"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from 'lucide-react';

export function Journal() {
  return (

    <Card className="w-full md:max-w-4xl lg:max-w-5xl shadow-lg">

      <CardHeader className="border-b ">

        <CardTitle className="flex items-center gap-3">
          <span className="text-3xl">📝</span>
          <h1 className="text-base sm:text-lg md:text-xl lg:text-xl">My Personal Journaling App</h1>
        </CardTitle>

      </CardHeader>

      <CardContent className="flex-grow p-6 text-center min-h-[300px] sm:min-h-[360px] md:min-h-[380px] lg:min-h-[400px]">
        <span className="text-muted-foreground text-sm sm:text-lg">Start writing your first journal entry...</span>
      </CardContent>

      <CardFooter className="border-t p-4 flex flex-col w-full gap-4">
          <Textarea
            placeholder="Write your thoughts here..."
            className=" min-h-[150px] sm:min-h-[220px] md:min-h-[240px] lg:min-[250px] text-sm sm:text-lg  border border-neutral-400 overflow-hidden p-4"
          />
            <Button 
              type="submit"
              size="icon"
              className="ml-auto"
            >
              <Send className="h-4 w-4 sm:h-3 " />
            </Button>
      </CardFooter>

    </Card>
  );
}
