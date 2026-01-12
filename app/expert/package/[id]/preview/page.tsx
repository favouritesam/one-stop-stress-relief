"use client"

import { useStore } from "@/src/lib/store"
import { useRouter } from "next/navigation"
import { useEffect, use, useState } from "react"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/src/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, FileText, Calendar, CheckCircle2, Star, Music, Pause } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function PackagePreviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const { currentUser, packages, isHydrated } = useStore()
    const router = useRouter()
    const [playingIndex, setPlayingIndex] = useState<number | null>(null)

    const pkg = packages.find((p) => p.id === id)

    useEffect(() => {
        if (isHydrated && (!currentUser || currentUser.userType !== "expert")) {
            router.push("/")
        }
    }, [currentUser, isHydrated, router])

    if (!isHydrated || !currentUser || !pkg) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">Loading preview...</p>
            </div>
        )
    }

    const togglePlay = (index: number) => {
        const guide = pkg.content.audioGuides?.[index]
        if (!guide) return

        if (guide.url) {
            const audio = document.getElementById(`preview-audio-${index}`) as HTMLAudioElement
            if (!audio) return

            if (playingIndex === index) {
                audio.pause()
                setPlayingIndex(null)
            } else {
                if (playingIndex !== null) {
                    const prevAudio = document.getElementById(`preview-audio-${playingIndex}`) as HTMLAudioElement
                    if (prevAudio) prevAudio.pause()
                    window.speechSynthesis.cancel()
                }

                // Try playing the file
                audio.play().catch((err) => {
                    console.warn("Audio playback failed, falling back to speech synthesis", err)
                    // Fallback to speech synthesis if audio file fails (e.g. revoked blob)
                    startSpeechSynthesis(guide.title, index)
                })
                setPlayingIndex(index)
            }
        } else {
            if (playingIndex === index) {
                window.speechSynthesis.cancel()
                setPlayingIndex(null)
            } else {
                startSpeechSynthesis(guide.title, index)
            }
        }
    }

    const startSpeechSynthesis = (title: string, index: number) => {
        window.speechSynthesis.cancel()
        if (playingIndex !== null) {
            const prevAudio = document.getElementById(`preview-audio-${playingIndex}`) as HTMLAudioElement
            if (prevAudio) prevAudio.pause()
        }
        const utterance = new SpeechSynthesisUtterance(`This is a preview of your guide: ${title}. Please relax and follow along as we guide you through this stress relief exercise.`)
        utterance.onend = () => setPlayingIndex(null)
        window.speechSynthesis.speak(utterance)
        setPlayingIndex(index)
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Back Button & Preview Badge */}
                    <div className="flex items-center justify-between mb-8">
                        <Button variant="ghost" onClick={() => router.push("/expert/dashboard")} className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Button>
                        <Badge variant="secondary" className="px-4 py-1.5 text-sm bg-primary/10 text-primary border-primary/20">
                            Expert Preview Mode
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20">
                                        {pkg.category}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium text-foreground">{pkg.rating.toFixed(1)}</span>
                                        <span>({pkg.reviews} reviews)</span>
                                    </div>
                                </div>
                                <h1 className="text-4xl font-bold mb-4">{pkg.title}</h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {pkg.description}
                                </p>
                            </div>

                            {/* Package Features */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <Card className="bg-background/50 border-border/50">
                                    <CardContent className="pt-6 text-center">
                                        <Music className="w-6 h-6 mx-auto mb-2 text-primary" />
                                        <p className="text-sm font-semibold">{pkg.content.audioGuides?.length || 0} Audios</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-background/50 border-border/50">
                                    <CardContent className="pt-6 text-center">
                                        <FileText className="w-6 h-6 mx-auto mb-2 text-secondary" />
                                        <p className="text-sm font-semibold">{pkg.content.worksheets?.length || 0} Worksheets</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-background/50 border-border/50">
                                    <CardContent className="pt-6 text-center">
                                        <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                                        <p className="text-sm font-semibold">Custom Plan</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-background/50 border-border/50">
                                    <CardContent className="pt-6 text-center">
                                        <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-secondary" />
                                        <p className="text-sm font-semibold">Traking</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Audio Samples */}
                            <section>
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Music className="w-6 h-6 text-primary" />
                                    Audio Guides (Preview)
                                </h3>
                                <div className="space-y-3">
                                    {pkg.content.audioGuides?.map((guide, index) => (
                                        <Card key={index} className="hover:border-primary/30 transition-colors">
                                            <CardContent className="flex items-center justify-between p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <Play className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{guide.title}</p>
                                                        <p className="text-xs text-muted-foreground">Sample Preview Available</p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-primary/20 hover:bg-primary/5"
                                                    onClick={() => togglePlay(index)}
                                                >
                                                    {playingIndex === index ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                                    <span className="ml-2">Listen</span>
                                                </Button>
                                                <audio id={`preview-audio-${index}`} src={guide.url || undefined} onEnded={() => setPlayingIndex(null)} className="hidden" />
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>

                            {/* Worksheets */}
                            <section>
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-secondary" />
                                    Worksheets & Resources
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {pkg.content.worksheets?.map((sheet, index) => (
                                        <div key={index} className="flex items-center gap-3 p-4 border border-border/50 rounded-xl bg-background/50">
                                            <div className="p-2 rounded-lg bg-secondary/10">
                                                <FileText className="w-5 h-5 text-secondary" />
                                            </div>
                                            <span className="text-sm font-medium">{sheet}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar / Buy Card */}
                        <div className="space-y-6">
                            <Card className="border-primary/30 shadow-xl sticky top-24">
                                <CardHeader>
                                    <div className="text-3xl font-bold text-primary mb-2">${pkg.price}</div>
                                    <CardTitle>Immediate Access</CardTitle>
                                    <CardDescription>Start your stress relief journey today</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg" disabled>
                                        Buy This Package
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground">
                                        This is a preview. Purchasing is disabled for experts.
                                    </p>

                                    <div className="pt-4 space-y-3">
                                        <div className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                            <span>Lifetime access to all content</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                            <span>{pkg.content.schedule}</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                            <span>30-day money back guarantee</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">About the Expert</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                                            {currentUser.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold">{currentUser.name}</p>
                                            <p className="text-xs text-muted-foreground">Certified Stress Manager</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Expert in behavioral psychology and stress management with over 10 years of experience
                                        helping professionals regain balance.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
