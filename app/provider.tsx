"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppStateProvider } from "@/context";

export function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <AppStateProvider>{children}</AppStateProvider>
    </NextThemesProvider>
  );
}
