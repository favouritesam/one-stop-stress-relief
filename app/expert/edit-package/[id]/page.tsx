"use client"

import { useStore } from "@/src/lib/store"
import { useRouter } from "next/navigation"
import { useEffect, use } from "react"
import CreatePackageForm from "@/src/components/expert/create-package-form"
import DashboardLayout from "@/src/components/layout/dashboard-layout";

export default function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const { currentUser, isHydrated } = useStore()
    const router = useRouter()

    useEffect(() => {
        if (isHydrated && (!currentUser || currentUser.userType !== "expert")) {
            router.push("/")
        }
    }, [currentUser, isHydrated, router])

    if (!isHydrated || !currentUser) {
        return null
    }

    return (
        <DashboardLayout>
            <CreatePackageForm packageId={id} />
        </DashboardLayout>
    )
}
