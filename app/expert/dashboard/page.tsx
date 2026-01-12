"use client"

import {useStore} from "@/src/lib/store";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Navbar from "@/src/components/layout/navbar";
import ExpertDashboard from "@/src/components/expert/dashboard";

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
        <>
            <Navbar />
            <ExpertDashboard />
        </>
    )
}
