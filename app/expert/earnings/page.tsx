"use client"

import {useStore} from "@/src/lib/store";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Navbar from "@/src/components/layout/navbar";
import EarningsPage from "@/src/components/expert/earnings";

export default function ExpertEarningsPage() {
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
        <>
            <Navbar />
            <EarningsPage />
        </>
    )
}
