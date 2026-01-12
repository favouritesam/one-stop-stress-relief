"use client"

import { useStore } from "@/src/lib/store";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import ExpertDashboard from "@/src/components/expert/dashboard";
import DashboardLayout from "@/src/components/layout/dashboard-layout";

export default function ExpertDashboardPage() {
    const { currentUser } = useStore()
    const router = useRouter()

    useEffect(() => {
        if (!currentUser || currentUser.userType !== "expert") {
            router.push("/")
        }
    }, [currentUser, router])

    if (!currentUser || currentUser.userType !== "expert") {
        return null
    }

    return (
        <DashboardLayout>
            <ExpertDashboard />
        </DashboardLayout>
    )
}
