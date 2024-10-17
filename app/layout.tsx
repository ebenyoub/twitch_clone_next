import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "Twitch Clone",
  description: "Exercice d'application Next.js 14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="h-full flex flex-col">
        <Navbar className="fixed top-0 left-0 right-0 z-10" />
        <div className="flex h-full pt-16">
          <Sidebar className="flex-shrink-0" />
          <div className="grow overflow-auto">
            <div className="min-h-full h-full flex flex-col">
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
