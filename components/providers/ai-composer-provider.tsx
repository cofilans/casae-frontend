"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Ticket } from "@/lib/types";
import { AIComposerDialog } from "@/components/ai-composer-dialog";

interface AIComposerContextType {
  openAIComposer: (ticket: Ticket) => void;
}

const AIComposerContext = createContext<AIComposerContextType | undefined>(
  undefined
);

export function AIComposerProvider({ children }: { children: ReactNode }) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);

  const openAIComposer = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setComposerOpen(true);
    setDialogKey((prev) => prev + 1);
  };

  const handleOpenChange = (open: boolean) => {
    setComposerOpen(open);
  };

  return (
    <AIComposerContext.Provider value={{ openAIComposer }}>
      {children}
      {selectedTicket && (
        <AIComposerDialog
          key={dialogKey}
          ticket={selectedTicket}
          open={composerOpen}
          onOpenChange={handleOpenChange}
        />
      )}
    </AIComposerContext.Provider>
  );
}

export function useAIComposer() {
  const context = useContext(AIComposerContext);
  if (!context) {
    throw new Error("useAIComposer must be used within a AIComposerProvider");
  }
  return context;
}
