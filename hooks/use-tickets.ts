import { createTicketApi, ticketsApi } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useTickets() {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: ticketsApi.getAll,
  });
}

export function useCreateTicket() {
  return useMutation({
    mutationFn: createTicketApi.create,
  });
}
