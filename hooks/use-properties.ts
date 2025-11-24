import { propertiesApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useProperties() {
  return useQuery({
    queryKey: ["properties"],
    queryFn: propertiesApi.getAll,
  });
}

export function usePropertiesDetailed() {
  return useQuery({
    queryKey: ["properties-detailed"],
    queryFn: propertiesApi.getAllDetailed,
  });
}
