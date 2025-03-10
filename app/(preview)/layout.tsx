"use client";

import "./globals.css";

import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import { Header } from "@/components/shared/header";
import Providers from "@/lib/providers";
import GlobalStyles from "@/styles/global";

const geist = Geist({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   metadataBase: new URL("https://ai-sdk-preview-pdf-support.vercel.app"),
//   title: "Full-Stack Engineer Solution - College Tools - Nobert Momoh",
//   description: "College Tools will pay for taking my Sunday.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.className}`}>
      <body>
        <Providers>
          <GlobalStyles />
          <ThemeProvider attribute="class" enableSystem forcedTheme="dark">
            <Toaster position="top-center" richColors />
            <Header />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
