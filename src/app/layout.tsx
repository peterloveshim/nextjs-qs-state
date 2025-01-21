import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

//import { Geist, Geist_Mono, Inter, Roboto } from "next/font/google";

import "./globals.css";

export const metadata: Metadata = {
  title: "State Management with Query String",
  description: "pure nextjs & nuqs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
