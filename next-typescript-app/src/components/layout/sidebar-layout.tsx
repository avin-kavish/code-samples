import { PropsWithChildren } from "react"

export function SidebarLayout({
  children,
  sidebar,
}: PropsWithChildren<{ sidebar: React.ReactNode }>) {
  return (
    <div className="h-screen w-screen flex">
      <div className="h-full border-r border-border w-40">{sidebar}</div>
      <main className="flex-1">{children}</main>
    </div>
  )
}
