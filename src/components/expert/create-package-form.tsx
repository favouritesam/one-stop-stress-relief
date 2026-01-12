"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {useStore} from "@/src/lib/store";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, X } from "lucide-react"
import { STRESS_CATEGORIES } from "@/src/lib/types"

export default function CreatePackageForm() {
    const router = useRouter()
    const { currentUser, addPackage } = useStore()
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: 0,
        audioGuides: [""],
        worksheets: [""],
        schedule: "",
        preview: "",
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!currentUser) return

        setIsLoading(true)

        try {
            const newPackage = {
                id: `pkg-${Date.now()}`,
                expertId: currentUser.id,
                title: formData.title,
                description: formData.description,
                category: formData.category,
                price: formData.price,
                rating: 0,
                reviews: 0,
                content: {
                    audioGuides: formData.audioGuides.filter((a) => a.trim()),
                    worksheets: formData.worksheets.filter((w) => w.trim()),
                    schedule: formData.schedule,
                    tracker: "Progress monitoring tools",
                },
                preview: formData.preview,
                createdAt: new Date(),
            }

            addPackage(newPackage)
            router.push("/expert/dashboard")
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => router.push("/expert/dashboard")} className="rounded-lg">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">Create New Package</h1>
                        <p className="text-muted-foreground mt-1">Design a stress-relief solution to help others</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info Card */}
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Name and describe your package</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Package Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Work Stress Mastery"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    className="border-primary/20 focus:border-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe what your package offers and who it's for"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={4}
                                    className="border-primary/20 focus:border-primary resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                                    >
                                        <SelectTrigger className="border-primary/20 focus:border-primary">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {STRESS_CATEGORIES.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.name}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price">Price ($)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder="29.99"
                                        min="10"
                                        max="500"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                                        required
                                        className="border-primary/20 focus:border-primary"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Content Card */}
                    <Card className="border-secondary/20">
                        <CardHeader>
                            <CardTitle>Package Content</CardTitle>
                            <CardDescription>Add audio guides and worksheets</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Audio Guides */}
                            <div className="space-y-3">
                                <Label className="font-semibold">Audio Guides</Label>
                                {formData.audioGuides.map((audio, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            placeholder="e.g., Guided Meditation for Work Stress"
                                            value={audio}
                                            onChange={(e) => {
                                                const newAudios = [...formData.audioGuides]
                                                newAudios[index] = e.target.value
                                                setFormData({ ...formData, audioGuides: newAudios })
                                            }}
                                            className="border-secondary/20 focus:border-secondary"
                                        />
                                        {formData.audioGuides.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    const newAudios = formData.audioGuides.filter((_, i) => i !== index)
                                                    setFormData({ ...formData, audioGuides: newAudios })
                                                }}
                                                className="text-destructive hover:bg-destructive/10"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setFormData({ ...formData, audioGuides: [...formData.audioGuides, ""] })}
                                    className="border-secondary/20 hover:bg-secondary/5 text-secondary"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Audio Guide
                                </Button>
                            </div>

                            {/* Worksheets */}
                            <div className="space-y-3">
                                <Label className="font-semibold">Worksheets</Label>
                                {formData.worksheets.map((worksheet, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            placeholder="e.g., Daily Stress Tracker"
                                            value={worksheet}
                                            onChange={(e) => {
                                                const newWorksheets = [...formData.worksheets]
                                                newWorksheets[index] = e.target.value
                                                setFormData({ ...formData, worksheets: newWorksheets })
                                            }}
                                            className="border-secondary/20 focus:border-secondary"
                                        />
                                        {formData.worksheets.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    const newWorksheets = formData.worksheets.filter((_, i) => i !== index)
                                                    setFormData({ ...formData, worksheets: newWorksheets })
                                                }}
                                                className="text-destructive hover:bg-destructive/10"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setFormData({ ...formData, worksheets: [...formData.worksheets, ""] })}
                                    className="border-secondary/20 hover:bg-secondary/5 text-secondary"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Worksheet
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Program Details Card */}
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle>Program Details</CardTitle>
                            <CardDescription>Outline your program structure</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="schedule">Program Schedule</Label>
                                <Input
                                    id="schedule"
                                    placeholder="e.g., 30-day program, 3 sessions per week"
                                    value={formData.schedule}
                                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                                    required
                                    className="border-primary/20 focus:border-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="preview">Preview Content</Label>
                                <Input
                                    id="preview"
                                    placeholder="e.g., First 5 days of content included"
                                    value={formData.preview}
                                    onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
                                    required
                                    className="border-primary/20 focus:border-primary"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-end">
                        <Button type="button" variant="outline" onClick={() => router.push("/expert/dashboard")} className="px-6">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !formData.title || !formData.category}
                            className="px-6 bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90"
                        >
                            {isLoading ? "Creating..." : "Create Package"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
