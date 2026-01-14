"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/src/lib/store";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, X, Music, Play, Pause } from "lucide-react"
import { STRESS_CATEGORIES } from "@/src/lib/types"

interface CreatePackageFormProps {
    packageId?: string
}

export default function CreatePackageForm({ packageId }: CreatePackageFormProps) {
    const router = useRouter()
    const { currentUser, addPackage, packages, updatePackage } = useStore()

    const editingPackage = packageId ? packages.find((p) => p.id === packageId) : null

    const [formData, setFormData] = useState({
        title: editingPackage?.title || "",
        description: editingPackage?.description || "",
        category: editingPackage?.category || "",
        price: editingPackage?.price || 0,
        audioGuides: editingPackage?.content.audioGuides || [{ title: "", url: "" }],
        worksheets: editingPackage?.content.worksheets || [""],
        schedule: editingPackage?.content.schedule || "",
        preview: editingPackage?.preview || "",
    })

    const [audioUrls, setAudioUrls] = useState<(string | null)[]>(
        editingPackage?.content.audioGuides?.map((a) => a.url || null) || [null]
    )
    const [playingIndex, setPlayingIndex] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // We removed the cleanup revocation because it was breaking blob URLs 
        // when navigating between the form and the preview page.
    }, [audioUrls]);

    const handleAudioFileChange = (index: number, file: File | null) => {
        const newAudioUrls = [...audioUrls];

        // Revoke old URL if it exists
        if (newAudioUrls[index] && newAudioUrls[index]?.startsWith('blob:')) {
            URL.revokeObjectURL(newAudioUrls[index]!);
        }

        if (file) {
            const url = URL.createObjectURL(file);
            newAudioUrls[index] = url;

            const newAudios = [...formData.audioGuides]
            newAudios[index] = { ...newAudios[index], url: url }
            setFormData({ ...formData, audioGuides: newAudios })
        } else {
            newAudioUrls[index] = null;
            const newAudios = [...formData.audioGuides]
            newAudios[index] = { ...newAudios[index], url: "" }
            setFormData({ ...formData, audioGuides: newAudios })
        }

        setAudioUrls(newAudioUrls);
    }

    const togglePlay = (index: number) => {
        const audio = document.getElementById(`audio-${index}`) as HTMLAudioElement
        if (!audio) return

        if (playingIndex === index) {
            audio.pause()
            setPlayingIndex(null)
        } else {
            // Stop other playing audio
            if (playingIndex !== null) {
                const prevAudio = document.getElementById(`audio-${playingIndex}`) as HTMLAudioElement
                if (prevAudio) prevAudio.pause()
            }
            audio.play()
            setPlayingIndex(index)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!currentUser) return

        setIsLoading(true)

        try {
            const packageData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                price: formData.price,
                content: {
                    audioGuides: formData.audioGuides.filter((a) => a.title.trim()),
                    worksheets: formData.worksheets.filter((w) => w.trim()),
                    schedule: formData.schedule,
                    tracker: "Progress monitoring tools",
                },
                preview: formData.preview,
            }

            if (editingPackage) {
                updatePackage(editingPackage.id, packageData)
            } else {
                const newPackage = {
                    ...packageData,
                    id: `pkg-${Date.now()}`,
                    expertId: currentUser.id,
                    rating: 0,
                    reviews: 0,
                    createdAt: new Date(),
                    views: 0,
                    sales: 0,
                }
                addPackage(newPackage)
            }
            router.push("/expert/dashboard")
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => router.push("/expert/dashboard")} className="rounded-lg">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">{editingPackage ? "Edit Package" : "Create New Package"}</h1>
                        <p className="text-muted-foreground mt-1">Design a stress-relief solution to help others</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info Card */}
                    <Card className="border-primary/20 shadow-sm transition-all hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="w-5 h-5 text-primary" />
                                Basic Information
                            </CardTitle>
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
                    <Card className="border-secondary/20 shadow-sm transition-all hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Music className="w-5 h-5 text-secondary" />
                                Package Content
                            </CardTitle>
                            <CardDescription>Add audio guides and worksheets</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Audio Guides */}
                            <div className="space-y-4">
                                <Label className="font-semibold text-lg">Audio Guides</Label>
                                {formData.audioGuides.map((audio, index) => (
                                    <div key={index} className="space-y-2 p-4 border border-secondary/10 rounded-lg bg-secondary/5">
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Audio Title (e.g., Deep Breathing Exercise)"
                                                value={audio.title}
                                                onChange={(e) => {
                                                    const newAudios = [...formData.audioGuides]
                                                    newAudios[index] = { ...newAudios[index], title: e.target.value }
                                                    setFormData({ ...formData, audioGuides: newAudios })
                                                }}
                                                className="border-secondary/20 focus:border-secondary flex-1"
                                            />
                                            {formData.audioGuides.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        const newAudios = formData.audioGuides.filter((_: { title: string }, i: number) => i !== index)
                                                        const newUrls = audioUrls.filter((_: string | null, i: number) => i !== index)
                                                        setFormData({ ...formData, audioGuides: newAudios })
                                                        setAudioUrls(newUrls)
                                                    }}
                                                    className="text-destructive hover:bg-destructive/10"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <Input
                                                type="file"
                                                accept="audio/*"
                                                onChange={(e) => handleAudioFileChange(index, e.target.files?.[0] || null)}
                                                className="border-secondary/20 focus:border-secondary flex-1 text-xs"
                                            />
                                            {audioUrls[index] && (
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => togglePlay(index)}
                                                        className="h-8 w-8 rounded-full border-secondary/30 text-secondary"
                                                    >
                                                        {playingIndex === index ? (
                                                            <Pause className="w-4 h-4" />
                                                        ) : (
                                                            <Play className="w-4 h-4 ml-0.5" />
                                                        )}
                                                    </Button>
                                                    <audio
                                                        id={`audio-${index}`}
                                                        src={audioUrls[index] || ""}
                                                        onEnded={() => setPlayingIndex(null)}
                                                        className="hidden"
                                                    />
                                                    <span className="text-xs text-muted-foreground font-medium">Preview</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setFormData({ ...formData, audioGuides: [...formData.audioGuides, { title: "", url: "" }] })
                                        setAudioUrls([...audioUrls, null])
                                    }}
                                    className="border-secondary/20 hover:bg-secondary/5 text-secondary"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Audio Guide
                                </Button>
                            </div>

                            <hr className="border-border/50" />

                            {/* Worksheets */}
                            <div className="space-y-3">
                                <Label className="font-semibold text-lg">Worksheets</Label>
                                {formData.worksheets.map((worksheet, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            placeholder="e.g., Daily Stress Tracker (PDF link or title)"
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
                    <Card className="border-primary/20 shadow-sm transition-all hover:shadow-md">
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
                                <Label htmlFor="preview">Preview Description</Label>
                                <Input
                                    id="preview"
                                    placeholder="e.g., First 5 days of content included"
                                    value={formData.preview}
                                    onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
                                    required
                                    className="border-primary/20 focus:border-primary"
                                />
                                <p className="text-[10px] text-muted-foreground mt-1 px-1 italic">
                                    Describe what users see before buying (e.g., introduction audio, first worksheet)
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-end pt-4">
                        <Button type="button" variant="outline" onClick={() => router.push("/expert/dashboard")} className="px-8 h-12">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !formData.title || !formData.category}
                            className="px-10 h-12 bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/20"
                        >
                            {isLoading ? (editingPackage ? "Saving..." : "Creating...") : (editingPackage ? "Save Changes" : "Create Package")}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
