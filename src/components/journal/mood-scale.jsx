import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function MoodScale({ value, onChange, onSubmit }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const moodLabels = {
    1: { emoji: "😢", text: "Rough day" },
    2: { emoji: "😕", text: "Not great" },
    3: { emoji: "😐", text: "Neutral" },
    4: { emoji: "🙂", text: "Pretty good" },
    5: { emoji: "😊", text: "Amazing" },
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="space-y-6">
        <div className="relative pt-9">
          <div className="absolute -top-2 left-0 right-0 flex justify-between">
            {Object.entries(moodLabels).map(([rating, { emoji }]) => (
              <div
                key={rating}
                className={cn(
                  "flex flex-col items-center transition-all duration-200",
                  Number(rating) === value && "scale-125"
                )}
              >
                <span className="text-xl select-none">{emoji}</span>
              </div>
            ))}
          </div>
          <Slider
            value={[value]}
            onValueChange={(vals) => onChange(vals[0])}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            min={1}
            max={5}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-xs text-neutral-400">
          {Object.entries(moodLabels).map(([rating, { text }]) => (
            <span
              key={rating}
              className={cn(
                "transition-colors duration-200",
                Number(rating) === value && "text-primary font-medium"
              )}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
