"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, FileText, Calendar, BarChart3, Plus, X } from "lucide-react"

interface TemplateItem {
    id: string
    name: string
    type: "audio" | "worksheet" | "schedule" | "tracker"
    description: string
    content: string
    preview?: string
}

interface TemplateBuilderProps {
    onSave: (templates: TemplateItem[]) => void
}

const TEMPLATE_TYPES = [
    { id: "audio", label: "Guided Audio", icon: Music, description: "Meditation, breathing, or guided exercises" },
    {
        id: "worksheet",
        label: "PDF Worksheet",
        icon: FileText,
        description: "Interactive worksheets and exercises",
    },
    { id: "schedule", label: "Daily Schedule", icon: Calendar, description: "Personalized daily or weekly plan" },
    {
        id: "tracker",
        label: "Progress Tracker",
        icon: BarChart3,
        description: "Monitor progress and results",
    },
]

export default function TemplateBuilder({ onSave }: TemplateBuilderProps) {
    const [templates, setTemplates] = useState<TemplateItem[]>([])
    const [selectedType, setSelectedType] = useState<"audio" | "worksheet" | "schedule" | "tracker" | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        content: "",
        preview: "",
    })

    const handleAddTemplate = () => {
        if (!selectedType || !formData.name || !formData.content) {
            return
        }

        const newTemplate: TemplateItem = {
            id: `template-${Date.now()}`,
            name: formData.name,
            type: selectedType,
            description: formData.description,
            content: formData.content,
            preview: formData.preview,
        }

        setTemplates([...templates, newTemplate])
        setFormData({ name: "", description: "", content: "", preview: "" })
        setSelectedType(null)
    }

    const handleRemoveTemplate = (id: string) => {
        setTemplates(templates.filter((t) => t.id !== id))
    }

    const handleSave = () => {
        onSave(templates)
    }

    return (
        <div className="space-y-6">
            <Card className="border-border/50">
                <CardHeader>
                    <CardTitle>Add Template Content</CardTitle>
                    <CardDescription>Create multimedia content for your packages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Template Type Selection */}
                    <div>
                        <h3 className="font-medium mb-3">Content Type</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {TEMPLATE_TYPES.map((type) => {
                                const Icon = type.icon
                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => setSelectedType(type.id as any)}
                                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                                            selectedType === type.id
                                                ? "border-primary bg-primary/10"
                                                : "border-border hover:border-primary/50"
                                        }`}
                                    >
                                        <Icon className="w-6 h-6 mb-2 text-primary" />
                                        <div className="font-medium">{type.label}</div>
                                        <div className="text-xs text-muted-foreground mt-1">{type.description}</div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Template Form */}
                    {selectedType && (
                        <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border/50">
                            <div>
                                <label className="text-sm font-medium">Template Name</label>
                                <Input
                                    placeholder="e.g., 10-minute Morning Meditation"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Description</label>
                                <Input
                                    placeholder="Describe what this template contains"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Content</label>
                                <Textarea
                                    placeholder="Paste your content here (audio transcript, worksheet details, schedule, or tracker info)"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={5}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Preview (Optional)</label>
                                <Textarea
                                    placeholder="Short preview text that users see before purchasing"
                                    value={formData.preview}
                                    onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
                                    rows={2}
                                    className="mt-1"
                                />
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    onClick={handleAddTemplate}
                                    disabled={!formData.name || !formData.content}
                                    className="flex-1 bg-primary hover:bg-primary/90"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add to Package
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSelectedType(null)
                                        setFormData({ name: "", description: "", content: "", preview: "" })
                                    }}
                                    variant="outline"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Templates List */}
            {templates.length > 0 && (
                <Card className="border-border/50">
                    <CardHeader>
                        <CardTitle>Package Templates ({templates.length})</CardTitle>
                        <CardDescription>Review and manage your package content</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="grid w-full grid-cols-5">
                                <TabsTrigger value="all">All ({templates.length})</TabsTrigger>
                                <TabsTrigger value="audio">Audio ({templates.filter((t) => t.type === "audio").length})</TabsTrigger>
                                <TabsTrigger value="worksheet">
                                    Sheets ({templates.filter((t) => t.type === "worksheet").length})
                                </TabsTrigger>
                                <TabsTrigger value="schedule">
                                    Plans ({templates.filter((t) => t.type === "schedule").length})
                                </TabsTrigger>
                                <TabsTrigger value="tracker">
                                    Trackers ({templates.filter((t) => t.type === "tracker").length})
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="all" className="space-y-3 mt-4">
                                {templates.map((template) => (
                                    <TemplateCard
                                        key={template.id}
                                        template={template}
                                        onRemove={() => handleRemoveTemplate(template.id)}
                                    />
                                ))}
                            </TabsContent>

                            {["audio", "worksheet", "schedule", "tracker"].map((type) => (
                                <TabsContent key={type} value={type} className="space-y-3 mt-4">
                                    {templates
                                        .filter((t) => t.type === type)
                                        .map((template) => (
                                            <TemplateCard
                                                key={template.id}
                                                template={template}
                                                onRemove={() => handleRemoveTemplate(template.id)}
                                            />
                                        ))}
                                </TabsContent>
                            ))}
                        </Tabs>

                        <Button onClick={handleSave} className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-white">
                            Save Templates to Package
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

function TemplateCard({
                          template,
                          onRemove,
                      }: {
    template: TemplateItem
    onRemove: () => void
}) {
    const icons: Record<string, any> = {
        audio: Music,
        worksheet: FileText,
        schedule: Calendar,
        tracker: BarChart3,
    }

    const Icon = icons[template.type]

    return (
        <Card className="border-border/50">
            <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium">{template.name}</h4>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                            {template.preview && (
                                <p className="text-xs text-muted-foreground italic mt-1">Preview: {template.preview}</p>
                            )}
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onRemove}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/30">
                    {template.type.replace("_", " ")}
                </Badge>
            </CardContent>
        </Card>
    )
}
