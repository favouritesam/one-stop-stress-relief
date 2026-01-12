"use client"

import { useStore } from "@/src/lib/store";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Star, ArrowRight, Ghost, ArrowLeft } from "lucide-react"
import DashboardLayout from "@/src/components/layout/dashboard-layout";

export default function WishlistPage() {
    const { packages, currentUser, toggleWishlist, isHydrated } = useStore()
    const router = useRouter()
    const [wishlistedPackages, setWishlistedPackages] = useState<any[]>([])

    useEffect(() => {
        if (isHydrated && (!currentUser || currentUser.userType !== "client")) {
            router.push("/")
        }
    }, [currentUser, router, isHydrated])

    useEffect(() => {
        if (currentUser && currentUser.wishlist) {
            const filtered = packages.filter(pkg => currentUser.wishlist?.includes(pkg.id))
            setWishlistedPackages(filtered)
        } else {
            setWishlistedPackages([])
        }
    }, [currentUser, packages])

    if (!isHydrated || !currentUser) return null

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12">
                        <Button
                            variant="ghost"
                            onClick={() => router.push("/client/marketplace")}
                            className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Marketplace
                        </Button>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
                            My Saved Packages
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Keep track of the stress-relief solutions you're interested in.
                        </p>
                    </div>

                    {wishlistedPackages.length === 0 ? (
                        <Card className="border-dashed border-2 border-border/50 bg-transparent py-20">
                            <div className="flex flex-col items-center justify-center text-center space-y-4">
                                <div className="p-4 rounded-full bg-primary/5">
                                    <Heart className="w-12 h-12 text-primary/30" />
                                </div>
                                <div className="max-w-xs">
                                    <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Explore our marketplace to find expert-crafted packages for your journey.
                                    </p>
                                    <Button
                                        onClick={() => router.push("/client/marketplace")}
                                        className="bg-primary text-white hover:bg-primary/90 rounded-full px-8"
                                    >
                                        Explore Marketplace
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {wishlistedPackages.map((pkg) => (
                                <Card key={pkg.id} className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                                    <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="text-4xl absolute transition-transform duration-500 group-hover:scale-110">
                                            {pkg.category === "Work Stress" ? "💼" : pkg.category === "Relationships" ? "🤝" : "💰"}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => toggleWishlist(currentUser.id, pkg.id)}
                                            className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-sm"
                                        >
                                            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                                        </Button>
                                    </div>
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                                                {pkg.category}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium">{pkg.rating}</span>
                                            </div>
                                        </div>
                                        <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">{pkg.title}</CardTitle>
                                        <CardDescription className="line-clamp-2">{pkg.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="text-2xl font-bold">${pkg.price}</div>
                                            <Button
                                                onClick={() => router.push(`/client/package/${pkg.id}`)}
                                                className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 gap-2"
                                            >
                                                View Details
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
