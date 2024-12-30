import { Message } from "./message";
import { EmotionsGrid } from "./emotions-grid";
import { JournalEntry } from "./journal-entry";
import { MoodScale } from "./mood-scale";

export function MessagesList({
  messagesByDate,
  promptIndex,
  isComplete,
  selectedEmotions,
  onEmotionSelect,
  emotions,
  newJournalEntry,
  setNewJournalEntry,
  handleTextareaKeyDown,
  handleSubmitEntry,
  handleEmotionsSubmit,
  messagesEndRef,
  moodRating,
  setMoodRating,
}) {
  return (
    <div className="space-y-6">
      {Object.entries(messagesByDate).map(([date, dayMessages]) => (
        <section key={date} className="space-y-6">
          <div className="text-center">
            <span className="bg-white shadow-sm text-neutral-600 text-xs px-3 py-1.5 rounded-full">
              {date}
            </span>
          </div>
          <div className="space-y-3">
            {dayMessages.map((message, index) => (
              <div key={message.id} className="space-y-4">
                <Message message={message} />
                {promptIndex === 0 &&
                  message.isPrompt &&
                  index === dayMessages.length - 1 &&
                  !isComplete && (
                    <MoodScale
                      value={moodRating}
                      onChange={setMoodRating}
                      onSubmit={handleSubmitEntry}
                    />
                  )}
                {promptIndex === 1 &&
                  message.isPrompt &&
                  index === dayMessages.length - 1 &&
                  !isComplete && (
                    <EmotionsGrid
                      emotions={emotions}
                      selectedEmotions={selectedEmotions}
                      onEmotionSelect={onEmotionSelect}
                      onSubmit={handleEmotionsSubmit}
                    />
                  )}
                {promptIndex > 1 &&
                  message.isPrompt &&
                  index === dayMessages.length - 1 &&
                  !isComplete && (
                    <JournalEntry
                      value={newJournalEntry}
                      onChange={(e) => setNewJournalEntry(e.target.value)}
                      onKeyDown={handleTextareaKeyDown}
                      isComplete={isComplete}
                    />
                  )}
              </div>
            ))}
          </div>
        </section>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
