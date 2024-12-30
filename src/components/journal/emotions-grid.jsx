import { Button } from "@/components/ui/button";

export function EmotionsGrid({
  emotions,
  selectedEmotions,
  onEmotionSelect,
  onSubmit,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center gap-4"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-4xl">
        <div className="grid grid-rows-2 grid-flow-col auto-cols-fr gap-2">
          {emotions.map((emotion) => (
            <Button
              key={emotion.name}
              variant={
                selectedEmotions.has(emotion.name.toLowerCase())
                  ? "default"
                  : "outline"
              }
              className={`flex flex-col items-center justify-center p-2 h-16 sm:h-20 
                ${
                  selectedEmotions.has(emotion.name.toLowerCase())
                    ? "bg-primary/90 text-primary-foreground hover:bg-primary/80"
                    : emotion.hoverColor
                } 
                transition-colors duration-300`}
              onClick={() => onEmotionSelect(emotion.name.toLowerCase())}
            >
              <emotion.icon
                className={`h-4 w-4 sm:h-6 sm:w-6 ${
                  selectedEmotions.has(emotion.name.toLowerCase())
                    ? "text-primary-foreground"
                    : emotion.color
                } mb-1`}
              />
              <span className="text-[10px] sm:text-xs font-medium text-center">
                {emotion.name}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
