"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {useStore} from "@/src/lib/store";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Brain } from "lucide-react"
import Navbar from "@/src/components/layout/navbar";

const STRESS_TYPES = [
    { id: "work", label: "Work Stress", icon: "💼" },
    { id: "relationships", label: "Relationship Issues", icon: "💑" },
    { id: "health", label: "Health Anxiety", icon: "🏥" },
    { id: "financial", label: "Financial Stress", icon: "💰" },
    { id: "family", label: "Family Challenges", icon: "👨‍👩‍👧‍👦" },
    { id: "social", label: "Social Anxiety", icon: "👥" },
]

const LIFESTYLE_OPTIONS = [
    { id: "sedentary", label: "Mostly sedentary" },
    { id: "light", label: "Light activity" },
    { id: "moderate", label: "Moderate activity" },
    { id: "active", label: "Very active" },
]

const TRIGGERS = [
    "Tight deadlines",
    "Conflict with others",
    "Financial concerns",
    "Health worries",
    "Sleep issues",
    "Overwhelm",
    "Lack of control",
    "Social pressure",
]

export default function StressAssessmentQuiz() {
    const router = useRouter()
    const { currentUser, addAssessment, setMatchedPackages } = useStore()
    const [step, setStep] = useState(0)
    const [selectedStressType, setSelectedStressType] = useState("")
    const [severity, setSeverity] = useState(5)
    const [budget, setBudget] = useState(25)
    const [lifestyle, setLifestyle] = useState("")
    const [selectedTriggers, setSelectedTriggers] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    if (!currentUser) {
        return null
    }

    const handleTriggerChange = (trigger: string, checked: boolean) => {
        if (checked) {
            setSelectedTriggers([...selectedTriggers, trigger])
        } else {
            setSelectedTriggers(selectedTriggers.filter((t) => t !== trigger))
        }
    }

    const handleSubmit = async () => {
        if (!selectedStressType || !lifestyle || selectedTriggers.length === 0) {
            return
        }

        setIsLoading(true)

        const assessment = {
            id: `assessment-${Date.now()}`,
            userId: currentUser.id,
            stressType: selectedStressType,
            severity,
            budget,
            lifestyle,
            triggers: selectedTriggers,
            createdAt: new Date(),
        }

        addAssessment(assessment)

        // Get matched packages using AI matching algorithm
        const { getAIMatchedPackages } = await import("@/src/lib/ai-matching")
        const matched = getAIMatchedPackages(currentUser.id, assessment)
        setMatchedPackages(currentUser.id, matched)

        setIsLoading(false)
        router.push("/client/ai-recommendations")
    }

    const steps = [
        {
            title: "What's causing you stress?",
            description: "Select your primary stress type",
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {STRESS_TYPES.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedStressType(type.id)}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                    selectedStressType === type.id
                                        ? "border-primary bg-primary/10"
                                        : "border-border hover:border-primary/50"
                                }`}
                            >
                                <div className="text-2xl mb-2">{type.icon}</div>
                                <div className="font-medium text-sm">{type.label}</div>
                            </button>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: "How severe is your stress?",
            description: "Rate your stress level from 1-10",
            content: (
                <div className="space-y-6 py-8">
                    <div>
                        <div className="flex justify-between mb-4">
                            <span className="text-sm font-medium">Stress Level</span>
                            <span className="text-2xl font-bold text-primary">{severity}</span>
                        </div>
                        <Slider
                            value={[severity]}
                            onValueChange={(value) => setSeverity(value[0])}
                            min={1}
                            max={10}
                            step={1}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-4">
                            <span>Mild</span>
                            <span>Severe</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "What's your budget?",
            description: "How much are you willing to spend? (per package)",
            content: (
                <div className="space-y-6 py-8">
                    <div>
                        <div className="flex justify-between mb-4">
                            <span className="text-sm font-medium">Budget</span>
                            <span className="text-2xl font-bold text-primary">${budget}</span>
                        </div>
                        <Slider
                            value={[budget]}
                            onValueChange={(value) => setBudget(value[0])}
                            min={5}
                            max={100}
                            step={5}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-4">
                            <span>$5</span>
                            <span>$100+</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "What's your lifestyle?",
            description: "This helps us recommend suitable packages",
            content: (
                <div className="space-y-3">
                    <RadioGroup value={lifestyle} onValueChange={setLifestyle}>
                        {LIFESTYLE_OPTIONS.map((option) => (
                            <div
                                key={option.id}
                                className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/50"
                            >
                                <RadioGroupItem value={option.id} id={option.id} />
                                <Label htmlFor={option.id} className="cursor-pointer flex-1 font-medium">
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            ),
        },
        {
            title: "What are your stress triggers?",
            description: "Select all that apply",
            content: (
                <div className="space-y-3">
                    {TRIGGERS.map((trigger) => (
                        <div
                            key={trigger}
                            className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/50"
                        >
                            <Checkbox
                                id={trigger}
                                checked={selectedTriggers.includes(trigger)}
                                onCheckedChange={(checked) => handleTriggerChange(trigger, checked as boolean)}
                            />
                            <Label htmlFor={trigger} className="cursor-pointer flex-1 font-medium">
                                {trigger}
                            </Label>
                        </div>
                    ))}
                </div>
            ),
        },
    ]

    const currentStep = steps[step]
    const isLastStep = step === steps.length - 1
    const isStepComplete = () => {
        switch (step) {
            case 0:
                return selectedStressType !== ""
            case 1:
                return true
            case 2:
                return true
            case 3:
                return lifestyle !== ""
            case 4:
                return selectedTriggers.length > 0
            default:
                return false
        }
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
                <div className="max-w-2xl mx-auto px-4">
                    <Card className="border-border/50">
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-lg bg-primary/10">
                                    <Brain className="w-8 h-8 text-primary" />
                                </div>
                            </div>
                            <CardTitle className="text-3xl">{currentStep.title}</CardTitle>
                            <CardDescription className="text-base mt-2">{currentStep.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {currentStep.content}

                            {/* Progress bar */}
                            <div className="pt-4">
                                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>
                    Step {step + 1} of {steps.length}
                  </span>
                                    <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-border rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                                        style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="flex gap-4 pt-4">
                                {step > 0 && (
                                    <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                                        Back
                                    </Button>
                                )}
                                {isLastStep ? (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={!isStepComplete() || isLoading}
                                        className="flex-1 bg-gradient-to-r from-primary to-secondary text-white"
                                    >
                                        {isLoading ? "Analyzing..." : "Get AI Recommendations"}
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setStep(step + 1)}
                                        disabled={!isStepComplete()}
                                        className="flex-1 bg-gradient-to-r from-primary to-secondary text-white"
                                    >
                                        Next
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
