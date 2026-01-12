"use client"

import { useStore } from "@/src/lib/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "@/src/components/layout/navbar";
import AnalyticsDashboard from "@/src/components/expert/analytics-dashboard";

export default function AnalyticsPage() {
    const { currentUser, isHydrated } = useStore()
    const router = useRouter()
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        if (isHydrated) {
            if (!currentUser || currentUser.userType !== "expert") {
                router.push("/")
            } else {
                setIsReady(true)
            }
        }
    }, [currentUser, isHydrated, router])

    if (!isHydrated || !isReady || !currentUser) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-muted-foreground">Loading analytics...</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <AnalyticsDashboard />
        </>
    )
}
