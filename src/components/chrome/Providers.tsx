"use client";

import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "./SmoothScroll";
import { CustomCursor } from "./CustomCursor";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SmoothScroll />
      <CustomCursor />
      {children}
    </ThemeProvider>
  );
}
