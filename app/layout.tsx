import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppStateProvider } from "@/lib/app-state";
import { fetchLiveToken } from "@/lib/live-token";
import { PROTOCOL } from "@/lib/tokens";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: PROTOCOL.name,
  description: PROTOCOL.tagline,
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const live = await fetchLiveToken();
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${sans.variable} ${mono.variable} ${display.variable} dark h-full antialiased`}
    >
      <body className="min-h-full">
        <AppStateProvider initialLive={live}>
          <TooltipProvider>
            <AppShell>{children}</AppShell>
          </TooltipProvider>
        </AppStateProvider>
      </body>
    </html>
  );
}
