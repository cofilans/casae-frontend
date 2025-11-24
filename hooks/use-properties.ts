import { propertiesApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useProperties() {
  return useQuery({
    queryKey: ["properties"],
    queryFn: propertiesApi.getAll,
  });
}
