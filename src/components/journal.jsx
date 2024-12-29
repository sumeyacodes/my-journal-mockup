"use client"

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";

export function Journal() {
  const [messages, setMessages] = useState([]);
  const [newJournalEntry, setNewJournalEntry] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef(null);

  const prompts = [
    "1. Quick vibe check - what's the general mood been like today? 🤔",
    "2. Any prominent emotions or thoughts that stood out to you today? 🧐",
    "3. Checking in with your body – how is it feeling? Does it need any support?🧘‍♀️",
    "4. Have you come across anything cool or interesting lately? 👀", 
    "5. Brain dump - anything else you want to note down? 🧠",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        const now = new Date();
        setMessages([{
          id: now.getTime(),
          content: prompts[0],
          timestamp: format(now.getTime(), "h:mm a"),
          date: format(now, "EEEE dd MMMM, yyyy"),
          isPrompt: true
        }]);
        setIsTyping(false);
      }, 1000);
    }
  }, []);

  const handleSubmitEntry = async (e) => {
    e.preventDefault();
    const entryContent = newJournalEntry.trim();

    if (entryContent) {
      const now = new Date();
      const entry = {
        id: now.getTime(),
        content: entryContent,
        timestamp: format(now.getTime(), "h:mm a"),
        date: format(now, "EEEE dd MMMM, yyyy"),
        isPrompt: false
      };

      setMessages(prev => [...prev, entry]);
      setNewJournalEntry("");

      if (promptIndex < prompts.length - 1) {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const nextPrompt = {
          id: now.getTime() + 1,
          content: prompts[promptIndex + 1],
          timestamp: format(now.getTime(), "h:mm a"),
          date: format(now, "EEEE dd MMMM, yyyy"),
          isPrompt: true
        };
        
        setMessages(prev => [...prev, nextPrompt]);
        setPromptIndex(prev => prev + 1);
        setIsTyping(false);
      } else if (promptIndex === prompts.length - 1) {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const completionMessage = {
          id: now.getTime() + 1,
          content: "Great, you've completed your journal entries for today ✅ 🌟",
          timestamp: format(now.getTime(), "h:mm a"),
          date: format(now, "EEEE dd MMMM, yyyy"),
          isPrompt: true,
          isCompletion: true
        };
        
        setMessages(prev => [...prev, completionMessage]);
        setIsTyping(false);
        setIsComplete(true);
      }
    }
  };

  const messagesByDate = messages.reduce((groups, message) => {
    if (!groups[message.date]) {
      groups[message.date] = [];
    }
    groups[message.date].push(message);
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

      <CardContent className="flex-grow overflow-y-auto p-4 bg-neutral-50">
        <div className="space-y-8">
          {Object.entries(messagesByDate).map(([date, dayMessages]) => (
            <section key={date} className="space-y-6">
              <div className="text-center">
                <span className="bg-white shadow-sm text-neutral-600 text-xs px-3 py-1.5 rounded-full">
                    {date}
                  </span>
                </div>
              <div className="space-y-3">
                {dayMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isPrompt ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className={`relative ${
                        message.isPrompt 
                          ? 'bg-white shadow-sm rounded-lg min-w-[60%] max-w-[80%]' 
                          : 'bg-primary/10 rounded-lg min-w-[60%] max-w-[80%]'
                      } px-4 py-3`}
                    >
                      <div className="text-sm font-medium text-neutral-500 mb-1">
                        {message.isPrompt ? 'Prompt' : 'Me'}
                      </div>
                      <div className="text-neutral-800">
                        {message.content}
                      </div>
                      <div className="text-[10px] text-neutral-400 text-right mt-1">
                        {message.timestamp}
                      </div>
                      {message.isCompletion && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-end gap-2">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                      🤓
                    </div>
                    <div className="bg-white shadow-sm rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmitEntry} className="w-full space-y-3">
          <Textarea
            value={newJournalEntry}
            onChange={(e) => setNewJournalEntry(e.target.value)}
            placeholder={isComplete ? "Journal completed for today!" : "Write your thoughts..."}
            className="min-h-[120px] max-h-[400px] resize-y border-neutral-300"
            disabled={isComplete}
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
              disabled={!newJournalEntry.trim() || isTyping || isComplete}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}