"use client"

import type React from "react"

import {useStore} from "@/src/lib/store";
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Lock, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navbar from "@/src/components/layout/navbar";

export default function CheckoutPage() {
    const { packages, users, currentUser, addPurchase, updateUser } = useStore()
    const router = useRouter()
    const params = useParams()
    const [isProcessing, setIsProcessing] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)

    const packageId = params.id as string
    const pkg = packages.find((p) => p.id === packageId)
    const expert = pkg ? users.find((u) => u.id === pkg.expertId) : null

    const [formData, setFormData] = useState({
        cardNumber: "4242 4242 4242 4242",
        expiryDate: "12/26",
        cvv: "123",
        cardholderName: currentUser?.name || "",
    })

    useEffect(() => {
        if (!currentUser || currentUser.userType !== "client") {
            router.push("/")
        }
    }, [currentUser, router])

    if (!pkg || !expert || !currentUser) {
        return null
    }

    const platformFee = pkg.price * 0.2
    const expertEarnings = pkg.price * 0.8
    const total = pkg.price

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate payment processing
        setTimeout(() => {
            const purchase = {
                id: `purchase-${Date.now()}`,
                userId: currentUser.id,
                packageId: pkg.id,
                amount: total,
                status: "completed" as const,
                purchasedAt: new Date(),
            }

            addPurchase(purchase)

            // Update expert earnings
            const newEarnings = (expert.totalEarnings || 0) + expertEarnings
            updateUser(expert.id, { totalEarnings: newEarnings })

            setOrderPlaced(true)
            setIsProcessing(false)
        }, 2000)
    }

    if (orderPlaced) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
                    <Card className="max-w-md w-full border-2 border-green-200 shadow-2xl">
                        <CardHeader className="text-center pb-8">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                <Check className="w-8 h-8 text-green-600" />
                            </div>
                            <CardTitle className="text-2xl">Order Successful!</CardTitle>
                            <CardDescription>Your package has been purchased</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="bg-muted p-4 rounded-lg space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Order ID:</span>
                                    <span className="font-medium">#ORD-{Date.now().toString().slice(-8)}</span>
                                </div>
                                <div className="flex justify-between border-t border-border pt-3">
                                    <span className="text-muted-foreground">Package:</span>
                                    <span className="font-medium">{pkg.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Amount Paid:</span>
                                    <span className="font-bold text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Alert className="bg-green-50 border-green-200">
                                <Check className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-700 ml-2">
                                    Check your email for access details and download instructions
                                </AlertDescription>
                            </Alert>

                            <Button
                                onClick={() => router.push("/client/my-packages")}
                                className="w-full bg-gradient-to-r from-primary to-secondary text-white h-11"
                            >
                                View My Packages
                            </Button>

                            <Button
                                onClick={() => router.push("/client/marketplace")}
                                variant="outline"
                                className="w-full border-primary/20 hover:bg-primary/5 h-11 bg-transparent"
                            >
                                Continue Shopping
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/client/marketplace")}
                        className="mb-8 gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Marketplace
                    </Button>

                    <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleCheckout} className="space-y-6">
                                {/* Billing Information */}
                                <Card className="border-primary/20">
                                    <CardHeader>
                                        <CardTitle>Billing Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={formData.cardholderName}
                                                onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
                                                className="border-primary/20 focus:border-primary"
                                                required
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Payment Information */}
                                <Card className="border-primary/20">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Lock className="w-4 h-4" />
                                            Payment Information
                                        </CardTitle>
                                        <CardDescription>Demo credit card: 4242 4242 4242 4242 (any future expiry)</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cardNumber">Card Number</Label>
                                            <Input
                                                id="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                                className="border-primary/20 focus:border-primary font-mono"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry">Expiry Date</Label>
                                                <Input
                                                    id="expiry"
                                                    placeholder="MM/YY"
                                                    value={formData.expiryDate}
                                                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                                    className="border-primary/20 focus:border-primary font-mono"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cvv">CVV</Label>
                                                <Input
                                                    id="cvv"
                                                    type="password"
                                                    placeholder="123"
                                                    value={formData.cvv}
                                                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                                    className="border-primary/20 focus:border-primary font-mono"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium"
                                >
                                    {isProcessing ? "Processing..." : "Complete Purchase"}
                                </Button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="border-2 border-secondary/30 sticky top-24 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-base">Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Package Info */}
                                    <div className="space-y-3">
                                        <div>
                                            <p className="font-semibold text-sm">{pkg.title}</p>
                                            <p className="text-xs text-muted-foreground mt-1">by {expert.name}</p>
                                        </div>
                                        <div className="space-y-2 text-sm border-t border-border pt-3">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span className="font-medium">${pkg.price.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-muted-foreground">Platform Fee (20%)</span>
                                                <span className="text-muted-foreground">${platformFee.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                                                <span>Total</span>
                                                <span className="text-primary">${total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Security Badge */}
                                    <Alert className="bg-primary/5 border-primary/20">
                                        <Lock className="h-4 w-4 text-primary" />
                                        <AlertDescription className="text-xs text-primary ml-2">
                                            Your payment is secure and encrypted
                                        </AlertDescription>
                                    </Alert>

                                    {/* What's Included */}
                                    <div className="space-y-2 text-sm border-t border-border pt-3">
                                        <p className="font-semibold">You'll get:</p>
                                        <div className="space-y-2">
                                            {pkg.content.audioGuides && pkg.content.audioGuides.length > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-primary" />
                                                    <span className="text-xs">{pkg.content.audioGuides.length} audio guides</span>
                                                </div>
                                            )}
                                            {pkg.content.worksheets && pkg.content.worksheets.length > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-primary" />
                                                    <span className="text-xs">{pkg.content.worksheets.length} worksheets</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-primary" />
                                                <span className="text-xs">Lifetime access</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-primary" />
                                                <span className="text-xs">Email support</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
