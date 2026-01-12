"use client"

import type { Package } from "@/src/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Edit, Trash2, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import {useStore} from "@/src/lib/store";

interface PackageListProps {
    packages: Package[]
    selectedId: string | null
    onSelect: (id: string) => void
}

export default function PackageList({ packages, selectedId, onSelect }: PackageListProps) {
    const router = useRouter()
    const { deletePackage } = useStore()

    return (
        <div className="grid grid-cols-1 gap-4">
            {packages.map((pkg) => (
                <Card
                    key={pkg.id}
                    className={`border transition-all cursor-pointer hover:border-primary/50 hover:shadow-md ${
                        selectedId === pkg.id ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onClick={() => onSelect(pkg.id)}
                >
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <CardTitle className="text-lg">{pkg.title}</CardTitle>
                                <CardDescription className="mt-1">{pkg.description}</CardDescription>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-primary">${pkg.price}</p>
                                <p className="text-xs text-muted-foreground">{pkg.category}</p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium">{pkg.rating.toFixed(1)}</span>
                                    <span className="text-xs text-muted-foreground">({pkg.reviews} reviews)</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 rounded bg-muted text-muted-foreground rounded-full">
                    {pkg.content.audioGuides?.length || 0} audios
                  </span>
                                    <span className="px-2 py-1 rounded bg-muted text-muted-foreground rounded-full">
                    {pkg.content.worksheets?.length || 0} worksheets
                  </span>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 sm:flex-initial gap-2 border-primary/20 hover:bg-primary/5 bg-transparent"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        router.push(`/expert/package/${pkg.id}/preview`)
                                    }}
                                >
                                    <Eye className="w-4 h-4" />
                                    <span className="hidden sm:inline">Preview</span>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 sm:flex-initial gap-2 border-primary/20 hover:bg-primary/5 bg-transparent"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        router.push(`/expert/edit-package/${pkg.id}`)
                                    }}
                                >
                                    <Edit className="w-4 h-4" />
                                    <span className="hidden sm:inline">Edit</span>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 sm:flex-initial gap-2 border-destructive/20 hover:bg-destructive/5 text-destructive hover:text-destructive bg-transparent"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        if (confirm("Are you sure you want to delete this package?")) {
                                            deletePackage(pkg.id)
                                        }
                                    }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span className="hidden sm:inline">Delete</span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
