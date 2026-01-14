// "use client"
//
// import {useStore} from "@/src/lib/store";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Eye, MessageSquare, DollarSign, Target } from "lucide-react"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import { useState } from "react"
//
// export default function AnalyticsDashboard() {
//     const { currentUser, packages, purchases } = useStore()
//     const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null)
//
//     if (!currentUser) return null
//
//     const expertPackages = packages.filter((p) => p.expertId === currentUser.id)
//     const expertPurchases = purchases.filter((p) => expertPackages.some((pkg) => pkg.id === p.packageId))
//
//     // Calculate earnings
//     const totalEarnings = expertPurchases.reduce((sum, p) => {
//         const pkg = expertPackages.find((pkg) => pkg.id === p.packageId)
//         return sum + (pkg ? pkg.price * 0.8 : 0) // 80% to expert
//     }, 0)
//
//     // Performance data for chart
//     const performanceData = [
//         { day: "Mon", views: 124, sales: 4, engagement: 65 },
//         { day: "Tue", views: 240, sales: 13, engagement: 78 },
//         { day: "Wed", views: 221, sales: 8, engagement: 72 },
//         { day: "Thu", views: 290, sales: 20, engagement: 85 },
//         { day: "Fri", views: 249, sales: 15, engagement: 81 },
//         { day: "Sat", views: 200, sales: 10, engagement: 70 },
//         { day: "Sun", views: 218, sales: 12, engagement: 75 },
//     ]
//
//     // Engagement data
//     const engagementData = expertPackages.map((pkg) => ({
//         name: pkg.title.substring(0, 20),
//         views: Math.floor(Math.random() * 500) + 100,
//         completionRate: Math.floor(Math.random() * 40) + 60,
//         avgRating: pkg.rating,
//     }))
//
//     // Metrics calculation
//     const metrics = [
//         {
//             title: "Total Earnings This Month",
//             value: `$${totalEarnings.toFixed(2)}`,
//             change: "+18.5%",
//             positive: true,
//             icon: DollarSign,
//         },
//         {
//             title: "Total Views",
//             value: performanceData.reduce((sum, d) => sum + d.views, 0),
//             change: "+12.5%",
//             positive: true,
//             icon: Eye,
//         },
//         {
//             title: "Total Sales",
//             value: expertPurchases.length,
//             change: `+${expertPurchases.length} purchases`,
//             positive: true,
//             icon: Target,
//         },
//         {
//             title: "Avg. Rating",
//             value:
//                 expertPackages.length > 0
//                     ? (expertPackages.reduce((sum, p) => sum + p.rating, 0) / expertPackages.length).toFixed(1)
//                     : "0",
//             change: "Based on reviews",
//             positive: true,
//             icon: MessageSquare,
//         },
//     ]
//
//     const selectedPackage = selectedPackageId ? expertPackages.find((p) => p.id === selectedPackageId) : null
//     const selectedPackagePurchases = selectedPackage
//         ? expertPurchases.filter((p) => p.packageId === selectedPackage.id)
//         : []
//
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <h1 className="text-3xl sm:text-4xl font-bold">Analytics Dashboard</h1>
//                     <p className="text-muted-foreground mt-2">Real-time performance, engagement, and earnings tracking</p>
//                 </div>
//
//                 {/* Key Metrics */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                     {metrics.map((metric) => {
//                         const Icon = metric.icon
//                         return (
//                             <Card key={metric.title} className="border-border/50 hover:border-primary/30 transition-colors">
//                                 <CardHeader className="pb-3">
//                                     <div className="flex items-center justify-between">
//                                         <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
//                                         <div className="p-2 rounded-lg bg-primary/10 text-primary">
//                                             <Icon className="w-4 h-4" />
//                                         </div>
//                                     </div>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="flex items-baseline gap-2">
//                                         <p className="text-2xl sm:text-3xl font-bold">{metric.value}</p>
//                                         <Badge variant={metric.positive ? "default" : "destructive"} className="text-xs">
//                                             {metric.change}
//                                         </Badge>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         )
//                     })}
//                 </div>
//
//                 <Card className="border-primary/20 mb-8">
//                     <CardHeader>
//                         <CardTitle>Real-Time Performance (This Week)</CardTitle>
//                         <CardDescription>Track your views, sales, and user engagement daily</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <ChartContainer
//                             config={{
//                                 views: {
//                                     label: "Views",
//                                     color: "hsl(var(--primary))",
//                                 },
//                                 sales: {
//                                     label: "Sales",
//                                     color: "hsl(var(--secondary))",
//                                 },
//                                 engagement: {
//                                     label: "Engagement %",
//                                     color: "hsl(var(--chart-2))",
//                                 },
//                             }}
//                             className="h-[300px]"
//                         >
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis dataKey="day" />
//                                     <YAxis />
//                                     <ChartTooltip content={<ChartTooltipContent />} />
//                                     <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" name="Views" strokeWidth={2} />
//                                     <Line type="monotone" dataKey="sales" stroke="hsl(var(--secondary))" name="Sales" strokeWidth={2} />
//                                     <Line
//                                         type="monotone"
//                                         dataKey="engagement"
//                                         stroke="hsl(var(--chart-2))"
//                                         name="Engagement %"
//                                         strokeWidth={2}
//                                     />
//                                 </LineChart>
//                             </ResponsiveContainer>
//                         </ChartContainer>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-primary/20 mb-8">
//                     <CardHeader>
//                         <CardTitle>Package Performance & Pricing Optimization</CardTitle>
//                         <CardDescription>Track which solutions work best and adjust prices to maximize earnings</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="space-y-4">
//                             {expertPackages.length === 0 ? (
//                                 <div className="text-center py-8">
//                                     <p className="text-muted-foreground">Create your first package to see analytics</p>
//                                 </div>
//                             ) : (
//                                 expertPackages.map((pkg) => {
//                                     const pkgPurchases = expertPurchases.filter((p) => p.packageId === pkg.id).length
//                                     const revenue = pkgPurchases * pkg.price * 0.8 // 80% to expert
//                                     const conversionRate = pkg.views ? ((pkgPurchases / pkg.views) * 100).toFixed(1) : "0"
//
//                                     return (
//                                         <div
//                                             key={pkg.id}
//                                             className="p-4 border border-border rounded-lg hover:border-primary/30 transition-colors cursor-pointer"
//                                             onClick={() => setSelectedPackageId(pkg.id === selectedPackageId ? null : pkg.id)}
//                                         >
//                                             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                                                 <div className="flex-1">
//                                                     <p className="font-semibold">{pkg.title}</p>
//                                                     <p className="text-sm text-muted-foreground mt-1">Current Price: ${pkg.price}</p>
//                                                 </div>
//
//                                                 <div className="grid grid-cols-4 gap-4 text-center text-sm">
//                                                     <div>
//                                                         <p className="text-lg font-bold text-primary">{pkg.views || 0}</p>
//                                                         <p className="text-xs text-muted-foreground">Views</p>
//                                                     </div>
//                                                     <div>
//                                                         <p className="text-lg font-bold text-secondary">{pkgPurchases}</p>
//                                                         <p className="text-xs text-muted-foreground">Sales</p>
//                                                     </div>
//                                                     <div>
//                                                         <p className="text-lg font-bold text-green-600">${revenue.toFixed(0)}</p>
//                                                         <p className="text-xs text-muted-foreground">Earnings</p>
//                                                     </div>
//                                                     <div>
//                                                         <p className="text-lg font-bold text-blue-600">{conversionRate}%</p>
//                                                         <p className="text-xs text-muted-foreground">Conversion</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//
//                                             {selectedPackageId === pkg.id && (
//                                                 <div className="mt-4 pt-4 border-t border-border space-y-3">
//                                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                                         <div>
//                                                             <p className="text-sm font-medium mb-2">Rating & Reviews</p>
//                                                             <p className="text-2xl font-bold text-primary">{pkg.rating.toFixed(1)} ⭐</p>
//                                                             <p className="text-xs text-muted-foreground">{pkg.reviews} reviews</p>
//                                                         </div>
//                                                         <div>
//                                                             <p className="text-sm font-medium mb-2">Engagement Rate</p>
//                                                             <p className="text-2xl font-bold text-secondary">
//                                                                 {Math.floor(Math.random() * 40) + 60}%
//                                                             </p>
//                                                             <p className="text-xs text-muted-foreground">User completion rate</p>
//                                                         </div>
//                                                     </div>
//
//                                                     <div className="space-y-2">
//                                                         <p className="text-sm font-medium">Price Adjustment Tools</p>
//                                                         <div className="flex gap-2 flex-wrap">
//                                                             <Button
//                                                                 size="sm"
//                                                                 variant="outline"
//                                                                 className="text-xs bg-transparent"
//                                                                 onClick={() => alert("Price reduced by 10%")}
//                                                             >
//                                                                 Lower Price (-10%)
//                                                             </Button>
//                                                             <Button
//                                                                 size="sm"
//                                                                 variant="outline"
//                                                                 className="text-xs bg-transparent"
//                                                                 onClick={() => alert("Price increased by 10%")}
//                                                             >
//                                                                 Raise Price (+10%)
//                                                             </Button>
//                                                             <Button
//                                                                 size="sm"
//                                                                 variant="outline"
//                                                                 className="text-xs bg-transparent"
//                                                                 onClick={() => alert("Creating promotional offer")}
//                                                             >
//                                                                 Create Promo
//                                                             </Button>
//                                                         </div>
//                                                     </div>
//
//                                                     <div className="bg-muted/50 p-3 rounded text-sm">
//                                                         <p className="font-medium mb-1">Recommendation</p>
//                                                         <p className="text-muted-foreground">
//                                                             {conversionRate > 10
//                                                                 ? "Consider raising price - high conversion rate indicates strong demand"
//                                                                 : "Consider promotional pricing or adding more content to boost conversions"}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )
//                                 })
//                             )}
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-secondary/20">
//                     <CardHeader>
//                         <CardTitle>User Engagement by Package</CardTitle>
//                         <CardDescription>See which packages drive the most engagement</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <ChartContainer
//                             config={{
//                                 completionRate: {
//                                     label: "Completion Rate",
//                                     color: "hsl(var(--chart-1))",
//                                 },
//                             }}
//                             className="h-[300px]"
//                         >
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <BarChart data={engagementData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} tick={{ fontSize: 12 }} />
//                                     <YAxis />
//                                     <ChartTooltip content={<ChartTooltipContent />} />
//                                     <Bar dataKey="completionRate" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Completion %" />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </ChartContainer>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     )
// }



"use client"

import { useStore } from "@/src/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MessageSquare, DollarSign, Target } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useState } from "react"

export default function AnalyticsDashboard() {
    const { currentUser, packages, purchases } = useStore()
    const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null)

    if (!currentUser) return null

    const expertPackages = packages.filter((p) => p.expertId === currentUser.id)
    const expertPurchases = purchases.filter((p) => expertPackages.some((pkg) => pkg.id === p.packageId))

    // Calculate earnings
    const totalEarnings = expertPurchases.reduce((sum, p) => {
        const pkg = expertPackages.find((pkg) => pkg.id === p.packageId)
        return sum + (pkg ? pkg.price * 0.8 : 0)
    }, 0)

    // Performance data for chart
    const performanceData = [
        { day: "Mon", views: 124, sales: 4, engagement: 65 },
        { day: "Tue", views: 240, sales: 13, engagement: 78 },
        { day: "Wed", views: 221, sales: 8, engagement: 72 },
        { day: "Thu", views: 290, sales: 20, engagement: 85 },
        { day: "Fri", views: 249, sales: 15, engagement: 81 },
        { day: "Sat", views: 200, sales: 10, engagement: 70 },
        { day: "Sun", views: 218, sales: 12, engagement: 75 },
    ]

    // Engagement data
    const engagementData = expertPackages.map((pkg) => ({
        name: pkg.title.substring(0, 20),
        views: Math.floor(Math.random() * 500) + 100,
        completionRate: Math.floor(Math.random() * 40) + 60,
        avgRating: pkg.rating,
    }))

    // Metrics calculation
    const metrics = [
        {
            title: "Total Earnings This Month",
            value: `$${totalEarnings.toFixed(2)}`,
            change: "+18.5%",
            positive: true,
            icon: DollarSign,
        },
        {
            title: "Total Views",
            value: performanceData.reduce((sum, d) => sum + d.views, 0),
            change: "+12.5%",
            positive: true,
            icon: Eye,
        },
        {
            title: "Total Sales",
            value: expertPurchases.length,
            change: `+${expertPurchases.length} purchases`,
            positive: true,
            icon: Target,
        },
        {
            title: "Avg. Rating",
            value:
                expertPackages.length > 0
                    ? (expertPackages.reduce((sum, p) => sum + p.rating, 0) / expertPackages.length).toFixed(1)
                    : "0",
            change: "Based on reviews",
            positive: true,
            icon: MessageSquare,
        },
    ]

    const selectedPackage = selectedPackageId ? expertPackages.find((p) => p.id === selectedPackageId) : null

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold">Analytics Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Real-time performance, engagement, and earnings tracking</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {metrics.map((metric) => {
                        const Icon = metric.icon
                        return (
                            <Card key={metric.title} className="border-border/50 hover:border-primary/30 transition-colors">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-2xl sm:text-3xl font-bold">{metric.value}</p>
                                        <Badge variant={metric.positive ? "default" : "destructive"} className="text-xs">
                                            {metric.change}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                <Card className="border-primary/20 mb-8">
                    <CardHeader>
                        <CardTitle>Real-Time Performance (This Week)</CardTitle>
                        <CardDescription>Track your views, sales, and user engagement daily</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                views: {
                                    label: "Views",
                                    color: "hsl(var(--primary))",
                                },
                                sales: {
                                    label: "Sales",
                                    color: "hsl(var(--secondary))",
                                },
                                engagement: {
                                    label: "Engagement %",
                                    color: "hsl(var(--chart-2))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" name="Views" strokeWidth={2} />
                                    <Line type="monotone" dataKey="sales" stroke="hsl(var(--secondary))" name="Sales" strokeWidth={2} />
                                    <Line
                                        type="monotone"
                                        dataKey="engagement"
                                        stroke="hsl(var(--chart-2))"
                                        name="Engagement %"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="border-primary/20 mb-8">
                    <CardHeader>
                        <CardTitle>Package Performance & Pricing Optimization</CardTitle>
                        <CardDescription>Track which solutions work best and adjust prices to maximize earnings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {expertPackages.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">Create your first package to see analytics</p>
                                </div>
                            ) : (
                                expertPackages.map((pkg) => {
                                    const pkgPurchases = expertPurchases.filter((p) => p.packageId === pkg.id).length
                                    const revenue = pkgPurchases * pkg.price * 0.8
                                    const numericConversionRate = pkg.views > 0 ? (pkgPurchases / pkg.views) * 100 : 0
                                    const displayConversionRate = numericConversionRate.toFixed(1)

                                    return (
                                        <div
                                            key={pkg.id}
                                            className="p-4 border border-border rounded-lg hover:border-primary/30 transition-colors cursor-pointer"
                                            onClick={() => setSelectedPackageId(pkg.id === selectedPackageId ? null : pkg.id)}
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                <div className="flex-1">
                                                    <p className="font-semibold">{pkg.title}</p>
                                                    <p className="text-sm text-muted-foreground mt-1">Current Price: ${pkg.price}</p>
                                                </div>

                                                <div className="grid grid-cols-4 gap-4 text-center text-sm">
                                                    <div>
                                                        <p className="text-lg font-bold text-primary">{pkg.views}</p>
                                                        <p className="text-xs text-muted-foreground">Views</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-bold text-secondary">{pkgPurchases}</p>
                                                        <p className="text-xs text-muted-foreground">Sales</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-bold text-green-600">${revenue.toFixed(0)}</p>
                                                        <p className="text-xs text-muted-foreground">Earnings</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-bold text-blue-600">{displayConversionRate}%</p>
                                                        <p className="text-xs text-muted-foreground">Conversion</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {selectedPackageId === pkg.id && (
                                                <div className="mt-4 pt-4 border-t border-border space-y-3">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-sm font-medium mb-2">Rating & Reviews</p>
                                                            <p className="text-2xl font-bold text-primary">{pkg.rating.toFixed(1)} ⭐</p>
                                                            <p className="text-xs text-muted-foreground">{pkg.reviews} reviews</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium mb-2">Engagement Rate</p>
                                                            <p className="text-2xl font-bold text-secondary">
                                                                {Math.floor(Math.random() * 40) + 60}%
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">User completion rate</p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <p className="text-sm font-medium">Price Adjustment Tools</p>
                                                        <div className="flex gap-2 flex-wrap">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="text-xs bg-transparent"
                                                                onClick={() => alert("Price reduced by 10%")}
                                                            >
                                                                Lower Price (-10%)
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="text-xs bg-transparent"
                                                                onClick={() => alert("Price increased by 10%")}
                                                            >
                                                                Raise Price (+10%)
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="text-xs bg-transparent"
                                                                onClick={() => alert("Creating promotional offer")}
                                                            >
                                                                Create Promo
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    <div className="bg-muted/50 p-3 rounded text-sm">
                                                        <p className="font-medium mb-1">Recommendation</p>
                                                        <p className="text-muted-foreground">
                                                            {numericConversionRate > 10
                                                                ? "Consider raising price - high conversion rate indicates strong demand"
                                                                : "Consider promotional pricing or adding more content to boost conversions"}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-secondary/20">
                    <CardHeader>
                        <CardTitle>User Engagement by Package</CardTitle>
                        <CardDescription>See which packages drive the most engagement</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                completionRate: {
                                    label: "Completion Rate",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={engagementData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} tick={{ fontSize: 12 }} />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="completionRate" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Completion %" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

