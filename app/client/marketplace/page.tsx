"use client"

import {useStore} from "@/src/lib/store";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Navbar from "@/src/components/layout/navbar";
import ClientMarketplace from "@/src/components/client/marketplace";

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
        <>
            <Navbar />
            <ClientMarketplace />
        </>
    )
}
