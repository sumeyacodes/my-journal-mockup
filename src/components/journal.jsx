"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Send,
  Smile,
  Frown,
  Angry,
  Zap,
  Coffee,
  Lightbulb,
  WrenchIcon as Worried,
  Sun,
  CloudRain,
  Heart,
} from "lucide-react";
import { format } from "date-fns";
import { MessagesList } from "@/components/journal/messages-list";
import { TypingIndicator } from "@/components/journal/typing-indicator";

export function Journal() {
  const [messages, setMessages] = useState([]);
  const [newJournalEntry, setNewJournalEntry] = useState("• ");
  const [promptIndex, setPromptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState(new Set());
  const [moodRating, setMoodRating] = useState(3);
  const messagesEndRef = useRef(null);

  const prompts = [
    "1. Quick vibe check - what's the general mood been like today? 🤔",
    "2. Any prominent emotions or thoughts that stood out to you today? 🧐",
    "3. Checking in with your body – how is it feeling? Does it need any support?🧘‍♀️",
    "4. Have you come across anything cool or interesting lately? 👀",
    "5. Brain dump - anything else you want to note down? 🧠",
  ];

  const emotions = [
    {
      name: "Happy",
      icon: Smile,
      color: "text-yellow-500",
      hoverColor: "hover:bg-yellow-50",
    },
    {
      name: "Sad",
      icon: Frown,
      color: "text-blue-500",
      hoverColor: "hover:bg-blue-50",
    },
    {
      name: "Angry",
      icon: Angry,
      color: "text-red-500",
      hoverColor: "hover:bg-red-50",
    },
    {
      name: "Excited",
      icon: Zap,
      color: "text-amber-500",
      hoverColor: "hover:bg-amber-50",
    },
    {
      name: "Tired",
      icon: Coffee,
      color: "text-brown-500",
      hoverColor: "hover:bg-brown-50",
    },
    {
      name: "Inspired",
      icon: Lightbulb,
      color: "text-yellow-400",
      hoverColor: "hover:bg-yellow-50",
    },
    {
      name: "Worried",
      icon: Worried,
      color: "text-purple-500",
      hoverColor: "hover:bg-purple-50",
    },
    {
      name: "Calm",
      icon: Sun,
      color: "text-orange-400",
      hoverColor: "hover:bg-orange-50",
    },
    {
      name: "Stressed",
      icon: CloudRain,
      color: "text-gray-500",
      hoverColor: "hover:bg-gray-50",
    },
    {
      name: "Grateful",
      icon: Heart,
      color: "text-pink-500",
      hoverColor: "hover:bg-pink-50",
    },
  ];

  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (promptIndex === 0) {
        handleSubmitEntry(e);
      } else if (promptIndex === 1) {
        handleEmotionsSubmit();
      } else {
        handleSubmitEntry(e);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();

      // Only handle bullet points for text entries (promptIndex > 1)
      if (promptIndex > 1) {
        const cursorPosition = e.target.selectionStart;
        const currentValue = e.target.value;
        const lines = currentValue.split("\n");
        const currentLineIndex =
          currentValue.substring(0, cursorPosition).split("\n").length - 1;
        const currentLine = lines[currentLineIndex];

        if (currentLine.trim() === "•" || currentLine.trim() === "") {
          return;
        }

        const textBeforeCursor = currentValue.substring(0, cursorPosition);
        const textAfterCursor = currentValue.substring(cursorPosition);
        const newValue = textBeforeCursor + "\n• " + textAfterCursor;
        setNewJournalEntry(newValue);

        setTimeout(() => {
          e.target.selectionStart = cursorPosition + 3;
          e.target.selectionEnd = cursorPosition + 3;
        }, 0);
      }
    } else if (e.key === "Backspace") {
      const cursorPosition = e.target.selectionStart;
      const currentValue = e.target.value;
      const lines = currentValue.split("\n");
      const currentLineIndex =
        currentValue.substring(0, cursorPosition).split("\n").length - 1;
      const currentLine = lines[currentLineIndex];
      const cursorPositionInLine =
        cursorPosition -
        currentValue.split("\n").slice(0, currentLineIndex).join("\n").length -
        (currentLineIndex > 0 ? 1 : 0);

      if (
        (currentLineIndex === 0 && cursorPositionInLine <= 2) ||
        (currentLine.startsWith("• ") && cursorPositionInLine <= 2)
      ) {
        e.preventDefault();
      }
    }
  };

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
        content: `You have felt ${Array.from(selectedEmotions).join(
          ", "
        )} today.`,
        timestamp: format(now, "h:mm a"),
        date: format(now, "EEEE dd MMMM, yyyy"),
        isPrompt: false,
      };
      setMessages((prev) => [...prev, emotionMessage]);
      setSelectedEmotions(new Set());
      showNextPrompt();
    }
  };

  const handleSubmitEntry = (e) => {
    e.preventDefault();
    if (promptIndex === 0) {
      const now = new Date();
      const moodMessage = {
        id: now.getTime(),
        content: `Today's mood rating: ${moodRating}/5`,
        timestamp: format(now, "h:mm a"),
        date: format(now, "EEEE dd MMMM, yyyy"),
        isPrompt: false,
      };
      setMessages((prev) => [...prev, moodMessage]);
      showNextPrompt();
    } else if (newJournalEntry.trim()) {
      const now = new Date();
      const entry = {
        id: now.getTime(),
        content: newJournalEntry,
        timestamp: format(now, "h:mm a"),
        date: format(now, "EEEE dd MMMM, yyyy"),
        isPrompt: false,
      };
      setMessages((prev) => [...prev, entry]);
      setNewJournalEntry("• ");
      showNextPrompt();
    }
  };

  const showNextPrompt = () => {
    setIsTyping(true);
    setTimeout(() => {
      const nextPromptIndex = promptIndex + 1;
      if (nextPromptIndex < prompts.length) {
        const now = new Date();
        const promptMessage = {
          id: now.getTime(),
          content: prompts[nextPromptIndex],
          timestamp: format(now, "h:mm a"),
          date: format(now, "EEEE dd MMMM, yyyy"),
          isPrompt: true,
        };
        setMessages((prev) => [...prev, promptMessage]);
        setPromptIndex(nextPromptIndex);
      } else {
        const now = new Date();
        const completionMessage = {
          id: now.getTime(),
          content: "Thank you for journaling today! 🌟",
          timestamp: format(now, "h:mm a"),
          date: format(now, "EEEE dd MMMM, yyyy"),
          isPrompt: true,
          isCompletion: true,
        };
        setMessages((prev) => [...prev, completionMessage]);
        setIsComplete(true);
      }
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        const now = new Date();
        const firstPrompt = {
          id: now.getTime(),
          content: prompts[0],
          timestamp: format(now, "h:mm a"),
          date: format(now, "EEEE dd MMMM, yyyy"),
          isPrompt: true,
        };
        setMessages([firstPrompt]);
        setIsTyping(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const messagesByDate = messages.reduce((groups, message) => {
    if (!groups[message.date]) {
      groups[message.date] = [];
    }
    groups[message.date].push(message);
    return groups;
  }, {});

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg flex flex-col h-[80vh]">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-center gap-3">
          <span className="text-4xl">📝</span>
          <h1 className="text-xl md:text-2xl lg:text-2xl xl:text-2xl">
            My Journal App
          </h1>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow overflow-y-auto p-4 bg-neutral-50">
        <MessagesList
          messagesByDate={messagesByDate}
          promptIndex={promptIndex}
          isComplete={isComplete}
          selectedEmotions={selectedEmotions}
          onEmotionSelect={handleEmotionSelect}
          emotions={emotions}
          newJournalEntry={newJournalEntry}
          setNewJournalEntry={setNewJournalEntry}
          handleTextareaKeyDown={handleTextareaKeyDown}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          moodRating={moodRating}
          setMoodRating={setMoodRating}
          handleSubmitEntry={handleSubmitEntry}
          handleEmotionsSubmit={handleEmotionsSubmit}
        />
        {isTyping && <TypingIndicator />}
      </CardContent>

      <CardFooter className="border-t p-4">
        <div className="w-full flex justify-between items-center">
          <Label className="text-xs text-neutral-500">
            {promptIndex === 1
              ? "Select your emotions"
              : "Press Enter for new bullet points"}
          </Label>
          <Button
            size="icon"
            onClick={
              promptIndex === 1 ? handleEmotionsSubmit : handleSubmitEntry
            }
            disabled={
              promptIndex === 1
                ? selectedEmotions.size === 0
                : !newJournalEntry.trim() || isTyping || isComplete
            }
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
