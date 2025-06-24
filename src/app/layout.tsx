import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { ThemeProvider } from './components/theme-provider';
import { UserProvider } from "../../context/UserContext"
import { SidebarProvider } from "../../context/SidebarContext"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daily Director",
  description: "Manage your tasks with your Daily Director",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen overflow-hidden`}
      > 
      <ThemeProvider>
        <UserProvider>
          <SidebarProvider>

            <div className="flex flex-col h-full max-h-screen  dark:bg-[#121212]">
              <Header title="Daily Director"/>
              <div className="flex flex-1 overflow-hidden ">
                {children}
              </div>
              <Footer />
            </div>  
          </SidebarProvider>
        </UserProvider>
      </ThemeProvider>
       
      </body>
    </html>
  );
}
