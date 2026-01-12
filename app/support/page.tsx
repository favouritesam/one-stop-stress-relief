"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle, HelpCircle, Mail, Search } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/src/components/layout/navbar";

export default function SupportPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("general")

    const faqs = [
        {
            category: "general",
            question: "What is StressRelief?",
            answer:
                "StressRelief is a marketplace connecting stress management experts with people seeking personalized stress relief solutions. Experts create and sell packages, while clients find solutions tailored to their needs.",
        },
        {
            category: "general",
            question: "How do I create an account?",
            answer:
                "Click 'Sign Up' on the homepage and choose whether you want to be an expert or a stress relief seeker. Fill in your details and you'll be ready to go!",
        },
        {
            category: "payment",
            question: "What payment methods do you accept?",
            answer:
                "We accept all major credit cards, debit cards, and digital wallets. All transactions are securely processed with encryption.",
        },
        {
            category: "payment",
            question: "Is there a money-back guarantee?",
            answer:
                "Yes! We offer a 30-day money-back guarantee on all packages. If you're not satisfied, contact our support team.",
        },
        {
            category: "experts",
            question: "How do experts earn money?",
            answer:
                "Experts earn 80% of each package sale. Verified experts with high ratings can earn up to 90%. Payouts are processed weekly to your registered bank account.",
        },
        {
            category: "experts",
            question: "How do I get verified as an expert?",
            answer:
                "Submit your credentials or relevant experience in stress management. Our team will review and verify your profile within 3-5 business days.",
        },
        {
            category: "technical",
            question: "What browsers are supported?",
            answer:
                "StressRelief works on all modern browsers including Chrome, Firefox, Safari, and Edge. We're fully responsive on mobile and desktop.",
        },
        {
            category: "technical",
            question: "How is my data protected?",
            answer:
                "We use end-to-end encryption and follow GDPR compliance. Your personal and payment data is stored securely and never shared with third parties.",
        },
    ]

    const filteredFaqs = faqs.filter(
        (faq) =>
            (selectedCategory === "all" || faq.category === selectedCategory) &&
            (searchQuery === "" ||
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Get answers to your questions and connect with our support team
                        </p>
                    </div>

                    {/* Support Options */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            {
                                icon: HelpCircle,
                                title: "FAQ",
                                description: "Browse frequently asked questions",
                                color: "bg-primary/10 text-primary",
                            },
                            {
                                icon: Mail,
                                title: "Email Support",
                                description: "support@stressrelief.com",
                                color: "bg-secondary/10 text-secondary",
                            },
                            {
                                icon: MessageCircle,
                                title: "Live Chat",
                                description: "24/7 support available",
                                color: "bg-primary/10 text-primary",
                            },
                        ].map((option, idx) => {
                            const Icon = option.icon
                            return (
                                <Card
                                    key={idx}
                                    className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all text-center cursor-pointer"
                                >
                                    <CardHeader>
                                        <div
                                            className={`w-12 h-12 rounded-lg ${option.color} flex items-center justify-center mx-auto mb-4`}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <CardTitle>{option.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">{option.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    {/* FAQ Section */}
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-2xl mb-4">Frequently Asked Questions</CardTitle>

                            {/* Search */}
                            <div className="relative mb-6">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search questions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 border-primary/20 focus:border-primary bg-background"
                                />
                            </div>

                            {/* Category Tabs */}
                            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                                <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
                                    <TabsTrigger
                                        value="all"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                                    >
                                        All
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="general"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                                    >
                                        General
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="payment"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                                    >
                                        Payment
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="experts"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                                    >
                                        For Experts
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="technical"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                                    >
                                        Technical
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value={selectedCategory} className="mt-6">
                                    <div className="space-y-4">
                                        {filteredFaqs.length === 0 ? (
                                            <div className="text-center py-8">
                                                <p className="text-muted-foreground">No FAQs found matching your search</p>
                                            </div>
                                        ) : (
                                            filteredFaqs.map((faq, idx) => (
                                                <div
                                                    key={idx}
                                                    className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
                                                >
                                                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                                                    <p className="text-muted-foreground">{faq.answer}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardHeader>
                    </Card>

                    {/* Contact Form */}
                    <Card className="border-secondary/20 mt-8">
                        <CardHeader>
                            <CardTitle>Still need help?</CardTitle>
                            <CardDescription>Contact our support team directly</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Your name" className="border-secondary/20 focus:border-secondary" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            className="border-secondary/20 focus:border-secondary"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="What is this regarding?"
                                        className="border-secondary/20 focus:border-secondary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us how we can help..."
                                        rows={5}
                                        className="border-secondary/20 focus:border-secondary resize-none"
                                    />
                                </div>

                                <Button className="w-full bg-gradient-to-r from-secondary to-red-600 hover:from-secondary/90 hover:to-red-700 text-white h-11">
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
