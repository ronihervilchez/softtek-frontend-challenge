import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function AuthLayout({ children }: { readonly children: React.ReactNode }) {
  return <>{children}</>;
}
