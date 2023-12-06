import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Singa Metro Authority",
  description: "Singa Metro Authority",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarLayout sidebar={<AppSidebar />}>{children}</SidebarLayout>
      </body>
    </html>
  )
}

const navItems = [
  { label: "Fare Calculator", href: "fare-calculator" },
  { label: "Trips", href: "trips" },
  { label: "Fares", href: "fares" },
  { label: "Fare Caps", href: "fare-caps" },
  { label: "Peak Hours", href: "peak-hours" },
]

function AppSidebar() {
  return (
    <div className="py-4">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li className="">
              <Link
                href={item.href}
                className="block py-1 px-3 rounded-sm hover:text-accent-foreground hover:bg-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
