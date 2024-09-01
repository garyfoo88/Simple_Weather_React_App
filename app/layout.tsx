import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans } from "next/font/google";
import { mergeClassnames } from "@/lib/utils";

const font = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "A simple weather app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={mergeClassnames(
          "bg-no-repeat bg-light-image dark:bg-dark-image bg-cover bg-center mx-auto sm:max-w-[700px]",
          font.className
        )}
      >
        <div className="flex min-h-full ml-4 mr-4">{children}</div>
      </body>
    </html>
  );
}
