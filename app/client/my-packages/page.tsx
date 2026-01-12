"use client"

import { useStore } from "@/src/lib/store";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import MyPackages from "@/src/components/client/my-packages";
import DashboardLayout from "@/src/components/layout/dashboard-layout";

export default function MyPackagesPage() {
    const { currentUser } = useStore()
    const router = useRouter()

    useEffect(() => {
        if (!currentUser || currentUser.userType !== "client") {
            router.push("/")
        }
    }, [currentUser, router])

    if (!currentUser) {
        return null
    }

    return (
        <DashboardLayout>
            <MyPackages />
        </DashboardLayout>
    )
}
