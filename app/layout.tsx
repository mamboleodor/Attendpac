import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";

export const metadata: Metadata = {
  title: "AttendPAC — Attendance software that works where your team actually works",
  description:
    "GPS geofencing, biometric clock-in, and offline sync for on-site and field staff, with live dashboards for every manager and org admin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
     <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
