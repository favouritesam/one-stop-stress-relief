// "use client"
//
// import {useStore} from "@/src/lib/store";
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { ArrowRight, Zap, Users, TrendingUp, Shield, Smartphone, Gift } from "lucide-react"
// import { useState } from "react"
// import { useEffect } from "react"
// import SignupForm from "@/src/components/auth/signup-form";
// import Navbar from "@/src/components/layout/navbar";
// import LoginForm from "@/src/components/auth/login-form";
//
// export default function HomePage() {
//     const { isAuthenticated, currentUser } = useStore()
//     const router = useRouter()
//     const [showLogin, setShowLogin] = useState(true)
//
//     useEffect(() => {
//         if (isAuthenticated && currentUser) {
//             if (currentUser.userType === "expert") {
//                 router.push("/expert/dashboard")
//             } else if (currentUser.userType === "client") {
//                 router.push("/client/marketplace")
//             }
//         }
//     }, [isAuthenticated, currentUser, router])
//
//     if (isAuthenticated) {
//         return null
//     }
//
//     if (!showLogin) {
//         return <SignupForm />
//     }
//
//     return (
//         <>
//             <Navbar />
//             <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
//                 {/* Hero Section */}
//                 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
//                     <div className="max-w-3xl">
//                         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
//                             Stress Relief
//                             <br />
//                             <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//                 Solutions Marketplace
//               </span>
//                         </h1>
//                         <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
//                             Connect with expert-created stress relief packages tailored to your needs. Experts earn by sharing their
//                             solutions. Clients find the perfect package at their budget.
//                         </p>
//
//                         <div className="flex flex-col sm:flex-row gap-4">
//                             <Button
//                                 onClick={() => setShowLogin(true)}
//                                 size="lg"
//                                 className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium h-12 px-8"
//                             >
//                                 Get Started <ArrowRight className="ml-2 w-4 h-4" />
//                             </Button>
//                             <Button
//                                 variant="outline"
//                                 size="lg"
//                                 className="border-primary/20 hover:bg-primary/5 h-12 px-8 bg-transparent"
//                             >
//                                 Learn More
//                             </Button>
//                         </div>
//                     </div>
//                 </section>
//
//                 {/* Features Section */}
//                 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//                     <div className="text-center mb-12">
//                         <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose StressRelief?</h2>
//                         <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//                             A platform designed for both seekers and solution providers
//                         </p>
//                     </div>
//
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {[
//                             {
//                                 icon: Zap,
//                                 title: "Expert-Created Solutions",
//                                 description: "Browse packages from verified stress management experts with proven track records.",
//                                 color: "text-primary",
//                             },
//                             {
//                                 icon: TrendingUp,
//                                 title: "Earn by Sharing",
//                                 description: "Experts earn 80% of each sale. Build passive income by creating quality packages.",
//                                 color: "text-secondary",
//                             },
//                             {
//                                 icon: Users,
//                                 title: "Community Driven",
//                                 description: "Join a community of professionals and seekers dedicated to stress relief.",
//                                 color: "text-primary",
//                             },
//                             {
//                                 icon: Shield,
//                                 title: "Secure & Private",
//                                 description: "All transactions are encrypted. Your data and privacy are our top priority.",
//                                 color: "text-secondary",
//                             },
//                             {
//                                 icon: Smartphone,
//                                 title: "Mobile Friendly",
//                                 description: "Access packages anytime, anywhere. Fully responsive design for all devices.",
//                                 color: "text-primary",
//                             },
//                             {
//                                 icon: Gift,
//                                 title: "Lifetime Access",
//                                 description: "Once purchased, you have lifetime access to all package content and updates.",
//                                 color: "text-secondary",
//                             },
//                         ].map((feature, index) => {
//                             const Icon = feature.icon
//                             return (
//                                 <Card key={index} className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all">
//                                     <CardHeader>
//                                         <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4`}>
//                                             <Icon className={`w-6 h-6 ${feature.color}`} />
//                                         </div>
//                                         <CardTitle>{feature.title}</CardTitle>
//                                     </CardHeader>
//                                     <CardContent>
//                                         <CardDescription className="text-base">{feature.description}</CardDescription>
//                                     </CardContent>
//                                 </Card>
//                             )
//                         })}
//                     </div>
//                 </section>
//
//                 {/* CTA Section */}
//                 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-24">
//                     <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
//                         <CardHeader className="text-center">
//                             <CardTitle className="text-3xl sm:text-4xl">Ready to Get Started?</CardTitle>
//                             <CardDescription className="text-lg mt-4">
//                                 Join thousands of stress relief seekers and expert solution providers
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
//                             <Button
//                                 onClick={() => setShowLogin(true)}
//                                 size="lg"
//                                 className="bg-gradient-to-r from-primary to-secondary text-white font-medium h-12 px-8"
//                             >
//                                 Sign In Now
//                             </Button>
//                             <Button
//                                 onClick={() => setShowLogin(false)}
//                                 variant="outline"
//                                 size="lg"
//                                 className="border-primary/20 hover:bg-primary/5 h-12 px-8 bg-transparent"
//                             >
//                                 Create Account
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 </section>
//
//                 {/*/!* Auth Section *!/*/}
//                 {/*<section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">*/}
//                 {/*    <LoginForm />*/}
//                 {/*</section>*/}
//             </div>
//         </>
//     )
// }


"use client"

import { useStore } from "@/src/lib/store"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Zap, Users, TrendingUp, Shield, Smartphone, Gift, X } from "lucide-react"
import { useState, useEffect } from "react"
import SignupForm from "@/src/components/auth/signup-form";
import LoginForm from "@/src/components/auth/login-form";

export default function HomePage() {
    const { isAuthenticated, currentUser } = useStore()
    const router = useRouter()
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [authMode, setAuthMode] = useState<"login" | "signup">("login")

    useEffect(() => {
        if (isAuthenticated && currentUser) {
            if (currentUser.userType === "expert") {
                router.push("/expert/dashboard")
            } else if (currentUser.userType === "client") {
                router.push("/client/marketplace")
            }
        }
    }, [isAuthenticated, currentUser, router])

    if (isAuthenticated) {
        return null
    }

    const handleGetStarted = () => {
        setAuthMode("signup")
        setShowAuthModal(true)
    }

    const handleSignIn = () => {
        setAuthMode("login")
        setShowAuthModal(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            {/* Header/Navbar */}
            <header className="border-b border-border/40 bg-background/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">SR</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:inline">
              StressRelief
            </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button onClick={handleSignIn} variant="ghost" className="text-foreground hover:bg-primary/10">
                            Sign In
                        </Button>
                        <Button
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90"
                        >
                            Create Account
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
                        Stress Relief
                        <br />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Solutions Marketplace
            </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
                        Connect with expert-created stress relief packages tailored to your needs. Experts earn by sharing their
                        solutions. Clients find the perfect package at their budget.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={handleGetStarted}
                            size="lg"
                            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-medium h-12 px-8 rounded-lg shadow-lg"
                        >
                            Get Started <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() => {
                                document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" })
                            }}
                            variant="outline"
                            size="lg"
                            className="border-primary/30 text-foreground hover:bg-primary/10 h-12 px-8 rounded-lg"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Why Choose StressRelief?</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A platform designed for both seekers and solution providers
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Zap,
                            title: "Expert-Created Solutions",
                            description: "Browse packages from verified stress management experts with proven track records.",
                            color: "text-primary",
                        },
                        {
                            icon: TrendingUp,
                            title: "Earn by Sharing",
                            description: "Experts earn 80% of each sale. Build passive income by creating quality packages.",
                            color: "text-secondary",
                        },
                        {
                            icon: Users,
                            title: "Community Driven",
                            description: "Join a community of professionals and seekers dedicated to stress relief.",
                            color: "text-primary",
                        },
                        {
                            icon: Shield,
                            title: "Secure & Private",
                            description: "All transactions are encrypted. Your data and privacy are our top priority.",
                            color: "text-secondary",
                        },
                        {
                            icon: Smartphone,
                            title: "Mobile Friendly",
                            description: "Access packages anytime, anywhere. Fully responsive design for all devices.",
                            color: "text-primary",
                        },
                        {
                            icon: Gift,
                            title: "Lifetime Access",
                            description: "Once purchased, you have lifetime access to all package content and updates.",
                            color: "text-secondary",
                        },
                    ].map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <Card
                                key={index}
                                className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all bg-card"
                            >
                                <CardHeader>
                                    <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4`}>
                                        <Icon className={`w-6 h-6 ${feature.color}`} />
                                    </div>
                                    <CardTitle className="text-foreground">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base text-muted-foreground">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-24">
                <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl sm:text-4xl text-foreground">Ready to Get Started?</CardTitle>
                        <CardDescription className="text-lg mt-4 text-muted-foreground">
                            Join thousands of stress relief seekers and expert solution providers
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={handleSignIn}
                            size="lg"
                            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium h-12 px-8 rounded-lg shadow-lg"
                        >
                            Sign In Now
                        </Button>
                        <Button
                            onClick={handleGetStarted}
                            variant="outline"
                            size="lg"
                            className="border-primary/30 text-foreground hover:bg-primary/10 h-12 px-8 rounded-lg bg-transparent"
                        >
                            Create Account
                        </Button>
                    </CardContent>
                </Card>
            </section>

            {/* Auth Modal */}
            {showAuthModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
                        <button
                            onClick={() => setShowAuthModal(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg z-10"
                        >
                            <X className="w-5 h-5 text-muted-foreground" />
                        </button>

                        <div className="p-6 sm:p-8">
                            {authMode === "login" ? (
                                <>
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-foreground mb-2">Sign In</h2>
                                        <p className="text-muted-foreground">Enter your credentials to access your account</p>
                                    </div>
                                    <LoginForm />
                                    <div className="mt-4 text-center text-sm text-muted-foreground">
                                        Don't have an account?{" "}
                                        <button onClick={() => setAuthMode("signup")} className="text-primary hover:underline font-medium">
                                            Create one
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-foreground mb-2">Create Account</h2>
                                        <p className="text-muted-foreground">Join StressRelief and find your perfect solution</p>
                                    </div>
                                    <SignupForm />
                                    <div className="mt-4 text-center text-sm text-muted-foreground">
                                        Already have an account?{" "}
                                        <button onClick={() => setAuthMode("login")} className="text-primary hover:underline font-medium">
                                            Sign in
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

