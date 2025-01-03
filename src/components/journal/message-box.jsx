import { Textarea } from "@/components/ui/textarea";

export function MessageBox({handleSubmitEntry, newJournalEntry, setNewJournalEntry, isComplete}){
    return (
      <form onSubmit={handleSubmitEntry} className="w-full">
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
      </form>
    )
}