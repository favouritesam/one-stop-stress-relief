"use client"

import { useStore } from "@/src/lib/store"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    Home,
    Brain,
    BarChart3,
    MessageCircle,
    Heart,
    TrendingUp,
    LogOut,
    Menu
} from "lucide-react"

export default function Sidebar({ className }: { className?: string }) {
    const { currentUser, setCurrentUser, setAuthenticated } = useStore()
    const router = useRouter()
    const pathname = usePathname()

    if (!currentUser) return null

    const handleLogout = () => {
        setCurrentUser(null)
        setAuthenticated(false)
        router.push("/")
    }

    const clientLinks = [
        { label: "Marketplace", href: "/client/marketplace", icon: Home },
        { label: "AI Quiz", href: "/client/quiz", icon: Brain },
        { label: "Recommendations", href: "/client/ai-recommendations", icon: BarChart3 },
        { label: "Wishlist", href: "/client/wishlist", icon: Heart },
        { label: "AI Chat", href: "/client/ai-chat", icon: MessageCircle },
        { label: "My Packages", href: "/client/my-packages", icon: Home },
    ]

    const expertLinks = [
        { label: "Dashboard", href: "/expert/dashboard", icon: Home },
        { label: "Create Package", href: "/expert/create-package", icon: Brain },
        { label: "Analytics", href: "/expert/analytics", icon: BarChart3 },
        { label: "AI Insights", href: "/expert/ai-insights", icon: TrendingUp },
        { label: "Earnings", href: "/expert/earnings", icon: Home },
    ]

    const navLinks = currentUser.userType === "client" ? clientLinks : expertLinks

    return (
        <div className={cn("pb-12 h-screen border-r border-border bg-background pt-4", className)}>
            <div className="space-y-4 py-4">
                <div className="px-6 py-2">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <span className="text-white font-bold text-sm">SR</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            StressRelief
                        </span>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon
                            const isActive = pathname === link.href
                            return (
                                <Button
                                    key={link.href}
                                    variant={isActive ? "secondary" : "ghost"}
                                    onClick={() => router.push(link.href)}
                                    className={cn(
                                        "w-full justify-start gap-2",
                                        isActive ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Icon className={cn("w-4 h-4", isActive && "text-primary")} />
                                    {link.label}
                                </Button>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-0 w-full px-3">
                <div className="flex items-center gap-3 px-3 py-4 mb-2 border-t border-border/50">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {currentUser.name.charAt(0)}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{currentUser.name}</p>
                        <p className="text-xs text-muted-foreground truncate capitalize">{currentUser.userType}</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            </div>
        </div>
    )
}
