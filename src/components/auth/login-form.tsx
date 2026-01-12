"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/src/lib/store";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Mail, Lock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const { setCurrentUser, users, setAuthenticated } = useStore()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            // Simulate authentication
            const user = users.find((u) => u.email === email)

            if (!user) {
                setError("Invalid email or password")
                setIsLoading(false)
                return
            }

            // Set current user and authenticated state
            setCurrentUser(user)
            setAuthenticated(true)

            // Redirect based on user type
            if (user.userType === "expert") {
                router.push("/expert/dashboard")
            } else if (user.userType === "client") {
                router.push("/client/marketplace")
            } else {
                router.push("/admin/dashboard")
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-2 border-primary/20 shadow-2xl">
                <CardHeader className="space-y-2 pb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <span className="text-white font-bold text-lg">SR</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            StressRelief
                        </span>
                    </div>
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>Sign in to your account to continue</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <Alert variant="destructive" className="bg-red-50 border-red-200">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-10 border-primary/20 focus:border-primary focus:ring-primary/20"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 h-10 border-primary/20 focus:border-primary focus:ring-primary/20"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading || !email || !password}
                            className="w-full h-10 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium transition-all duration-200"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-background text-muted-foreground">Or continue as</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="border-primary/20 hover:bg-primary/5 h-10 bg-transparent"
                                onClick={() => {
                                    const expertUser = users.find((u) => u.userType === "expert")
                                    if (expertUser) {
                                        setCurrentUser(expertUser)
                                        setAuthenticated(true)
                                        router.push("/expert/dashboard")
                                    }
                                }}
                            >
                                Expert
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="border-secondary/20 hover:bg-secondary/5 h-10 bg-transparent"
                                onClick={() => {
                                    const clientUser = users.find((u) => u.userType === "client")
                                    if (clientUser) {
                                        // Use stable ID for demo client to ensure persistence works
                                        const demoClient = {
                                            ...clientUser,
                                            id: "client-1",
                                        }
                                        setCurrentUser(demoClient)
                                        setAuthenticated(true)
                                        router.push("/client/marketplace")
                                    }
                                }}
                            >
                                Client
                            </Button>
                        </div>
                    </form>

                    <p className="text-xs text-muted-foreground text-center mt-6">
                        Demo credentials: Use any email from sidebar experts
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
