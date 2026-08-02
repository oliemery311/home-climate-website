import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Home Climate Systems | Air Conditioning Installation",

  description:
    "Professional residential air conditioning installation across Leicester and the Midlands. Bedrooms, home offices, lounges and multi-room systems.",

  keywords: [
    "air conditioning installation",
    "home air conditioning",
    "bedroom air conditioning",
    "home office air conditioning",
    "air conditioning installer Leicester",
    "multi split systems",
  ],

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title:
      "Home Climate Systems | Residential Air Conditioning",

    description:
      "Comfortable homes, professionally installed air conditioning.",

    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}