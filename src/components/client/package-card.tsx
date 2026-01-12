"use client"

import type { Package } from "@/src/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingCart, Music, FileText, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import {useStore} from "@/src/lib/store";
import { useState } from "react"

interface PackageCardProps {
    package: Package
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
    const router = useRouter()
    const { users } = useStore()
    const [isWishlisted, setIsWishlisted] = useState(false)

    const expert = users.find((u) => u.id === pkg.expertId)

    return (
        <Card className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
            {/* Image/Header */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 h-40 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10"></div>
                <span className="text-4xl font-bold text-primary/20 relative z-10">{pkg.title.charAt(0)}</span>

                {/* Wishlist Button */}
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white/80 hover:bg-white transition-colors z-20"
                >
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                </button>
            </div>

            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{pkg.title}</CardTitle>
                        <CardDescription className="text-xs mt-1">{pkg.category}</CardDescription>
                    </div>
                    <p className="text-lg font-bold text-primary shrink-0">${pkg.price}</p>
                </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col gap-4">
                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-3">{pkg.description}</p>

                {/* Expert Info */}
                {expert && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                            {expert.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{expert.name}</p>
                            {expert.verified && <p className="text-xs text-primary">✓ Verified</p>}
                        </div>
                    </div>
                )}

                {/* Stats */}
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{pkg.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({pkg.reviews} reviews)</span>
                    </div>
                </div>

                {/* Content Preview */}
                <div className="space-y-2 py-2 border-t border-border text-xs text-muted-foreground">
                    {pkg.content.audioGuides && pkg.content.audioGuides.length > 0 && (
                        <div className="flex items-center gap-2">
                            <Music className="w-3.5 h-3.5 text-primary" />
                            <span>{pkg.content.audioGuides.length} audio guides</span>
                        </div>
                    )}
                    {pkg.content.worksheets && pkg.content.worksheets.length > 0 && (
                        <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-secondary" />
                            <span>{pkg.content.worksheets.length} worksheets</span>
                        </div>
                    )}
                    {pkg.content.schedule && (
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-primary/70" />
                            <span className="truncate">{pkg.content.schedule}</span>
                        </div>
                    )}
                </div>

                {/* Preview Tag */}
                {pkg.preview && (
                    <div className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium text-center">
                        {pkg.preview}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-primary/20 hover:bg-primary/5 bg-transparent"
                        onClick={() => router.push(`/client/package/${pkg.id}`)}
                    >
                        View Details
                    </Button>
                    <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white gap-2"
                        onClick={() => router.push(`/client/checkout/${pkg.id}`)}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="hidden sm:inline">Buy Now</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
