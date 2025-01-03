"use client";

import React, { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { EmotionsPicker, DateDisplay, MessageList, TypingIndicator, MessageBox, SubmitEntryButton } from "@/components/journal"
import { format } from "date-fns";

export function JournalCard() {
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
        id: crypto.randomUUID(),
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
          id: crypto.randomUUID(),
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
          id: crypto.randomUUID(),
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
          id: crypto.randomUUID(),
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
                  <DateDisplay date={date}/>
                </div>
              <div className="space-y-3">
                {dayMessages.map((message) => (
                  <MessageList key={message.id} message={message} />
                ))}
                {isTyping && (
                  <TypingIndicator/>
                )}
              </div>
            </section>
          ))}

          {promptIndex === 1 && selectedEmotions !== null && (
            <EmotionsPicker 
              selectedEmotions={selectedEmotions} 
              handleEmotionSelect={handleEmotionSelect} 
              handleEmotionsSubmit={handleEmotionsSubmit}/>
          )}

          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      <CardFooter className="border-t p-4 flex flex-col space-y-3 w-full">
          <MessageBox 
            handleSubmitEntry={handleSubmitEntry} 
            newJournalEntry={newJournalEntry} 
            setNewJournalEntry={setNewJournalEntry} 
            isTyping={isTyping} 
            isComplete={isComplete} 
          />
        <div className="flex justify-between items-center w-full px-1">
          <Label className="text-xs text-neutral-500">
            Press '⌘ Cmd' or 'Ctrl' + Enter to Submit
          </Label>
          <SubmitEntryButton newJournalEntry={newJournalEntry} />
        </div>
      </CardFooter>
    </Card>
  );
}
