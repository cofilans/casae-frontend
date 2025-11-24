"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Unit } from "@/lib/types";
import { Banknote, DoorOpen, Home } from "lucide-react";

interface UnitCardProps {
  unit: Unit;
  showProperty?: boolean;
}

export function UnitCard({ unit, showProperty = false }: UnitCardProps) {
  const activeTenant = unit.tenants?.find((t) => t);
  const isOccupied = !!activeTenant;
  const tenantInitials = activeTenant
    ? `${activeTenant.firstName[0]}${activeTenant.lastName[0]}`
    : "";

  return (
    <Card
      className={`border-2 transition-all duration-300 justify-between ${
        isOccupied
          ? "border-green-200 bg-green-50/30"
          : "border-gray-200 bg-gray-50/30"
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-lg ${
                isOccupied ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              {isOccupied ? (
                <Home className="h-5 w-5 text-green-600" />
              ) : (
                <DoorOpen className="h-5 w-5 text-gray-600" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">Unit {unit.unitNumber}</CardTitle>
              <CardDescription>
                {showProperty && unit.property && (
                  <span className="text-xs">{unit.property.name}</span>
                )}
              </CardDescription>
            </div>
          </div>
          <Badge variant={isOccupied ? "default" : "secondary"}>
            {isOccupied ? "Occupied" : "Free"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {isOccupied && activeTenant && (
          <div className="flex items-center gap-2 p-2 bg-white rounded-md border">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {tenantInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {activeTenant.firstName} {activeTenant.lastName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {activeTenant.email}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t">
          <Banknote className="h-4 w-4 text-green-600" />
          <span className="text-sm font-semibold text-green-600">
            CHF {unit.monthlyRentChf.toLocaleString()} / month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
