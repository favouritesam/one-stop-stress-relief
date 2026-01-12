// "use client"
//
// import {useStore} from "@/src/lib/store";
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Plus, Package, TrendingUp, DollarSign, Star } from "lucide-react"
// import PackageList from "./package-list"
// import { useState } from "react"
//
// export default function ExpertDashboard() {
//     const { currentUser, packages, getPackagesByExpert } = useStore()
//     const router = useRouter()
//     const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
//
//     if (!currentUser) return null
//
//     const expertPackages = getPackagesByExpert(currentUser.id)
//     const totalEarnings = currentUser.totalEarnings || 0
//     const avgRating = currentUser.rating || 0
//
//     const stats = [
//         {
//             title: "Total Packages",
//             value: expertPackages.length,
//             icon: Package,
//             color: "bg-primary/10 text-primary",
//         },
//         {
//             title: "Revenue",
//             value: `$${totalEarnings.toLocaleString()}`,
//             icon: DollarSign,
//             color: "bg-green-100 text-green-600",
//         },
//         {
//             title: "Rating",
//             value: avgRating.toFixed(1),
//             icon: Star,
//             color: "bg-yellow-100 text-yellow-600",
//         },
//         {
//             title: "Total Sales",
//             value: packages.filter((p) => p.expertId === currentUser.id).length * 5,
//             icon: TrendingUp,
//             color: "bg-secondary/10 text-secondary",
//         },
//     ]
//
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Header */}
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
//                     <div>
//                         <h1 className="text-3xl sm:text-4xl font-bold">
//                             Welcome back,{" "}
//                             <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//                 {currentUser.name}
//               </span>
//                         </h1>
//                         <p className="text-muted-foreground mt-2">Manage your packages and track your earnings</p>
//                     </div>
//                     <Button
//                         onClick={() => router.push("/expert/create-package")}
//                         className="mt-4 sm:mt-0 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white gap-2"
//                     >
//                         <Plus className="w-4 h-4" />
//                         Create Package
//                     </Button>
//                 </div>
//
//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                     {stats.map((stat) => {
//                         const Icon = stat.icon
//                         return (
//                             <Card key={stat.title} className="border-border/50 hover:border-primary/30 transition-colors">
//                                 <CardHeader className="pb-3">
//                                     <div className="flex items-center justify-between">
//                                         <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
//                                         <div className={`p-2 rounded-lg ${stat.color}`}>
//                                             <Icon className="w-4 h-4" />
//                                         </div>
//                                     </div>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
//                                 </CardContent>
//                             </Card>
//                         )
//                     })}
//                 </div>
//
//                 {/* Verification Status */}
//                 {!currentUser.verified && (
//                     <Card className="mb-8 border-yellow-200 bg-yellow-50">
//                         <CardHeader className="pb-3">
//                             <CardTitle className="text-base">Complete Verification</CardTitle>
//                             <CardDescription className="text-sm">
//                                 Get verified to unlock premium features and increase your earning potential
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <Button
//                                 onClick={() => router.push("/expert/verification")}
//                                 className="bg-yellow-600 hover:bg-yellow-700 text-white"
//                             >
//                                 Start Verification
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 )}
//
//                 {/* Packages Section */}
//                 <div>
//                     <div className="flex items-center justify-between mb-4">
//                         <div>
//                             <h2 className="text-2xl font-bold">Your Packages</h2>
//                             <p className="text-muted-foreground text-sm mt-1">Manage and monitor your solution packages</p>
//                         </div>
//                         {expertPackages.length > 0 && (
//                             <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
//                 {expertPackages.length} active
//               </span>
//                         )}
//                     </div>
//
//                     {expertPackages.length === 0 ? (
//                         <Card className="border-dashed border-2 border-border text-center py-12">
//                             <Package className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
//                             <CardTitle className="mb-2">No packages yet</CardTitle>
//                             <CardDescription>Create your first stress-relief package to start earning</CardDescription>
//                             <Button
//                                 onClick={() => router.push("/expert/create-package")}
//                                 className="mt-6 bg-gradient-to-r from-primary to-secondary text-white"
//                             >
//                                 <Plus className="w-4 h-4 mr-2" />
//                                 Create Package
//                             </Button>
//                         </Card>
//                     ) : (
//                         <PackageList packages={expertPackages} selectedId={selectedPackage} onSelect={setSelectedPackage} />
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }



"use client"

import { useStore } from "@/src/lib/store"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Package, TrendingUp, DollarSign, Star } from "lucide-react"
import PackageList from "./package-list"
import { useState } from "react"

export default function ExpertDashboard() {
    const { currentUser, packages, getPackagesByExpert } = useStore()
    const router = useRouter()
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

    if (!currentUser) return null

    const expertPackages = getPackagesByExpert(currentUser.id)
    const totalEarnings = currentUser.totalEarnings || 0
    const avgRating = currentUser.rating || 0

    const stats = [
        {
            title: "Total Packages",
            value: expertPackages.length,
            icon: Package,
            color: "bg-primary/10 text-primary",
        },
        {
            title: "Revenue",
            value: `$${totalEarnings.toLocaleString()}`,
            icon: DollarSign,
            color: "bg-green-100 text-green-600",
        },
        {
            title: "Rating",
            value: avgRating.toFixed(1),
            icon: Star,
            color: "bg-yellow-100 text-yellow-600",
        },
        {
            title: "Total Sales",
            value: packages.filter((p) => p.expertId === currentUser.id).length * 5,
            icon: TrendingUp,
            color: "bg-secondary/10 text-secondary",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            Welcome back,{" "}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {currentUser.name}
              </span>
                        </h1>
                        <p className="text-muted-foreground mt-2">Manage your packages and track your earnings</p>
                    </div>
                    <Button
                        onClick={() => router.push("/expert/create-package")}
                        className="mt-4 sm:mt-0 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Create Package
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

                {/* Verification Status */}
                {!currentUser.verified && (
                    <Card className="mb-8 border-yellow-200 bg-yellow-50">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Complete Verification</CardTitle>
                            <CardDescription className="text-sm">
                                Get verified to unlock premium features and increase your earning potential
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                onClick={() => router.push("/expert/analytics")}
                                className="bg-yellow-600 hover:bg-yellow-700 text-white"
                            >
                                Start Verification
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Packages Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold">Your Packages</h2>
                            <p className="text-muted-foreground text-sm mt-1">Manage and monitor your solution packages</p>
                        </div>
                        {expertPackages.length > 0 && (
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {expertPackages.length} active
              </span>
                        )}
                    </div>

                    {expertPackages.length === 0 ? (
                        <Card className="border-dashed border-2 border-border text-center py-12">
                            <Package className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                            <CardTitle className="mb-2">No packages yet</CardTitle>
                            <CardDescription>Create your first stress-relief package to start earning</CardDescription>
                            <Button
                                onClick={() => router.push("/expert/create-package")}
                                className="mt-6 bg-gradient-to-r from-primary to-secondary text-white"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Create Package
                            </Button>
                        </Card>
                    ) : (
                        <PackageList packages={expertPackages} selectedId={selectedPackage} onSelect={setSelectedPackage} />
                    )}
                </div>
            </div>
        </div>
    )
}
