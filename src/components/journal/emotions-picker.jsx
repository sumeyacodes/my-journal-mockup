import { Button } from "../ui/button"
import { Smile, Frown, Angry, Zap, Coffee, Lightbulb, WrenchIcon as Worried, Sun, CloudRain, Heart } from 'lucide-react';

export function EmotionsPicker({ selectedEmotions, handleEmotionSelect, handleEmotionsSubmit}){

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

    return (
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
    )
}