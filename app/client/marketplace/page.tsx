"use client"

import { useStore } from "@/src/lib/store";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import ClientMarketplace from "@/src/components/client/marketplace";
import DashboardLayout from "@/src/components/layout/dashboard-layout";

export default function ClientMarketplacePage() {
    const { currentUser } = useStore()
    const router = useRouter()

    useEffect(() => {
        if (!currentUser || currentUser.userType !== "client") {
            router.push("/")
        }
    }, [currentUser, router])

    if (!currentUser || currentUser.userType !== "client") {
        return null
    }

    return (
        <DashboardLayout>
            <ClientMarketplace />
        </DashboardLayout>
    )
}
