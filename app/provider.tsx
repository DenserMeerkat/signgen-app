"use client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppStateProvider } from "@/context";
import { Toaster } from "@/components/ui/sonner";

export function Provider({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <NextThemesProvider attribute="class">
          <AppStateProvider>
            {children}
            <Toaster />
          </AppStateProvider>
        </NextThemesProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
