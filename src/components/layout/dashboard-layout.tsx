"use client"

import Sidebar from "@/src/components/layout/sidebar"
import { useStore } from "@/src/lib/store"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { currentUser } = useStore()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    // If no user, we might be loading or redirected. just render children or null.
    // The individual pages handle auth redirects usually.
    if (!currentUser) return <>{children}</>

    return (
        <div className="flex min-h-screen bg-background">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
                <Sidebar className="fixed w-64" />
            </div>

            {/* Mobile Header & Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header (replaces Navbar for mobile only) */}
                <header className="md:hidden sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm h-16 flex items-center px-4">
                    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="mr-2">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-72">
                            <Sidebar />
                        </SheetContent>
                    </Sheet>
                    <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        StressRelief
                    </span>
                </header>

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
