"use client"

import { useStore } from "@/src/lib/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AnalyticsDashboard from "@/src/components/expert/analytics-dashboard";
import DashboardLayout from "@/src/components/layout/dashboard-layout";

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
            <DashboardLayout>
                <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-muted-foreground">Loading analytics...</p>
                    </div>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <AnalyticsDashboard />
        </DashboardLayout>
    )
}
