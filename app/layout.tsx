import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: [ "400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Just Crave It - Australia's First Self-Serve Frozen Yogurt",
  description:
    "Experience Australia's first self-serve frozen yogurt bar. Pay by the cup, not by weight. Nine delicious flavours and thirty-plus toppings in Carlton, Melbourne.",
  keywords: "frozen yogurt, self-serve, Melbourne, Carlton, dessert, healthy treats, Just Crave It",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased`}>{children}</body>
    </html>
  )
}
