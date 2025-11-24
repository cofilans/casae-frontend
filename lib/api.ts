import {
  AIResponse,
  CreateTicketInput,
  GenerateResponseInput,
  Property,
  Ticket,
} from "./types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    try {
      const errorData = await res.json();
      const errorMessage =
        errorData.error || errorData.message || `HTTP ${res.status}`;
      throw new Error(errorMessage);
    } catch {
      throw new Error(`HTTP ${res.status}`);
    }
  }

  const data = await res.json();
  return data.data || data;
}

export const propertiesApi = {
  getAll: () => fetcher<Property[]>("/properties"),
  getAllDetailed: () => fetcher<Property[]>("/properties/detailed"),
  getById: (id: string) => fetcher<Property>(`/properties/${id}`),
};

export const ticketsApi = {
  getAll: () => fetcher<Ticket[]>("/tickets"),
};

export const aiApi = {
  generateResponse: (data: GenerateResponseInput) =>
    fetcher<AIResponse>("/ai/generate-response", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export const createTicketApi = {
  create: (data: CreateTicketInput) =>
    fetcher<Ticket>("/tickets", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
