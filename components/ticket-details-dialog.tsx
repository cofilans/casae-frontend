"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Ticket } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import {
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  User,
} from "lucide-react";

interface TicketDetailsDialogProps {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TicketDetailsDialog({
  ticket,
  open,
  onOpenChange,
}: TicketDetailsDialogProps) {
  if (!ticket) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{ticket.title}</DialogTitle>
            <DialogDescription>
              Ticket #{ticket.id.slice(0, 8)}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Badge variant="outline">{ticket.status}</Badge>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Priority
                </label>
                <Badge
                  className={
                    ticket.priority === "HIGH"
                      ? "bg-orange-200 text-orange-800"
                      : ticket.priority === "MEDIUM"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-gray-200 text-gray-800"
                  }
                >
                  {ticket.priority}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Description
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {ticket.description}
              </p>
            </div>

            {ticket.tenant && (
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h4 className="font-medium flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  Tenant Information
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Name:</strong> {ticket.tenant.firstName}{" "}
                    {ticket.tenant.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {ticket.tenant.email}
                  </p>
                </div>
              </div>
            )}

            {ticket.unit && (
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h4 className="font-medium flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  Unit Information
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Unit Number:</strong> {ticket.unit.unitNumber}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {ticket.preferredTimeslot && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Preferred Time:</span>
                  <span>{ticket.preferredTimeslot}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Created{" "}
                  {formatDistanceToNow(new Date(ticket.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>

            <Separator />

            <Button onClick={() => {}} className="w-full" size="lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Draft Response with AI
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
