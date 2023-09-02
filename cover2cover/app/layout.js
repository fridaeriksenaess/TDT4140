"use client";
import "./globals.css";
import Navbar from "@/app/components/Navbar/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeContextProvider } from "./context/ThemeContext";

export default function RootLayout({ children }) {
  return (
    <html className="dark:bg-darkBg">
      <body>
        <AuthContextProvider>
          <ThemeContextProvider>
            <main className="overflow-hidden dark:bg-darkGrey">
              <Navbar />
              <div className="flex w-screen justify-center overflow-y-hidden ">
                <div className="relative flex w-1080 justify-center self-center overflow-y-hidden bg-white pt-3 dark:bg-white/[5%]">
                  {children}
                </div>
              </div>
            </main>
          </ThemeContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
