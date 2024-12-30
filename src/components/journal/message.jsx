import { CheckCircle2 } from "lucide-react";

export function Message({ message }) {
  return (
    <div
      className={`flex ${message.isPrompt ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`relative ${
          message.isPrompt
            ? "bg-white shadow-sm rounded-lg min-w-[60%] max-w-[80%]"
            : "bg-primary/10 rounded-lg min-w-[60%] max-w-[80%]"
        } px-4 py-3`}
      >
        <div className="text-sm font-medium text-neutral-500 mb-1">
          {message.isPrompt ? "Prompt" : "Me"}
        </div>
        <div className="text-neutral-800 whitespace-pre-line">
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
  );
}
