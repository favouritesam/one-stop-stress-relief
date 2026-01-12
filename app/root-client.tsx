"use client"

import { useEffect, type ReactNode } from "react"
import { useStore, loadPersistedUser } from "@/src/lib/store"

export function RootClient({ children }: { children: ReactNode }) {
    useEffect(() => {
        const user = loadPersistedUser()
        if (user) {
            useStore.setState({ currentUser: user, isAuthenticated: true })
        }
        useStore.setState({ isHydrated: true })
    }, [])

    return <>{children}</>
}
