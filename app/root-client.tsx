"use client"

import { useEffect, type ReactNode } from "react"
import { useStore, loadPersistedUser, loadPersistedPackages, loadPersistedAssessments, loadPersistedMatches } from "@/src/lib/store"

export function RootClient({ children }: { children: ReactNode }) {
    useEffect(() => {
        const user = loadPersistedUser()
        const savedPackages = loadPersistedPackages()
        const savedAssessments = loadPersistedAssessments()
        const savedMatches = loadPersistedMatches()

        if (user) {
            useStore.setState({ currentUser: user, isAuthenticated: true })
        }

        if (savedPackages) {
            useStore.setState({ packages: savedPackages })
        }

        if (savedAssessments) {
            useStore.setState({ assessments: savedAssessments })
        }

        if (savedMatches) {
            useStore.setState({ matchedPackages: savedMatches })
        }

        useStore.setState({ isHydrated: true })
    }, [])

    return <>{children}</>
}
