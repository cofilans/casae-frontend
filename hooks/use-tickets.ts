import { ticketsApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useTickets() {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: ticketsApi.getAll,
  });
}
