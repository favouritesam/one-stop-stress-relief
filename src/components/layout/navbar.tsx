// "use client"
//
// import {useStore} from "@/src/lib/store";
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { LogOut, Menu, X, BarChart3, MessageCircle, Brain, Home } from "lucide-react"
// import { useState } from "react"
//
// export default function Navbar() {
//     const { currentUser, setCurrentUser, setAuthenticated } = useStore()
//     const router = useRouter()
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//
//     const handleLogout = () => {
//         setCurrentUser(null)
//         setAuthenticated(false)
//         router.push("/")
//     }
//
//     if (!currentUser) {
//         return null
//     }
//
//     const clientLinks = [
//         { label: "Marketplace", href: "/client/marketplace", icon: Home },
//         { label: "AI Quiz", href: "/client/quiz", icon: Brain },
//         { label: "Recommendations", href: "/client/ai-recommendations", icon: BarChart3 },
//         { label: "AI Chat", href: "/client/ai-chat", icon: MessageCircle },
//         { label: "My Packages", href: "/client/my-packages", icon: Home },
//     ]
//
//     const expertLinks = [
//         { label: "Dashboard", href: "/expert/dashboard", icon: Home },
//         { label: "Create Package", href: "/expert/create-package", icon: Brain },
//         { label: "AI Insights", href: "/expert/recommendations", icon: BarChart3 },
//         { label: "Earnings", href: "/expert/earnings", icon: Home },
//         { label: "Analytics", href: "/expert/analytics", icon: BarChart3 },
//     ]
//
//     const navLinks = currentUser.userType === "client" ? clientLinks : expertLinks
//
//     return (
//         <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     {/* Logo */}
//                     <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
//                         <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
//                             <span className="text-white font-bold text-sm">SR</span>
//                         </div>
//                         <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:inline">
//               StressRelief
//             </span>
//                     </div>
//
//                     {/* Desktop Navigation */}
//                     <div className="hidden md:flex items-center gap-6">
//                         {navLinks.map((link) => {
//                             const Icon = link.icon
//                             return (
//                                 <Button
//                                     key={link.href}
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() => router.push(link.href)}
//                                     className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-transparent"
//                                 >
//                                     <Icon className="w-4 h-4" />
//                                     <span className="hidden lg:inline">{link.label}</span>
//                                 </Button>
//                             )
//                         })}
//                     </div>
//
//                     {/* User Info and Logout */}
//                     <div className="hidden md:flex items-center gap-4">
//                         <div className="flex items-center gap-3">
//                             <span className="text-sm text-muted-foreground">{currentUser.name}</span>
//                             {currentUser.userType === "expert" && (
//                                 <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Expert</span>
//                             )}
//                             {currentUser.userType === "client" && (
//                                 <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
//                   Seeker
//                 </span>
//                             )}
//                         </div>
//
//                         <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={handleLogout}
//                             className="text-muted-foreground hover:text-foreground gap-2"
//                         >
//                             <LogOut className="w-4 h-4" />
//                             <span className="hidden sm:inline">Logout</span>
//                         </Button>
//                     </div>
//
//                     {/* Mobile Menu Button */}
//                     <button
//                         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                         className="md:hidden p-2 hover:bg-muted rounded-lg"
//                     >
//                         {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//                     </button>
//                 </div>
//
//                 {/* Mobile Menu */}
//                 {mobileMenuOpen && (
//                     <div className="md:hidden pb-4 border-t border-border">
//                         <div className="py-4 space-y-2">
//                             <div className="px-4 pb-3 border-b border-border">
//                                 <p className="text-sm font-medium">{currentUser.name}</p>
//                                 <p className="text-xs text-muted-foreground">{currentUser.email}</p>
//                             </div>
//
//                             {navLinks.map((link) => {
//                                 const Icon = link.icon
//                                 return (
//                                     <Button
//                                         key={link.href}
//                                         variant="ghost"
//                                         size="sm"
//                                         onClick={() => {
//                                             router.push(link.href)
//                                             setMobileMenuOpen(false)
//                                         }}
//                                         className="w-full justify-start text-muted-foreground hover:text-foreground gap-2"
//                                     >
//                                         <Icon className="w-4 h-4" />
//                                         {link.label}
//                                     </Button>
//                                 )
//                             })}
//
//                             <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 onClick={handleLogout}
//                                 className="w-full justify-start text-muted-foreground hover:text-foreground gap-2 mt-2"
//                             >
//                                 <LogOut className="w-4 h-4" />
//                                 Logout
//                             </Button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </nav>
//     )
// }


"use client"

import { useStore } from "@/src/lib/store"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X, BarChart3, MessageCircle, Brain, Home, TrendingUp } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
    const { currentUser, setCurrentUser, setAuthenticated } = useStore()
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        setCurrentUser(null)
        setAuthenticated(false)
        router.push("/")
    }

    if (!currentUser) {
        return null
    }

    const clientLinks = [
        { label: "Marketplace", href: "/client/marketplace", icon: Home },
        { label: "AI Quiz", href: "/client/quiz", icon: Brain },
        { label: "Recommendations", href: "/client/ai-recommendations", icon: BarChart3 },
        { label: "AI Chat", href: "/client/ai-chat", icon: MessageCircle },
        { label: "My Packages", href: "/client/my-packages", icon: Home },
    ]

    const expertLinks = [
        { label: "Dashboard", href: "/expert/dashboard", icon: Home },
        { label: "Create Package", href: "/expert/create-package", icon: Brain },
        { label: "Analytics", href: "/expert/analytics", icon: BarChart3 },
        { label: "AI Insights", href: "/expert/recommendations", icon: TrendingUp },
        { label: "Earnings", href: "/expert/earnings", icon: Home },
    ]

    const navLinks = currentUser.userType === "client" ? clientLinks : expertLinks

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <span className="text-white font-bold text-sm">SR</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:inline">
              StressRelief
            </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <Button
                                    key={link.href}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => router.push(link.href)}
                                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-transparent"
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="hidden lg:inline">{link.label}</span>
                                </Button>
                            )
                        })}
                    </div>

                    {/* User Info and Logout */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{currentUser.name}</span>
                            {currentUser.userType === "expert" && (
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Expert</span>
                            )}
                            {currentUser.userType === "client" && (
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                  Seeker
                </span>
                            )}
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-muted-foreground hover:text-foreground gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-muted rounded-lg"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-border">
                        <div className="py-4 space-y-2">
                            <div className="px-4 pb-3 border-b border-border">
                                <p className="text-sm font-medium">{currentUser.name}</p>
                                <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                            </div>

                            {navLinks.map((link) => {
                                const Icon = link.icon
                                return (
                                    <Button
                                        key={link.href}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            router.push(link.href)
                                            setMobileMenuOpen(false)
                                        }}
                                        className="w-full justify-start text-muted-foreground hover:text-foreground gap-2"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {link.label}
                                    </Button>
                                )
                            })}

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                                className="w-full justify-start text-muted-foreground hover:text-foreground gap-2 mt-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

