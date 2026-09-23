import type { Metadata } from "next";
import { LendDashboard } from "@/components/lend-dashboard";
import { PROTOCOL } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Dashboard",
  description: `Supply and borrow on ${PROTOCOL.name} — Robinhood Chain lending aligned with pons.`,
};

export default function AppDashboardPage() {
  return <LendDashboard />;
}
