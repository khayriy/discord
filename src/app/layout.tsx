import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-proivder";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { useTheme } from "next-themes";
import { ModalProviders } from "@/components/providers/modal-providers";
import ErrorBoundary from "@/components/error-boundary";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
 
}: Readonly<{
  children: React.ReactNode;
}>) {


  try {
    return (
   
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={cn(
              `font-poppins ${geistSans.variable} ${geistMono.variable} antialiased`,
              "bg-white dark:bg-[#313338]"
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              // enableSystem={false}
              storageKey="discord-next15"
            >
              <ModalProviders /> 
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
      
    );
  }

  catch(err) {


    console.log(err , 'hi iam err from front end') 
    return  <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        `font-poppins ${geistSans.variable} ${geistMono.variable} antialiased`,
        "bg-white dark:bg-[#313338]"
      )}
    >
      <p>
        It Seems Thata there is some critical error
      </p>
    </body>
  </html>
  }
 

 
}

