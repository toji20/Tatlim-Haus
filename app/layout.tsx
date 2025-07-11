import {Nunito} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/providers";

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['200','300','400', '500', '600', '700', '800', '900'],
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
        </head>
      <body className={` ${nunito.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
