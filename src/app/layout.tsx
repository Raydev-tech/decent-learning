import type { Metadata } from "next";
import "./globals.css";
import AOSProvider from "../components/AOSProvider";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Decent Learning | Access • Learn • Own",
  description:
    "Learn technology online with practical courses in web development, blockchain, cybersecurity, AI and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AOSProvider />
        {children}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "12px",
              background: "#102a35",
              color: "#fff",
              padding: "14px 16px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
