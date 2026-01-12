"use client"

import { useStore } from "@/src/lib/store";
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingCart, Star, Music, FileText, Calendar, Check, Heart, Play, Download } from "lucide-react"
import DashboardLayout from "@/src/components/layout/dashboard-layout";

export default function PackageDetailPage() {
    const { packages, users, currentUser, toggleWishlist, isPackageWishlisted, isPackagePurchased } = useStore()
    const router = useRouter()
    const params = useParams()

    const packageId = params.id as string
    const pkg = packages.find((p) => p.id === packageId)
    const expert = pkg ? users.find((u) => u.id === pkg.expertId) : null

    useEffect(() => {
        if (!currentUser || currentUser.userType !== "client") {
            router.push("/")
        }
    }, [currentUser, router])

    const isWishlisted = currentUser ? isPackageWishlisted(currentUser.id, packageId) : false
    const isPurchased = currentUser ? isPackagePurchased(currentUser.id, packageId) : false

    const handleToggleWishlist = () => {
        if (currentUser) {
            toggleWishlist(currentUser.id, packageId)
        }
    }

    const handleDownloadAll = () => {
        if (!pkg || !pkg.resourceUrl) return;
        // In a real browser environment, this triggers a download
        const link = document.createElement("a");
        link.href = pkg.resourceUrl;
        link.download = `${pkg.title.replace(/\s+/g, "_")}_Resources.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleStartLearning = () => {
        if (pkg?.videoUrl) {
            window.open(pkg.videoUrl, "_blank");
        } else {
            alert("Starting your learning journey! Loading course modules...");
        }
    }

    if (!pkg || !expert) {
        return (
            <DashboardLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <p>Package not found</p>
                </div>
            </DashboardLayout>
        )
    }


    return (
        <DashboardLayout>
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Navigation */}
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/client/marketplace")}
                        className="mb-8 gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Marketplace
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Header */}
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{pkg.title}</h1>
                                        <p className="text-lg text-muted-foreground">{pkg.description}</p>
                                    </div>
                                    <button
                                        onClick={handleToggleWishlist}
                                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                                    >
                                        <Heart
                                            className={`w-6 h-6 ${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                                        />
                                    </button>
                                </div>

                                {/* Stats */}
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold">{pkg.rating.toFixed(1)}</span>
                                        <span className="text-muted-foreground">({pkg.reviews} reviews)</span>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                        {pkg.category}
                                    </span>
                                    {isPurchased && (
                                        <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-bold flex items-center gap-1">
                                            <Check className="w-4 h-4" /> Purchased
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Expert Card */}
                            <Card className="border-primary/20">
                                <CardHeader>
                                    <CardTitle className="text-base">Created by</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                            {expert.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{expert.name}</p>
                                            {expert.verified && <p className="text-sm text-primary">✓ Verified Expert</p>}
                                            {expert.rating && (
                                                <p className="text-sm text-muted-foreground">{expert.rating.toFixed(1)} ⭐ rated by clients</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Content Details */}
                            <Card className="border-secondary/20">
                                <CardHeader>
                                    <CardTitle>What's Included</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {pkg.content.audioGuides && pkg.content.audioGuides.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Music className="w-5 h-5 text-primary" />
                                                <h3 className="font-semibold">Audio Guides</h3>
                                            </div>
                                            <ul className="space-y-2 ml-7">
                                                {pkg.content.audioGuides.map((guide, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                                                        <Check className="w-4 h-4 text-primary" />
                                                        {guide.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {pkg.content.worksheets && pkg.content.worksheets.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <FileText className="w-5 h-5 text-secondary" />
                                                <h3 className="font-semibold">Worksheets</h3>
                                            </div>
                                            <ul className="space-y-2 ml-7">
                                                {pkg.content.worksheets.map((worksheet, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                                                        <Check className="w-4 h-4 text-secondary" />
                                                        {worksheet}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {pkg.content.schedule && (
                                        <div className="flex items-start gap-3 pt-4 border-t border-border">
                                            <Calendar className="w-5 h-5 text-primary mt-0.5" />
                                            <div>
                                                <p className="font-semibold">Program Schedule</p>
                                                <p className="text-muted-foreground">{pkg.content.schedule}</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="border-2 border-primary/30 sticky top-24 shadow-lg">
                                <CardHeader>
                                    <div className="text-4xl font-bold text-primary mb-2">${pkg.price}</div>
                                    <CardDescription>One-time payment, lifetime access</CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {pkg.preview && (
                                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                                            <p className="text-sm text-primary font-medium">📝 {pkg.preview}</p>
                                        </div>
                                    )}

                                    {isPurchased ? (
                                        <div className="space-y-3">
                                            <Button
                                                onClick={handleStartLearning}
                                                className="w-full h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium gap-2 shadow-md shadow-green-500/20"
                                            >
                                                <Play className="w-4 h-4" />
                                                Start Learning
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={handleDownloadAll}
                                                className="w-full h-11 border-green-200 hover:bg-green-50 text-green-700 bg-transparent flex gap-2"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download All Resources
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <Button
                                                onClick={() => router.push(`/client/checkout/${pkg.id}`)}
                                                className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium gap-2"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                                Purchase Now
                                            </Button>

                                            <Button
                                                variant="outline"
                                                onClick={handleToggleWishlist}
                                                className={`w-full h-11 border-primary/20 hover:bg-primary/5 bg-transparent ${isWishlisted ? "text-primary border-primary/50" : ""}`}
                                            >
                                                {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
                                            </Button>
                                        </>
                                    )}

                                    <div className="space-y-3 pt-4 border-t border-border text-sm">
                                        <div className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-primary" />
                                            <span>30-day money-back guarantee</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-primary" />
                                            <span>Lifetime access to content</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-primary" />
                                            <span>Email support included</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}