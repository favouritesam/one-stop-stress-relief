"use client"

import { useStore } from "@/src/lib/store";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import CreatePackageForm from "@/src/components/expert/create-package-form";
import DashboardLayout from "@/src/components/layout/dashboard-layout";

export default function CreatePackagePage() {
    const { currentUser } = useStore()
    const router = useRouter()

    useEffect(() => {
        if (!currentUser || currentUser.userType !== "expert") {
            router.push("/")
        }
    }, [currentUser, router])

    if (!currentUser) {
        return null
    }

    return (
        <DashboardLayout>
            <CreatePackageForm />
        </DashboardLayout>
    )
}
