import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/query-provider";
import { TicketDialogProvider } from "@/components/providers/ticket-dialog-provider";
import { AIComposerProvider } from "@/components/providers/ai-composer-provider";
import { CreateTicketProvider } from "@/components/providers/create-ticket-provider";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Casae",
  description: "Property Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AIComposerProvider>
            <TicketDialogProvider>
              <CreateTicketProvider>
                <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
                  <Header />
                  {children}
                </div>
                <Toaster richColors position="bottom-right" />
              </CreateTicketProvider>
            </TicketDialogProvider>
          </AIComposerProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
