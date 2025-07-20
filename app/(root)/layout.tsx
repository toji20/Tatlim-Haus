import type { Metadata } from "next";
import {Inter,Nunito} from "next/font/google";
import "../globals.css";
import { Header } from "@/components/shared/header";
import { Suspense } from "react";
import { Footer } from "@/components/shared/footer";

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Татлым хаус",
  description: "Турецкий ресторан в москве",
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode
}>) {
  return (
        <main className="min-h-screen">
          <Suspense>
        <Header className="profile-header"/>
        </Suspense>
        {children}
        {modal}
        </main>
  );
}
