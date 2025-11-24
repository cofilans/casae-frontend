"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Priority } from "@/lib/types";
import { usePropertiesDetailed } from "@/hooks/use-properties";
import { useCreateTicket } from "@/hooks/use-tickets";
import { useQueryClient } from "@tanstack/react-query";

interface CreateTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTicketDialog({
  open,
  onOpenChange,
}: CreateTicketDialogProps) {
  const [propertyId, setPropertyId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [preferredTimeslot, setPreferredTimeslot] = useState("");

  const queryClient = useQueryClient();
  const { data: properties, isLoading: isLoadingProperties } =
    usePropertiesDetailed();
  const createTicket = useCreateTicket();

  const availableUnits = useMemo(() => {
    if (!propertyId || !properties) return [];
    const property = properties.find((p) => p.id === propertyId);
    return property?.units || [];
  }, [propertyId, properties]);

  const availableTenants = useMemo(() => {
    if (!unitId || !availableUnits) return [];
    const unit = availableUnits.find((u) => u.id === unitId);
    return unit?.tenants || [];
  }, [unitId, availableUnits]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !propertyId ||
      !unitId ||
      !tenantId ||
      !title.trim() ||
      !description.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (title.trim().length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }
    if (title.trim().length > 255) {
      toast.error("Title must not exceed 255 characters");
      return;
    }

    if (description.trim().length < 10) {
      toast.error("Description must be at least 10 characters");
      return;
    }
    if (description.trim().length > 2000) {
      toast.error("Description must not exceed 2000 characters");
      return;
    }

    if (preferredTimeslot && preferredTimeslot.length > 255) {
      toast.error("Preferred timeslot must not exceed 255 characters");
      return;
    }

    createTicket.mutate(
      {
        tenantId,
        unitId,
        title: title.trim(),
        description: description.trim(),
        priority: priority as Priority,
        preferredTimeslot: preferredTimeslot.trim() || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Ticket created successfully!");

          queryClient.invalidateQueries({ queryKey: ["tickets"] });
          queryClient.invalidateQueries({ queryKey: ["properties-detailed"] });

          setPropertyId("");
          setUnitId("");
          setTenantId("");
          setTitle("");
          setDescription("");
          setPriority("MEDIUM");
          setPreferredTimeslot("");
          onOpenChange(false);
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to create ticket";
          toast.error(errorMessage);
          console.error(error);
        },
      }
    );
  };

  const handlePropertyChange = (value: string) => {
    setPropertyId(value);
    setUnitId("");
    setTenantId("");
  };

  const handleUnitChange = (value: string) => {
    setUnitId(value);
    setTenantId("");
  };

  const handleClose = () => {
    if (!createTicket.isPending) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Plus className="h-6 w-6 text-primary" />
            Create New Ticket
          </DialogTitle>
          <DialogDescription>
            Submit a new maintenance request or ticket
          </DialogDescription>
          <p className="text-xs text-muted-foreground mt-2 italic">
            Note: This ticket would actually be created by the authenticated
            user, but since this project doesn&apos;t have authorization, this
            is a simplified demonstration.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="property">Property *</Label>
            <Select
              value={propertyId}
              onValueChange={handlePropertyChange}
              disabled={createTicket.isPending || isLoadingProperties}
            >
              <SelectTrigger id="property">
                <SelectValue placeholder="Select a property" />
              </SelectTrigger>
              <SelectContent side="bottom" align="start">
                {properties?.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.name} - {property.address}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Unit *</Label>
            <Select
              value={unitId}
              onValueChange={handleUnitChange}
              disabled={
                createTicket.isPending ||
                !propertyId ||
                availableUnits.length === 0
              }
            >
              <SelectTrigger id="unit">
                <SelectValue
                  placeholder={
                    propertyId ? "Select a unit" : "Select a property first"
                  }
                />
              </SelectTrigger>
              <SelectContent side="bottom" align="start">
                {availableUnits.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    Unit {unit.unitNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenant">Tenant *</Label>
            <Select
              value={tenantId}
              onValueChange={setTenantId}
              disabled={
                createTicket.isPending ||
                !unitId ||
                availableTenants.length === 0
              }
            >
              <SelectTrigger id="tenant">
                <SelectValue
                  placeholder={
                    unitId ? "Select a tenant" : "Select a unit first"
                  }
                />
              </SelectTrigger>
              <SelectContent side="bottom" align="start">
                {availableTenants.map((tenant) => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    {tenant.firstName} {tenant.lastName} ({tenant.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="title">Title *</Label>
              <span className="text-xs text-muted-foreground">
                {title.length}/255
              </span>
            </div>
            <Textarea
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of the issue (3-255 characters)"
              rows={2}
              required
              disabled={createTicket.isPending}
              maxLength={255}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Description *</Label>
              <span className="text-xs text-muted-foreground">
                {description.length}/2000
              </span>
            </div>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the maintenance request (10-2000 characters)"
              rows={6}
              required
              disabled={createTicket.isPending}
              maxLength={2000}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="preferredTimeslot">
                Preferred Timeslot (Optional)
              </Label>
              <span className="text-xs text-muted-foreground">
                {preferredTimeslot.length}/255
              </span>
            </div>
            <Textarea
              id="preferredTimeslot"
              value={preferredTimeslot}
              onChange={(e) => setPreferredTimeslot(e.target.value)}
              placeholder="e.g., Weekdays after 5 PM, or Weekend mornings"
              rows={2}
              disabled={createTicket.isPending}
              maxLength={255}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority *</Label>
            <Select
              value={priority}
              onValueChange={(value) =>
                setPriority(value as "LOW" | "MEDIUM" | "HIGH")
              }
              disabled={createTicket.isPending}
            >
              <SelectTrigger id="priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">LOW</SelectItem>
                <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                <SelectItem value="HIGH">HIGH</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createTicket.isPending}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createTicket.isPending}
              className="flex-1"
            >
              {createTicket.isPending ? "Creating..." : "Create Ticket"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
