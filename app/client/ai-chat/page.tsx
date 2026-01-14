"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Loader2, Lightbulb, Languages, Mic, MicOff } from "lucide-react"
import { useStore } from "@/src/lib/store";
import DashboardLayout from "@/src/components/layout/dashboard-layout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AIChatPage() {
    const { currentUser, addChatMessage, getUserChatMessages } = useStore()
    const [messages, setMessages] = useState<any[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState("English")
    const [isRecording, setIsRecording] = useState(false)
    const recognitionRef = useRef<any>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (currentUser) {
            const userMessages = getUserChatMessages(currentUser.id)
            setMessages(userMessages)
        }
    }, [currentUser, getUserChatMessages])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const autoSendTriggerRef = useRef(false);
    const sendButtonRef = useRef<HTMLButtonElement>(null);

    // Voice Recording Logic (Web Speech API)
    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                autoSendTriggerRef.current = true;
            };

            recognitionRef.current.onend = () => {
                setIsRecording(false);
                if (autoSendTriggerRef.current) {
                    autoSendTriggerRef.current = false;
                    // Automatically trigger send
                    setTimeout(() => {
                        sendButtonRef.current?.click();
                    }, 100);
                }
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsRecording(false);
            };
        }
    }, []);

    // Update recognition language when selection changes
    useEffect(() => {
        if (recognitionRef.current) {
            const langMap: Record<string, string> = {
                "English": "en-US",
                "Spanish": "es-ES",
                "French": "fr-FR",
                "German": "de-DE",
                "Chinese": "zh-CN"
            };
            recognitionRef.current.lang = langMap[selectedLanguage] || "en-US";
        }
    }, [selectedLanguage]);

    const toggleRecording = () => {
        if (!isRecording) {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.start();
                    setIsRecording(true);
                } catch (err) {
                    console.error("Recognition already started", err);
                }
            } else {
                alert("Voice recognition is not supported in this browser.");
            }
        } else {
            recognitionRef.current?.stop();
            setIsRecording(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || !currentUser || isLoading) return

        // Add user message
        const userMessage = {
            id: `msg-${Date.now()}`,
            userId: currentUser.id,
            role: "user" as const,
            content: input,
            timestamp: new Date(),
        }

        addChatMessage(userMessage)
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            // Call AI chat API with selected language
            const response = await fetch("/api/ai-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: input,
                    userId: currentUser.id,
                    previousMessages: messages,
                    language: selectedLanguage, // Send language choice to the AI
                }),
            })

            const data = await response.json()

            const assistantMessage = {
                id: `msg-${Date.now()}`,
                userId: currentUser.id,
                role: "assistant" as const,
                content: data.response,
                timestamp: new Date(),
            }

            addChatMessage(assistantMessage)
            setMessages((prev) => [...prev, assistantMessage])
        } catch (error) {
            console.error("Error sending message:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const suggestedQuestions = [
        "How can I manage work stress better?",
        "What meditation techniques do you recommend?",
        "How do I choose the right package for me?",
        "What are evidence-based stress relief methods?",
    ]

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Chat Container */}
                    <Card className="border-border/50 flex flex-col h-[600px] overflow-hidden">
                        {/* Header with Language Selector */}
                        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/50 px-6 py-4 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold">Stress Relief AI Assistant</h1>
                                <p className="text-sm text-muted-foreground mt-1">Get personalized guidance on managing your stress</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Languages className="w-4 h-4 text-primary" />
                                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                                    <SelectTrigger className="w-[120px] bg-background border-primary/20 focus:ring-primary/20">
                                        <SelectValue placeholder="Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="English">English</SelectItem>
                                        <SelectItem value="Spanish">Español</SelectItem>
                                        <SelectItem value="French">Français</SelectItem>
                                        <SelectItem value="German">Deutsch</SelectItem>
                                        <SelectItem value="Chinese">中文</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full space-y-6">
                                    <div className="p-4 rounded-full bg-primary/10">
                                        <Lightbulb className="w-8 h-8 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <h2 className="text-xl font-semibold mb-2">Welcome to AI Chat</h2>
                                        <p className="text-muted-foreground max-w-sm">
                                            Ask me anything about stress relief, meditation, coping strategies, or finding the right package
                                            for you.
                                        </p>
                                    </div>

                                    {/* Suggested Questions */}
                                    <div className="w-full space-y-2 mt-6">
                                        <p className="text-sm font-medium text-center">Try asking:</p>
                                        <div className="space-y-2">
                                            {suggestedQuestions.map((question, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setInput(question)}
                                                    className="w-full text-left p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                                                >
                                                    <p className="text-sm text-foreground">{question}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div
                                            className={`max-w-xs px-4 py-3 rounded-lg ${msg.role === "user"
                                                ? "bg-gradient-to-r from-primary to-secondary text-white rounded-br-none"
                                                : "bg-muted text-foreground rounded-bl-none"
                                                }`}
                                        >
                                            <p className="text-sm">{msg.content}</p>
                                            <p className={`text-xs mt-1 ${msg.role === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-muted px-4 py-3 rounded-lg rounded-bl-none">
                                        <div className="flex items-center space-x-2">
                                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                            <span className="text-sm">AI is thinking...</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="border-t border-border/50 p-4 bg-background">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <Input
                                    placeholder="Ask me about stress relief, meditation, packages..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={isLoading}
                                    className="flex-1 rounded-full border-border/50"
                                />
                                <Button
                                    type="button"
                                    onClick={toggleRecording}
                                    variant={isRecording ? "destructive" : "outline"}
                                    size="icon"
                                    className={`rounded-full shrink-0 ${isRecording ? "animate-pulse" : "border-primary/20 text-primary hover:bg-primary/5"}`}
                                >
                                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                </Button>
                                <Button
                                    type="submit"
                                    ref={sendButtonRef}
                                    disabled={!input.trim() || isLoading}
                                    size="icon"
                                    className="rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                            <p className="text-xs text-muted-foreground mt-2">
                                AI responses are for guidance only. Always consult healthcare professionals for medical concerns.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
