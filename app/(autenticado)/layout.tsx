import type { Metadata } from "next";
import type React from "react";
import MainLayout from "../../components/main-layout";

export const metadata: Metadata = {
  title: "Hero Gallery App",
  description: "Galería de héroes personalizable",
};

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
