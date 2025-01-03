import { Label } from "../ui/label";

export function DateDisplay({ date }) {
    return (
      <div className="text-center">
        <Label className="bg-white shadow-sm text-neutral-600 text-xs px-3 py-1.5 rounded-full">
          {date}
        </Label>
      </div>
    );
  }
  