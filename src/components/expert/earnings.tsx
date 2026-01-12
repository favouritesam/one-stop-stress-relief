"use client"

import { useStore } from "@/src/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Users, Calendar, Download, Filter } from "lucide-react"
import { useState } from "react"

export default function EarningsPage() {
    const { currentUser, purchases, packages } = useStore()
    const [filterMonth, setFilterMonth] = useState("all")
    const [isPayoutLoading, setIsPayoutLoading] = useState(false)

    const handleDownloadReport = () => {
        if (expertPurchases.length === 0) {
            alert("No sales data available to download.");
            return;
        }

        const headers = ["Date", "Package", "Amount", "Platform Fee", "Net Earnings"];
        const rows = expertPurchases.map(p => {
            const pkg = packages.find(pkg => pkg.id === p.packageId);
            return [
                new Date(p.purchasedAt).toLocaleDateString(),
                pkg?.title || "Unknown Package",
                p.amount.toFixed(2),
                (p.amount * 0.2).toFixed(2),
                (p.amount * 0.8).toFixed(2)
            ].join(",");
        });

        const csvContent = [headers.join(","), ...rows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `earnings_report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleRequestPayout = () => {
        if (netEarnings <= 0) {
            alert("No available earnings to payout.");
            return;
        }

        setIsPayoutLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsPayoutLoading(false);
            alert(`Payout request for $${(netEarnings / 2).toFixed(2)} submitted successfully! It will be processed on the next pay date.`);
        }, 1500);
    };

    if (!currentUser) return null

    const expertPackages = packages.filter((p) => p.expertId === currentUser.id)
    const expertPurchases = purchases.filter((p) => expertPackages.some((pkg) => pkg.id === p.packageId))

    const totalEarnings = currentUser.totalEarnings || 0
    const totalSales = expertPurchases.length
    const platformFee = expertPurchases.reduce((sum, p) => sum + p.amount * 0.2, 0)
    const netEarnings = expertPurchases.reduce((sum, p) => sum + p.amount * 0.8, 0)

    const stats = [
        {
            title: "Total Earnings",
            value: `$${totalEarnings.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
            icon: DollarSign,
            color: "bg-green-100 text-green-600",
        },
        {
            title: "Total Sales",
            value: totalSales,
            icon: Users,
            color: "bg-primary/10 text-primary",
        },
        {
            title: "Net Revenue (80%)",
            value: `$${netEarnings.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
            icon: TrendingUp,
            color: "bg-secondary/10 text-secondary",
        },
        {
            title: "Platform Fee (20%)",
            value: `$${platformFee.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
            icon: Calendar,
            color: "bg-muted text-muted-foreground",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold">Revenue & Earnings</h1>
                        <p className="text-muted-foreground mt-2">Track your sales and payouts</p>
                    </div>
                    <Button
                        onClick={handleDownloadReport}
                        className="mt-4 sm:mt-0 bg-gradient-to-r from-primary to-secondary text-white gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Download Report
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <Card key={stat.title} className="border-border/50 hover:border-primary/30 transition-colors">
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

                {/* Sales Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Sales</CardTitle>
                                <CardDescription>Your package sales and earnings</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5 bg-transparent">
                                <Filter className="w-4 h-4" />
                                <span className="hidden sm:inline">Filter</span>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {expertPurchases.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-muted-foreground">No sales yet. Promote your packages to start earning!</p>
                                    </div>
                                ) : (
                                    expertPurchases.map((purchase) => {
                                        const purchasedPackage = packages.find((p) => p.id === purchase.packageId)
                                        const earning = purchase.amount * 0.8

                                        return (
                                            <div
                                                key={purchase.id}
                                                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
                                            >
                                                <div>
                                                    <p className="font-medium">{purchasedPackage?.title}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(purchase.purchasedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-primary">${earning.toFixed(2)}</p>
                                                    <p className="text-xs text-muted-foreground">You earn 80%</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payout Information */}
                    <Card className="border-secondary/20">
                        <CardHeader>
                            <CardTitle>Next Payout</CardTitle>
                            <CardDescription>Weekly on Fridays</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Pending Amount</span>
                                    <span className="font-bold text-primary">${(netEarnings / 2).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Next Payout Date</span>
                                    <span className="font-medium">Friday, Jan 17</span>
                                </div>
                            </div>

                            <Button
                                onClick={handleRequestPayout}
                                disabled={isPayoutLoading || netEarnings <= 0}
                                className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                            >
                                {isPayoutLoading ? "Processing..." : "Request Payout"}
                            </Button>

                            <p className="text-xs text-muted-foreground text-center pt-2">
                                Payouts are sent to your registered bank account
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
