"use client";

import { TicketCard } from "@/components/ticket-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UnitCard } from "@/components/unit-card";
import { useProperty } from "@/hooks/use-properties";
import { AlertCircle, ArrowLeft, Home, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;

  const { data: property, isLoading: isLoadingProperty } =
    useProperty(propertyId);

  const isLoading = isLoadingProperty;
  const tickets =
    property?.units
      ?.flatMap(
        (unit) =>
          unit.tenants?.flatMap(
            (tenant) =>
              tenant.tickets?.map((ticket) => ({
                ...ticket,
                tenant: tenant,
                unit: unit,
              })) || []
          ) || []
      )
      .filter((ticket) => ticket !== undefined) || [];

  console.log(tickets);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Property not found</h2>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  const ticketsCount = tickets.length;

  return (
    <div>
      <header className="border-b bg-white/80 backdrop-blur-sm  shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{property.name}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {property.address}, {property.city} {property.postalCode}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span>{property.units?.length || 0} units</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{ticketsCount} active tickets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="units" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="units">
              Units ({property.units?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="tickets">
              Tickets ({tickets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="units" className="space-y-6">
            {property.units && property.units.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {property.units.map((unit) => (
                  <UnitCard key={unit.id} unit={unit} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No units found</h3>
                <p className="text-muted-foreground">
                  This property has no units yet
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            {tickets.length > 0 ? (
              <>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map((ticket) => (
                      <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
                <p className="text-muted-foreground">
                  No maintenance requests for this property
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
