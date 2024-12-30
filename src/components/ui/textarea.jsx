import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full bg-white/80 px-6 py-4",
        "text-lg font-['Inter', system-ui]",
        "resize-none rounded-xl",
        "border border-neutral-200",
        "shadow-sm",
        "placeholder:text-neutral-400",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{
        lineHeight: "1.6",
      }}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
