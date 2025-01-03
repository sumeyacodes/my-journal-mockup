import { Button } from "../ui/button"
import { Send } from "lucide-react"


export function SubmitEntryButton({newJournalEntry, isTyping, isComplete}){
    return (
        <Button
            type="submit"
            size="icon"
            disabled={!newJournalEntry.trim() || isTyping || isComplete}
        >
            <Send className="h-3 w-3" />
        </Button>
    )
}

