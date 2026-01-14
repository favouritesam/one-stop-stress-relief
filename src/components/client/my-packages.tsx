"use client"

import { useStore } from "@/src/lib/store";
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Play, Download } from "lucide-react"

export default function MyPackages() {
    const { currentUser, purchases, packages, users } = useStore()
    const router = useRouter()

    if (!currentUser) return null

    const myPurchases = purchases.filter((p) => p.userId === currentUser.id)
    const purchasedPackages = myPurchases.map((purchase) => {
        const pkg = packages.find((p) => p.id === purchase.packageId)
        const expert = pkg ? users.find((u) => u.id === pkg.expertId) : null
        return { ...purchase, package: pkg, expert }
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold">My Packages</h1>
                    <p className="text-muted-foreground mt-2">Access your purchased stress relief solutions</p>
                </div>

                {purchasedPackages.length === 0 ? (
                    <Card className="border-dashed border-2 border-border text-center py-16">
                        <CardHeader>
                            <CardTitle className="text-xl">No packages yet</CardTitle>
                            <CardDescription>Explore the marketplace to find packages that fit your needs</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                onClick={() => router.push("/client/marketplace")}
                                className="bg-gradient-to-r from-primary to-secondary text-white"
                            >
                                Browse Marketplace
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {purchasedPackages.map((item) => {
                            if (!item.package || !item.expert) return null

                            return (
                                <Card
                                    key={item.id}
                                    className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden flex flex-col"
                                >
                                    {/* Header */}
                                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 h-32 flex items-center justify-center relative">
                                        <span className="text-3xl font-bold text-primary/20">{item.package.title.charAt(0)}</span>
                                    </div>

                                    <CardHeader className="pb-3">
                                        <div>
                                            <CardTitle className="text-lg">{item.package.title}</CardTitle>
                                            <CardDescription className="text-xs mt-1">by {item.expert.name}</CardDescription>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="flex-1 flex flex-col gap-4">
                                        {/* Stats */}
                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="font-medium">{item.package.rating.toFixed(1)}</span>
                                            </div>
                                            <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                                                {item.package.category}
                                            </span>
                                        </div>

                                        {/* Progress Placeholder */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Progress</span>
                                                <span className="font-medium">35%</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-2">
                                                <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-[35%]"></div>
                                            </div>
                                        </div>

                                        {/* Content Stats */}
                                        <div className="text-xs text-muted-foreground space-y-1 border-t border-border pt-3">
                                            {item.package.content.audioGuides && (
                                                <p>🎧 {item.package.content.audioGuides.length} audio guides</p>
                                            )}
                                            {item.package.content.worksheets && <p>📄 {item.package.content.worksheets.length} worksheets</p>}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 pt-2">
                                            <Button
                                                size="sm"
                                                onClick={() => router.push(`/client/package/${item.package!.id}`)}
                                                className="flex-1 bg-gradient-to-r from-primary to-secondary text-white gap-2"
                                            >
                                                <Play className="w-4 h-4" />
                                                <span className="hidden sm:inline">Continue</span>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    if (item.package?.resourceUrl) {
                                                        const link = document.createElement("a");
                                                        link.href = item.package.resourceUrl;
                                                        link.download = `${item.package.title.replace(/\s+/g, "_")}_Resources.pdf`;
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                    } else {
                                                        const count = item.package!.content.worksheets?.length || 0;
                                                        alert(`Preparing download for ${count} worksheets and resources from "${item.package!.title}"...`);
                                                    }
                                                }}
                                                className="flex-1 border-primary/20 hover:bg-primary/5 gap-2 bg-transparent"
                                            >
                                                <Download className="w-4 h-4" />
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
    )
}
