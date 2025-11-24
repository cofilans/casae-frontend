"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Property } from "@/lib/types";
import { AlertCircle, Building2, MapPin } from "lucide-react";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const unitCount = property.units?.length || 0;

  const totalTickets =
    property.units?.reduce((total, unit) => {
      return total + (unit.tickets?.length || 0);
    }, 0) || 0;

  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="gap-3 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50">
        <CardHeader className="gap-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">{property.name}</CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{property.address},</span>
            <span>{property.postalCode},</span>
            <span>{property.city},</span>
            <span>{property.country}</span>
          </div>
          <div className="mt-3 flex gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              {unitCount} {unitCount === 1 ? "unit" : "units"}
            </Badge>

            <Badge
              variant="destructive"
              className="text-xs flex items-center gap-1"
            >
              <AlertCircle className="h-3 w-3" />
              {totalTickets} {totalTickets === 1 ? "ticket" : "tickets"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
