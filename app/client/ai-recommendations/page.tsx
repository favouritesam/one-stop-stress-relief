"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/src/lib/store";
import { Star, TrendingUp, Zap, MessageCircle } from "lucide-react"
import DashboardLayout from "@/src/components/layout/dashboard-layout";

export default function AIRecommendationsPage() {
    const router = useRouter()
    const { currentUser, getMatchedPackages, packages, getUserAssessment, isHydrated } = useStore()
    const [matchedPackages, setMatchedPackages] = useState<any[]>([])
    const [assessment, setAssessment] = useState<any>(null)

    useEffect(() => {
        if (!isHydrated) return

        if (!currentUser) {
            router.push("/")
            return
        }

        const userAssessment = getUserAssessment(currentUser.id)
        if (!userAssessment) {
            router.push("/client/quiz")
            return
        }

        setAssessment(userAssessment)

        const matches = getMatchedPackages(currentUser.id)
        const matchedWithDetails = matches.map((match) => {
            const pkg = packages.find((p) => p.id === match.packageId)
            return { ...match, package: pkg }
        })
        setMatchedPackages(matchedWithDetails)
    }, [currentUser, getMatchedPackages, getUserAssessment, packages, router, isHydrated])

    if (!isHydrated || !assessment) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">Loading recommendations...</p>
            </div>
        )
    }

    const getSeverityColor = (severity: number) => {
        if (severity <= 3) return "bg-green-500/20 text-green-700"
        if (severity <= 6) return "bg-yellow-500/20 text-yellow-700"
        return "bg-red-500/20 text-red-700"
    }

    const getSeverityLabel = (severity: number) => {
        if (severity <= 3) return "Mild"
        if (severity <= 6) return "Moderate"
        return "Severe"
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Assessment Summary */}
                    <div className="mb-12">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                            <div>
                                <h1 className="text-4xl font-bold mb-2">Your Personalized Recommendations</h1>
                                <p className="text-lg text-muted-foreground">
                                    Based on your stress assessment, here are the best-matched packages for you
                                </p>
                            </div>
                            <Button
                                onClick={() => router.push("/client/ai-chat")}
                                variant="outline"
                                className="mt-4 sm:mt-0 border-primary/30 hover:bg-primary/5"
                            >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Chat with AI
                            </Button>
                        </div>

                        {/* Assessment Details */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card className="border-border/50">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Stress Type</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xl font-bold capitalize">{assessment.stressType}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-border/50">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Severity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`px-2 py-1 rounded text-sm font-semibold ${getSeverityColor(assessment.severity)}`}
                                        >
                                            {getSeverityLabel(assessment.severity)}
                                        </span>
                                        <span className="text-2xl font-bold">{assessment.severity}/10</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/50">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Budget</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold">${assessment.budget}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-border/50">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Lifestyle</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xl font-bold capitalize">{assessment.lifestyle}</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Triggers */}
                        <Card className="border-border/50 mt-4">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">Your Stress Triggers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {assessment.triggers.map((trigger: string, idx: number) => (
                                        <Badge key={idx} variant="secondary" className="bg-secondary/20 text-secondary">
                                            {trigger}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recommendations */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Recommended Packages ({matchedPackages.length})</h2>

                        {matchedPackages.length === 0 ? (
                            <Card className="border-border/50">
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <Zap className="w-12 h-12 text-muted-foreground mb-4" />
                                    <p className="text-lg font-medium mb-2">No packages found</p>
                                    <p className="text-muted-foreground text-center max-w-md">
                                        We couldn't find packages matching your criteria. Try adjusting your budget or stress type.
                                    </p>
                                    <Button onClick={() => router.push("/client/quiz")} className="mt-4" variant="outline">
                                        Retake Assessment
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {matchedPackages.map((matched) => {
                                    const pkg = matched.package
                                    const expert = useStore.getState().users.find((u) => u.id === pkg.expertId)

                                    return (
                                        <Card
                                            key={pkg.id}
                                            className="border-border/50 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
                                            onClick={() => router.push(`/client/package/${pkg.id}`)}
                                        >
                                            {/* Match Score */}
                                            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                {matched.matchScore}% Match
                                            </div>

                                            <CardHeader>
                                                <div className="space-y-2">
                                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                        {pkg.title}
                                                    </CardTitle>
                                                    <CardDescription className="line-clamp-2">{pkg.description}</CardDescription>
                                                </div>

                                                {/* Rating */}
                                                <div className="flex items-center gap-2 pt-2">
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${i < Math.floor(pkg.rating)
                                                                    ? "fill-yellow-400 text-yellow-400"
                                                                    : "text-muted-foreground"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm font-medium">{pkg.rating}</span>
                                                    <span className="text-xs text-muted-foreground">({pkg.reviews} reviews)</span>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="space-y-4">
                                                {/* Match Reasons */}
                                                <div className="space-y-2">
                                                    <p className="text-xs font-medium text-muted-foreground">Why recommended:</p>
                                                    <ul className="space-y-1">
                                                        {matched.matchReasons.slice(0, 2).map((reason: string, idx: number) => (
                                                            <li key={idx} className="text-xs text-foreground flex items-start gap-2">
                                                                <TrendingUp className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                                                                {reason}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Content Preview */}
                                                <div className="pt-2 border-t border-border/50">
                                                    <p className="text-xs font-medium text-muted-foreground mb-2">Includes:</p>
                                                    <div className="space-y-1">
                                                        {pkg.content.audioGuides && (
                                                            <p className="text-xs text-foreground">{pkg.content.audioGuides.length} audio guides</p>
                                                        )}
                                                        {pkg.content.worksheets && (
                                                            <p className="text-xs text-foreground">{pkg.content.worksheets.length} worksheets</p>
                                                        )}
                                                        {pkg.content.schedule && <p className="text-xs text-foreground">Personalized schedule</p>}
                                                        {pkg.content.tracker && <p className="text-xs text-foreground">Progress tracker</p>}
                                                    </div>
                                                </div>

                                                {/* Expert Info */}
                                                {expert && (
                                                    <div className="pt-2 border-t border-border/50">
                                                        <p className="text-xs font-medium text-muted-foreground">By {expert.name}</p>
                                                        {expert.verified && (
                                                            <Badge variant="outline" className="mt-1 bg-blue-500/10 text-blue-700 border-blue-500/30">
                                                                Verified Expert
                                                            </Badge>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Price and CTA */}
                                                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Price</p>
                                                        <p className="text-xl font-bold text-primary">${pkg.price}</p>
                                                    </div>
                                                    <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90">
                                                        View Package
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
