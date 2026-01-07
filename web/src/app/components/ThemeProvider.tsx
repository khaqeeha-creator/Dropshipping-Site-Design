import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

import { ComponentProps } from "react";
type ThemeProviderProps = ComponentProps<typeof NextThemeProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="light" enableSystem={false} {...props}>
      {children}
    </NextThemeProvider>
  );
}
