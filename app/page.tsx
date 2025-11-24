"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useProperties } from "@/hooks/use-properties";
import { Building2 } from "lucide-react";

export default function Home() {
  const { data: properties, isLoading, error } = useProperties();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Properties</h2>
        <p className="text-muted-foreground">
          Manage your properties and track maintenance requests
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <Building2 className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Failed to load properties
          </h3>
        </div>
      ) : properties && properties.length === 0 ? (
        <div className="text-center py-16">
          <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No properties found</h3>
          <p className="text-muted-foreground mb-6">
            Make sure your backend database is seeded with data
          </p>
        </div>
      ) : properties ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <pre key={property.id}>{JSON.stringify(property, null, 2)}</pre>
          ))}
        </div>
      ) : null}
    </main>
  );
}
