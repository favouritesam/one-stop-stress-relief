"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"
import { Users, Package, TrendingUp } from "lucide-react"
import {useStore} from "@/src/lib/store";
import Navbar from "@/src/components/layout/navbar";

export default function AdminDashboardPage() {
    const { currentUser, users, packages, purchases } = useStore()
    const router = useRouter()

    useEffect(() => {
        if (!currentUser || currentUser.userType !== "admin") {
            router.push("/")
        }
    }, [currentUser, router])

    if (!currentUser || currentUser.userType !== "admin") {
        return null
    }

    const experts = users.filter((u) => u.userType === "expert")
    const clients = users.filter((u) => u.userType === "client")
    const totalRevenue = purchases.reduce((sum, p) => sum + p.amount, 0)
    const platformFees = purchases.reduce((sum, p) => sum + p.amount * 0.2, 0)

    const stats = [
        {
            title: "Total Users",
            value: users.length,
            icon: Users,
            color: "bg-primary/10 text-primary",
        },
        {
            title: "Active Experts",
            value: experts.length,
            icon: Package,
            color: "bg-secondary/10 text-secondary",
        },
        {
            title: "Total Packages",
            value: packages.length,
            icon: Package,
            color: "bg-primary/10 text-primary",
        },
        {
            title: "Total Sales",
            value: purchases.length,
            icon: TrendingUp,
            color: "bg-green-100 text-green-600",
        },
    ]

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            Admin Dashboard
                            <span className="block text-lg text-muted-foreground font-normal mt-2">Platform Management</span>
                        </h1>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {stats.map((stat) => {
                            const Icon = stat.icon
                            return (
                                <Card key={stat.title} className="border-border/50">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                                            <div className={`p-2 rounded-lg ${stat.color}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    {/* Revenue & Metrics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle>Financial Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-border">
                                    <span className="text-muted-foreground">Total Revenue</span>
                                    <span className="text-2xl font-bold text-primary">${totalRevenue.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-border">
                                    <span className="text-muted-foreground">Platform Fees (20%)</span>
                                    <span className="text-xl font-bold text-secondary">${platformFees.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Expert Payouts (80%)</span>
                                    <span className="text-xl font-bold text-green-600">
                    ${(totalRevenue - platformFees).toLocaleString()}
                  </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-secondary/20">
                            <CardHeader>
                                <CardTitle>User Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-border">
                                    <span className="text-muted-foreground">Total Users</span>
                                    <span className="text-2xl font-bold">{users.length}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-border">
                                    <span className="text-muted-foreground">Verified Experts</span>
                                    <span className="text-xl font-bold text-primary">
                    {experts.filter((e) => e.verified).length}/{experts.length}
                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Active Clients</span>
                                    <span className="text-xl font-bold text-secondary">{clients.length}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity */}
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle>Recent Transactions</CardTitle>
                            <CardDescription>Latest package purchases</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {purchases.slice(0, 5).map((purchase) => {
                                    const pkg = packages.find((p) => p.id === purchase.packageId)
                                    const buyer = users.find((u) => u.id === purchase.userId)

                                    return (
                                        <div
                                            key={purchase.id}
                                            className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 transition-colors"
                                        >
                                            <div>
                                                <p className="font-medium">{pkg?.title}</p>
                                                <p className="text-xs text-muted-foreground">by {buyer?.name}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-primary">${purchase.amount.toFixed(2)}</p>
                                                <p className="text-xs text-green-600 font-medium">{purchase.status}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
