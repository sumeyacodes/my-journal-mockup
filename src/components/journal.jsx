"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Smile, Frown, Angry, Zap, Coffee, Lightbulb, WrenchIcon as Worried, Sun, CloudRain, Heart, CheckCircle2 } from 'lucide-react';
import { format } from "date-fns";
import { Label } from "@/components/ui/label";

export function Journal() {
  const [messages, setMessages] = useState([]);
  const [newJournalEntry, setNewJournalEntry] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState(new Set());
  const messagesEndRef = useRef(null);

  const prompts = [
    "1. Quick vibe check - what's the general mood been like today? 🤔",
    "2. Any prominent emotions or thoughts that stood out to you today? 🧐",
    "3. Checking in with your body – how is it feeling? Does it need any support?🧘‍♀️",
    "4. Have you come across anything cool or interesting lately? 👀",
    "5. Brain dump - anything else you want to note down? 🧠",
  ];

  const emotions = [
    { name: 'Happy', icon: Smile, color: 'text-yellow-500', hoverColor: 'hover:bg-yellow-50' },
    { name: 'Sad', icon: Frown, color: 'text-blue-500', hoverColor: 'hover:bg-blue-50' },
    { name: 'Angry', icon: Angry, color: 'text-red-500', hoverColor: 'hover:bg-red-50' },
    { name: 'Excited', icon: Zap, color: 'text-amber-500', hoverColor: 'hover:bg-amber-50' },
    { name: 'Tired', icon: Coffee, color: 'text-brown-500', hoverColor: 'hover:bg-brown-50' },
    { name: 'Inspired', icon: Lightbulb, color: 'text-yellow-400', hoverColor: 'hover:bg-yellow-50' },
    { name: 'Worried', icon: Worried, color: 'text-purple-500', hoverColor: 'hover:bg-purple-50' },
    { name: 'Calm', icon: Sun, color: 'text-orange-400', hoverColor: 'hover:bg-orange-50' },
    { name: 'Stressed', icon: CloudRain, color: 'text-gray-500', hoverColor: 'hover:bg-gray-50' },
    { name: 'Grateful', icon: Heart, color: 'text-pink-500', hoverColor: 'hover:bg-pink-50' },
  ];

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const messagesByDate = messages.reduce((groups, message) => {
    if (!groups[message.date]) {
      groups[message.date] = [];
    }
    groups[message.date].push(message);
    return groups;
  }, {});

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotions((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(emotion)) {
        newSelected.delete(emotion);
      } else {
        newSelected.add(emotion);
      }
      return newSelected;
    });
  };

  const handleEmotionsSubmit = () => {
    if (selectedEmotions.size > 0) {
      const now = new Date();
      const emotionMessage = {
        id: now.getTime(),
        content: `You're feeling ${Array.from(selectedEmotions).join(', ')} today.`,
        timestamp: format(now.getTime(), "h:mm a"),
        date: format(now, "EEEE dd MMMM, yyyy"),
        isPrompt: false
      };
      setMessages((prev) => [...prev, emotionMessage]);

      const nextPrompt = {
        id: now.getTime() + 1,
        content: prompts[promptIndex + 1],
        timestamp: format(now.getTime(), "h:mm a"),
        date: format(now, "EEEE dd MMMM, yyyy"),
        isPrompt: true
      };
      setMessages((prev) => [...prev, nextPrompt]);
      setPromptIndex((prev) => prev + 1);
      setSelectedEmotions(new Set());
    }
  };

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

      setMessages((prev) => [...prev, entry]);
      setNewJournalEntry("");

      if (promptIndex < prompts.length - 1) {
        setIsTyping(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const nextPrompt = {
          id: now.getTime() + 1,
          content: prompts[promptIndex + 1],
          timestamp: format(now.getTime(), "h:mm a"),
          date: format(now, "EEEE dd MMMM, yyyy"),
          isPrompt: true
        };

        setMessages((prev) => [...prev, nextPrompt]);
        setPromptIndex((prev) => prev + 1);
        setIsTyping(false);
      } else if (promptIndex === prompts.length - 1) {
        setIsTyping(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const completionMessage = {
          id: now.getTime() + 1,
          content: "Great, you've completed your journal entries for today ✅ 🌟",
          timestamp: format(now.getTime(), "h:mm a"),
          date: format(now, "EEEE dd MMMM, yyyy"),
          isPrompt: true,
          isCompletion: true
        };

        setMessages((prev) => [...prev, completionMessage]);
        setIsTyping(false);
        setIsComplete(true);
      }
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottom();
    }
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

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg flex flex-col h-[80vh]">
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
                      <div className="text-neutral-800">{message.content}</div>
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
                        <div
                          className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}

          {promptIndex === 1 && selectedEmotions !== null && (
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-4xl">
                <div className="grid grid-rows-2 grid-flow-col auto-cols-fr gap-2">
                  {emotions.map((emotion) => (
                    <Button
                      key={emotion.name}
                      variant={selectedEmotions.has(emotion.name.toLowerCase()) ? "default" : "outline"}
                      className={`flex flex-col items-center justify-center p-2 h-16 sm:h-20 
                        ${selectedEmotions.has(emotion.name.toLowerCase()) 
                          ? 'bg-primary/90 text-primary-foreground hover:bg-primary/80' 
                          : emotion.hoverColor} 
                        transition-colors duration-300`}
                      onClick={() => handleEmotionSelect(emotion.name.toLowerCase())}
                    >
                      <emotion.icon
                        className={`h-4 w-4 sm:h-6 sm:w-6 ${
                          selectedEmotions.has(emotion.name.toLowerCase()) 
                            ? 'text-primary-foreground' 
                            : emotion.color
                        } mb-1`}
                      />
                      <span className="text-[10px] sm:text-xs font-medium text-center">{emotion.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleEmotionsSubmit}
                disabled={selectedEmotions.size === 0}
                className="w-full max-w-[200px]"
              >
                Submit Emotions
              </Button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmitEntry} className="w-full space-y-3">
          <Textarea
            value={newJournalEntry}
            onChange={(e) => setNewJournalEntry(e.target.value)}
            placeholder={isComplete ? "Journal completed for today!" : "Write your thoughts..."}
            className="min-h-[120px] max-h-[350px] resize-y border-neutral-300"
            disabled={isComplete}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                handleSubmitEntry(e);
              }
            }}
          />
          <div className="flex justify-between items-center mx-1">
            <Label className="text-xs text-neutral-500">
              Press '⌘ Cmd' or 'Ctrl' + Enter to Submit
            </Label>
            <Button
              type="submit"
              size="icon"
              disabled={!newJournalEntry.trim() || isTyping || isComplete}
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
