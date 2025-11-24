"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateAIResponse } from "@/hooks/use-ai";
import { Ticket } from "@/lib/types";
import { Check, Copy, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AIComposerDialogProps {
  ticket: Ticket;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AIComposerDialog({
  ticket,
  open,
  onOpenChange,
}: AIComposerDialogProps) {
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);

  const generateAI = useGenerateAIResponse();

  const handleGenerate = () => {
    generateAI.mutate(
      {
        ticketId: ticket.id,
      },
      {
        onSuccess: (response) => {
          setDraft(response.draft);
        },
      }
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleReset = () => {
    setDraft("");
    setCopied(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Response Composer
          </DialogTitle>
          <DialogDescription>
            Generate a professional response to: {ticket.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <h4 className="font-medium text-sm">Ticket Context</h4>
            <div className="text-sm space-y-1">
              <p>
                <strong>Title:</strong> {ticket.title}
              </p>
              <p>
                <strong>Priority:</strong>{" "}
                <Badge
                  variant="outline"
                  className={
                    ticket.priority === "HIGH"
                      ? "bg-red-200 text-red-800"
                      : ticket.priority === "MEDIUM"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-gray-200 text-gray-800"
                  }
                >
                  {ticket.priority}
                </Badge>
              </p>
              {ticket.tenant && (
                <p>
                  <strong>Tenant:</strong> {ticket.tenant.firstName}{" "}
                  {ticket.tenant.lastName}
                </p>
              )}
              {ticket.unit && (
                <p>
                  <strong>Unit:</strong> {ticket.unit.unitNumber}
                </p>
              )}
            </div>
          </div>

          <Separator />

          <Button
            onClick={handleGenerate}
            disabled={generateAI.isPending}
            className="w-full"
            size="lg"
          >
            {generateAI.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate AI Draft
              </>
            )}
          </Button>

          {draft && (
            <>
              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="draft">Generated Draft</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <Textarea
                  id="draft"
                  value={draft}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDraft(e.target.value)
                  }
                  rows={12}
                  className="font-mono text-sm"
                  placeholder="Your generated draft will appear here..."
                />
              </div>

              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
                Generate New Draft
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
