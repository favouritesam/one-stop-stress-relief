"use client"

import {useStore} from "@/src/lib/store";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Navbar from "@/src/components/layout/navbar";
import MyPackages from "@/src/components/client/my-packages";

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
        <>
            <Navbar />
            <MyPackages />
        </>
    )
}
