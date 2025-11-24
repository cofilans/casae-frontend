"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  User,
} from "lucide-react";

interface TicketCardProps {
  ticket: Ticket;
}

const statusConfig = {
  OPEN: {
    icon: AlertCircle,
    color: "text-blue-600",
    bg: "bg-blue-100",
    label: "Open",
  },
  IN_PROGRESS: {
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    label: "In Progress",
  },
  RESOLVED: {
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-100",
    label: "Resolved",
  },
};

const priorityConfig = {
  LOW: { color: "bg-gray-200 text-gray-800", label: "Low" },
  MEDIUM: { color: "bg-blue-200 text-blue-800", label: "Medium" },
  HIGH: { color: "bg-red-200 text-red-800", label: "High" },
};

export function TicketCard({ ticket }: TicketCardProps) {
  const statusInfo = statusConfig[ticket.status];
  const priorityInfo = priorityConfig[ticket.priority];
  const StatusIcon = statusInfo.icon;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-sm mb-2">
            {statusInfo.label}
          </Badge>
        </div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className={`p-2 rounded-lg ${statusInfo.bg}`}>
              <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg line-clamp-1">
                {ticket.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 mt-1">
                {ticket.description}
              </CardDescription>
            </div>
          </div>
          <Badge className={priorityInfo.color}>{priorityInfo.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {ticket.tenant && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>
              {ticket.tenant.firstName} {ticket.tenant.lastName}
            </span>
          </div>
        )}

        {ticket.unit && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Unit {ticket.unit.unitNumber}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
          <Calendar className="h-3 w-3" />
          <span>
            Created{" "}
            {formatDistanceToNow(new Date(ticket.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>

        <Button variant="outline" className="w-full mt-2" onClick={() => {}}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
