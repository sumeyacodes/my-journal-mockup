"use client"

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";

export function Journal() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [newJournalEntry, setNewJournalEntry] = useState("");


  useEffect(() => {
    if (journalEntries.length > 0) {
      console.log("A new journal entry was added!");
    }
  }, [journalEntries]);
  const handleSubmitEntry = (e) => {
    e.preventDefault();
    const entryContent = newJournalEntry.trim();

    if (entryContent) {
      const now = new Date();
      const entry = {
        id: now,
        content: entryContent,
        timestamp: format(now.getTime(), "h:mm a"),
        date: format(now, " EEEE dd MMMM, yyyy")
      };

      setJournalEntries((prev) => [...prev, entry]);
      setNewJournalEntry("");
    }
  };

  const entriesByDate = journalEntries.reduce((groups, entry) => {
    if (!groups[entry.date]) {
      groups[entry.date] = [];
    }
    groups[entry.date].push(entry);
    return groups;
  }, {});

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg flex flex-col h-[85vh]">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-center gap-3">
          <span className="text-4xl">📝</span>
          <h1 className="text-xl md:text-2xl lg:text-2xl xl:text-2xl">My Journal App</h1>

        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow overflow-y-auto p-4 space-y-6">
        {journalEntries.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>Hey there! What’s on your mind today?</p>
          </div>
        ) : (
          Object.entries(entriesByDate).map(([date, entries]) => (
            <section key={date} className="space-y-4">
              <h2 className="text-center font-medium text-neutral-600">
                {date}
              </h2>
              <div className="space-y-4">
                {entries.map((entry) => (
                  <article key={entry.id} className="bg-primary/5 rounded-lg p-4">
                    <div className="whitespace-pre-wrap text-neutral-800">
                      {entry.content}
                    </div>
                    <footer className="mt-2 flex justify-end">
                      <time className="text-sm text-neutral-500">
                        {entry.timestamp}
                      </time>
                    </footer>
                  </article>
                ))}
              </div>
            </section>
          ))
        )}
      </CardContent>

      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmitEntry} className="w-full space-y-3">
          <Textarea
            value={newJournalEntry}
            onChange={(e) => setNewJournalEntry(e.target.value)}
            placeholder="Write your thoughts..."
            className="min-h-[120px] max-h-[400px] resize-y border-neutral-300"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                handleSubmitEntry(e);
              }
            }}
          />
          <div className="flex justify-between items-center mx-1">
          <Label className="text-sm text-neutral-500">
            Press '⌘ Cmd' or 'Ctrl' + Enter to Submit
          </Label>
            <Button
              type="submit"
              size="icon"
              disabled={!newJournalEntry.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
