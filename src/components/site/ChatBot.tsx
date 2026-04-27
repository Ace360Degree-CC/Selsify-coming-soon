import { useState } from "react";
import { MessageSquare, X } from "lucide-react";

const options = [
  { label: "Solar for Home", url: "https://wa.me/919892020515?text=I%20want%20solar%20for%20my%20home" },
  { label: "Pricing", url: "https://wa.me/919892020515?text=Please%20share%20solar%20pricing" },
  { label: "Franchise", url: "https://wa.me/919892020515?text=I%20am%20interested%20in%20the%20Selsify%20franchise" },
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 left-4 z-50">
      {open && (
        <div className="mb-3 w-72 bg-card rounded-xl shadow-elevated border border-border overflow-hidden animate-fade-up">
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">Selsify Assistant</div>
              <div className="text-xs opacity-80">How can we help?</div>
            </div>
            <button aria-label="Close" onClick={() => setOpen(false)}><X className="h-4 w-4" /></button>
          </div>
          <div className="p-3 flex flex-col gap-2">
            {options.map((o) => (
              <a key={o.label} href={o.url} className="text-sm bg-surface-soft hover:bg-secondary hover:text-secondary-foreground border border-border rounded-lg px-3 py-2 transition-colors">
                {o.label}
              </a>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
        className="h-12 w-12 rounded-full bg-accent text-accent-foreground shadow-elevated flex items-center justify-center hover:scale-105 transition-transform"
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default ChatBot;
