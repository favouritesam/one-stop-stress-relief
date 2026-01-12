"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/src/lib/store";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Eye, Star, Users } from "lucide-react"
import Navbar from "@/src/components/layout/navbar";

export default function AIInsightsPage() {
    const router = useRouter()
    const { currentUser, packages, assessments } = useStore()
    const [recommendationData, setRecommendationData] = useState<any[]>([])
    const [trendingStressTypes, setTrendingStressTypes] = useState<any[]>([])

    useEffect(() => {
        if (!currentUser || currentUser.userType !== "expert") {
            router.push("/")
            return
        }

        // Get expert's packages
        const expertPackages = packages.filter((p) => p.expertId === currentUser.id)

        // Analyze assessments to find trending stress types
        const stressTrends: Record<string, number> = {}
        assessments.forEach((assessment) => {
            stressTrends[assessment.stressType] = (stressTrends[assessment.stressType] || 0) + 1
        })

        const trends = Object.entries(stressTrends)
            .map(([type, count]) => ({
                stressType: type,
                seekers: count,
                demand: "High",
            }))
            .sort((a, b) => b.seekers - a.seekers)

        setTrendingStressTypes(trends)

        // Simulate recommendation metrics
        const metrics = expertPackages.map((pkg) => ({
            name: pkg.title,
            visibility: Math.floor(Math.random() * 100) + 50,
            searchRank: Math.floor(Math.random() * 50) + 1,
            potentialRevenue: pkg.price * (Math.floor(Math.random() * 20) + 5),
            rating: pkg.rating,
        }))

        setRecommendationData(metrics)
    }, [currentUser, packages, assessments, router])

    if (currentUser?.userType !== "expert") {
        return null
    }

    const overallVisibility =
        recommendationData.length > 0
            ? Math.round(recommendationData.reduce((sum, m) => sum + m.visibility, 0) / recommendationData.length)
            : 0

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2">AI Insights & Recommendations</h1>
                        <p className="text-lg text-muted-foreground">
                            Understand how AI matching affects your visibility and earn more by improving your packages
                        </p>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <Card className="border-border/50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    Overall Visibility
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-primary">{overallVisibility}%</p>
                                <p className="text-xs text-muted-foreground mt-1">Based on AI matching</p>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Avg. Rating Impact
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-secondary">+15%</p>
                                <p className="text-xs text-muted-foreground mt-1">Higher ratings = higher visibility</p>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Active Seekers
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{assessments.length}</p>
                                <p className="text-xs text-muted-foreground mt-1">Looking for solutions</p>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <Star className="w-4 h-4" />
                                    Match Opportunities
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-primary">{Math.floor(assessments.length * 0.6)}</p>
                                <p className="text-xs text-muted-foreground mt-1">Potential matches</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Trending Stress Types */}
                    {trendingStressTypes.length > 0 && (
                        <Card className="border-border/50 mb-8">
                            <CardHeader>
                                <CardTitle>Trending Stress Types (Market Opportunities)</CardTitle>
                                <CardDescription>
                                    What seekers are looking for - consider creating packages in these areas
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {trendingStressTypes.map((trend, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <div className="font-medium capitalize mb-1">{trend.stressType}</div>
                                                <p className="text-sm text-muted-foreground">{trend.seekers} seekers in this category</p>
                                            </div>
                                            <div className="text-right">
                                                <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
                                                    {trend.demand} Demand
                                                </Badge>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {Math.round((trend.seekers / assessments.length) * 100)}% of all seekers
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Package Visibility Chart */}
                    {recommendationData.length > 0 && (
                        <Card className="border-border/50 mb-8">
                            <CardHeader>
                                <CardTitle>Package Visibility in AI Matching</CardTitle>
                                <CardDescription>How often your packages appear in AI-powered recommendations</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        visibility: {
                                            label: "Visibility Score",
                                            color: "hsl(var(--primary))",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={recommendationData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="name"
                                                angle={-45}
                                                textAnchor="end"
                                                height={100}
                                                interval={0}
                                                tick={{ fontSize: 12 }}
                                            />
                                            <YAxis />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="visibility" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    )}

                    {/* How to Improve Rankings */}
                    <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle>How to Improve Your AI Rankings</CardTitle>
                            <CardDescription>Follow these strategies to increase visibility and earn more</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    {
                                        title: "Increase Your Rating",
                                        description: "Packages with ratings above 4.5 appear 3x more often in recommendations",
                                        action: "Focus on package quality",
                                    },
                                    {
                                        title: "Match Market Demand",
                                        description: "Create packages for trending stress types above. AI matches based on seeker needs.",
                                        action: "Create in-demand packages",
                                    },
                                    {
                                        title: "Set Competitive Prices",
                                        description: "Packages within seeker budgets get prioritized by the matching algorithm",
                                        action: "Review your pricing",
                                    },
                                    {
                                        title: "Add Rich Content",
                                        description: "Packages with audio guides, worksheets, and trackers match more users",
                                        action: "Enhance your content",
                                    },
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-2 border-primary/30 hover:bg-primary/5 bg-transparent"
                                            onClick={() => router.push("/expert/create-package")}
                                        >
                                            {item.action}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
