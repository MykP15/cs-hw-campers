import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "TravelTrucks — Оренда кемперів",
  description:
    "Знайди та орендуй ідеальний кемпер для своєї подорожі. Великий вибір кемперів по всій Україні.",
  keywords: "кемпер, оренда, подорож, TravelTrucks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <QueryProvider>
          <Header />
          <main>{children}</main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: "12px",
                fontFamily: "var(--font-sans)",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
