"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CreateTicketDialog } from "@/components/create-ticket-dialog";

interface CreateTicketContextType {
  openCreateTicketDialog: () => void;
}

const CreateTicketContext = createContext<CreateTicketContextType | undefined>(
  undefined
);

export function CreateTicketProvider({ children }: { children: ReactNode }) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const openCreateTicketDialog = () => {
    setCreateDialogOpen(true);
  };

  return (
    <CreateTicketContext.Provider value={{ openCreateTicketDialog }}>
      {children}
      <CreateTicketDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </CreateTicketContext.Provider>
  );
}

export function useCreateTicket() {
  const context = useContext(CreateTicketContext);
  if (!context) {
    throw new Error(
      "useCreateTicket must be used within a CreateTicketProvider"
    );
  }
  return context;
}
