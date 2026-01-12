"use client"

import { useState } from "react"
import {useStore} from "@/src/lib/store";
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
// import { STRESS_CATEGORIES } from "@/lib/types"
import PackageCard from "./package-card"
import {STRESS_CATEGORIES} from "@/src/lib/types";

export default function ClientMarketplace() {
    const { packages, currentUser } = useStore()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [sortBy, setSortBy] = useState("popular")
    const [minPrice, setMinPrice] = useState("0")
    const [maxPrice, setMaxPrice] = useState("500")

    // Filter and sort packages
    const filteredPackages = packages.filter((pkg) => {
        const matchesSearch =
            pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "all" || pkg.category === selectedCategory
        const matchesPrice = pkg.price >= Number(minPrice) && pkg.price <= Number(maxPrice)
        return matchesSearch && matchesCategory && matchesPrice
    })

    const sortedPackages = [...filteredPackages].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price
            case "price-high":
                return b.price - a.price
            case "rating":
                return b.rating - a.rating
            case "popular":
            default:
                return b.reviews - a.reviews
        }
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            Discover Stress Relief
                            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Solutions
              </span>
                        </h1>
                        <p className="text-muted-foreground mt-3 text-lg">
                            Browse expert-created packages tailored to your stress management needs
                        </p>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-card border border-border/50 rounded-xl p-6 mb-8 shadow-sm">
                    <div className="space-y-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search packages by title or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-11 border-primary/20 focus:border-primary bg-background text-base"
                            />
                        </div>

                        {/* Filters Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-primary" />
                                    Category
                                </label>
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="border-primary/20 focus:border-primary bg-background">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {STRESS_CATEGORIES.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.name}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Sort By</label>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="border-primary/20 focus:border-primary bg-background">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="popular">Most Popular</SelectItem>
                                        <SelectItem value="rating">Highest Rated</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Min Price</label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="border-primary/20 focus:border-primary bg-background"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Max Price</label>
                                <Input
                                    type="number"
                                    placeholder="500"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="border-primary/20 focus:border-primary bg-background"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">&nbsp;</label>
                                <Button
                                    onClick={() => {
                                        setSearchQuery("")
                                        setSelectedCategory("all")
                                        setSortBy("popular")
                                        setMinPrice("0")
                                        setMaxPrice("500")
                                    }}
                                    variant="outline"
                                    className="w-full border-primary/20 hover:bg-primary/5 bg-background"
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-muted-foreground text-sm">
                            Showing <span className="font-semibold text-foreground">{sortedPackages.length}</span> package
                            {sortedPackages.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>

                {/* Packages Grid */}
                {sortedPackages.length === 0 ? (
                    <Card className="border-dashed border-2 border-border text-center py-16">
                        <CardHeader>
                            <CardTitle className="text-xl">No packages found</CardTitle>
                            <CardDescription className="mt-2">
                                Try adjusting your filters or search terms to find what you're looking for
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                onClick={() => {
                                    setSearchQuery("")
                                    setSelectedCategory("all")
                                    setSortBy("popular")
                                    setMinPrice("0")
                                    setMaxPrice("500")
                                }}
                                className="bg-gradient-to-r from-primary to-secondary text-white"
                            >
                                Clear all filters
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                        {sortedPackages.map((pkg) => (
                            <PackageCard key={pkg.id} package={pkg} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
