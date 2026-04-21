import type { Metadata } from "next";
import { AppNav } from "@/components/app-nav";

export const metadata: Metadata = {
  title: "Dossier — Memos",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNav />
      {children}
    </>
  );
}
