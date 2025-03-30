import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import { Toast } from "@/components/ui/toast";
import { UserProvider } from "@/contexts/user-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sales Dashboard",
  description: "Modern Sales Dashboard with Analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        cz-shortcut-listen="true"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <UserProvider>
            {children}
            <Toast position="top-center" closeButton richColors />
          </UserProvider>
        </ThemeProvider>

        {/* Error handling script */}
        <Script id="error-handler" strategy="afterInteractive">
          {`
            window.addEventListener('error', function(event) {
              console.log('Global error caught:', event.error);
              // Prevent the error from bubbling up
              event.preventDefault();
            });
            
            window.addEventListener('unhandledrejection', function(event) {
              console.log('Unhandled promise rejection:', event.reason);
              // Prevent the error from bubbling up
              event.preventDefault();
            });
          `}
        </Script>
      </body>
    </html>
  );
}
