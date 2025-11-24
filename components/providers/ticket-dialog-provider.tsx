"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Ticket } from "@/lib/types";
import { TicketDetailsDialog } from "@/components/ticket-details-dialog";

interface TicketDialogContextType {
  openTicketDialog: (ticket: Ticket) => void;
}

const TicketDialogContext = createContext<TicketDialogContextType | undefined>(
  undefined
);

export function TicketDialogProvider({ children }: { children: ReactNode }) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);

  const openTicketDialog = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setTicketDialogOpen(true);
  };

  return (
    <TicketDialogContext.Provider value={{ openTicketDialog }}>
      {children}
      <TicketDetailsDialog
        ticket={selectedTicket}
        open={ticketDialogOpen}
        onOpenChange={setTicketDialogOpen}
      />
    </TicketDialogContext.Provider>
  );
}

export function useTicketDialog() {
  const context = useContext(TicketDialogContext);
  if (!context) {
    throw new Error(
      "useTicketDialog must be used within a TicketDialogProvider"
    );
  }
  return context;
}
