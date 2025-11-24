"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Plus, Ticket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCreateTicket } from "@/components/providers/create-ticket-provider";

export function Header() {
  const pathname = usePathname();
  const isTicketsPage = pathname === "/tickets";
  const { openCreateTicketDialog } = useCreateTicket();

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl leading-tight font-bold">Casae</h1>
                <p className="text-sm text-muted-foreground">
                  Property Management System
                </p>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            {isTicketsPage ? (
              <>
                <Link href="/">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Go Home
                  </Button>
                </Link>
                <Button
                  variant="default"
                  className="gap-2"
                  onClick={openCreateTicketDialog}
                >
                  Create Ticket
                  <Plus className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link href="/tickets">
                <Button variant="outline" className="gap-2">
                  <Ticket className="h-4 w-4" />
                  All Tickets
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
