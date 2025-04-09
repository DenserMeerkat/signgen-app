import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Provider } from "./provider";
import "./globals.css";
import Header from "@/components/header";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "SignGen",
  description: "Generate Skeleton sequence for a ASL word",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(dmSans.className, "min-w-[320px]")}>
        <Provider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
