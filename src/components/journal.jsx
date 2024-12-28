import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from 'lucide-react';

export function Journal() {
  return (
    <Card className="w-full max-w-7xl mx-auto h-[80vh] flex flex-col shadow-lg">

      <CardHeader className="border-b py-3 sm:py-4">
        <CardTitle className="text-xl sm:text-2xl flex items-center gap-4">
          <span>📝</span>
          <h1>My Personal Journaling App</h1>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow p-3 sm:p-6 text-center">
        <span className="text-muted-foreground">Start writing your first journal entry...</span>
      </CardContent>

      <CardFooter className="border-t p-5 sm:p-6 flex flex-col w-full gap-4">
          <Textarea
            placeholder="Write your thoughts here..."
            className="min-h-[200px] md:min-h-[250px] lg:min-h-[300px] sm:text-lg resize-none overflow-hidden p-4"
          />

            <Button 
              type="submit"
              size="icon"
              className="ml-auto"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
      </CardFooter>

    </Card>
  );
}
