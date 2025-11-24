import { aiApi } from "@/lib/api";
import { GenerateResponseInput } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

export function useGenerateAIResponse() {
  return useMutation({
    mutationFn: (data: GenerateResponseInput) => aiApi.generateResponse(data),
  });
}
