import { Textarea } from "@/components/ui/textarea";

export function JournalEntry({ value, onChange, onKeyDown, isComplete }) {
  return (
    <div className="mt-4">
      <Textarea
        value={value}
        onChange={onChange}
        placeholder="• Start typing here..."
        className="min-h-[120px] text-neutral-700"
        disabled={isComplete}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
