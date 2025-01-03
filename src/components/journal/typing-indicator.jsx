import { Label } from "@radix-ui/react-label";

export function TypingIndicator() {
  const bounceDelays = ["0ms", "150ms", "300ms"];

  return (
    <div className="flex items-end gap-2">
      <Label className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
        🤓
      </Label>
      <div className="bg-white shadow-sm rounded-2xl px-4 py-3">
        <span className="flex items-center gap-1">
          {bounceDelays.map((delay, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce"
              style={{ animationDelay: delay }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
