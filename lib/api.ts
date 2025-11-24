import { AIResponse, GenerateResponseInput, Property, Ticket } from "./types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

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
