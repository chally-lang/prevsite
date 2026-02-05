// Importing the Metadata type from Next.js for SEO and page information
import type { Metadata } from "next";
// Importing Google fonts Geist and Geist Mono for consistent typography
import { Geist, Geist_Mono } from "next/font/google";
// Importing global CSS styles for the entire application
import "./globals.css";
// Importing the Navbar component to be displayed at the top of every page
import Navbar from "@/components/Navbar";
// Importing the Footer component to be displayed at the bottom of every page
import Footer from "@/components/Footer";
// Importing the Providers component for state management or context providers
import { Providers } from "@/components/Providers";

// Configuring the Geist Sans font with a CSS variable and Latin subset
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Configuring the Geist Mono font with a CSS variable and Latin subset
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Defining the metadata for the website, including the updated title and description
export const metadata: Metadata = {
  // Updated title to "Prevailing Computer Institute"
  title: "Prevailing Computer Institute",
  // Description of the institute for search engines
  description: "Empowering students with cutting-edge computer education.",
};

// Root layout component that wraps every page in the application
export default function RootLayout({
  // Receiving children components to be rendered within the layout
  children,
}: Readonly<{
  // Specifying that children must be valid React nodes
  children: React.ReactNode;
}>) {
  // Returning the HTML structure of the page
  return (
    // Setting the language of the document to English
    <html lang="en">
      {/* Setting the body classes for fonts and layout styling */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Wrapping the application with necessary providers */}
        <Providers>
          {/* Rendering the navigation bar at the top */}
          <Navbar />
          {/* Main content area that expands to fill available space */}
          <main className="flex-grow">
            {/* Rendering the specific page content */}
            {children}
          </main>
          {/* Rendering the footer at the bottom */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
