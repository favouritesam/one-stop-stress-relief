import { useStore, type Package, type StressAssessment } from "./store"

interface MatchingContext {
    assessment: StressAssessment
    userPurchases: string[]
}

export function calculatePackageMatch(pkg: Package, context: MatchingContext): { score: number; reasons: string[] } {
    const reasons: string[] = []
    let score = 0

    // 1. Category match (40% weight)
    const categoryMatch = pkg.category.toLowerCase().includes(context.assessment.stressType.toLowerCase())
    if (categoryMatch) {
        score += 40
        reasons.push(`Matches your stress type: ${context.assessment.stressType}`)
    }

    // 2. Budget fit (30% weight)
    const budgetMatch = pkg.price <= context.assessment.budget
    if (budgetMatch) {
        score += 30
        reasons.push(`Fits your budget of $${context.assessment.budget}`)
    } else {
        score += Math.max(0, 30 - (pkg.price - context.assessment.budget) * 2)
    }

    // 3. Rating & popularity (20% weight)
    const ratingScore = (pkg.rating / 5) * 20
    score += ratingScore
    if (pkg.rating >= 4.5) {
        reasons.push(`Highly rated (${pkg.rating}/5) with ${pkg.reviews} reviews`)
    }

    // 4. Novelty bonus (10% weight)
    const isNew = !context.userPurchases.includes(pkg.id)
    if (isNew) {
        score += 10
        reasons.push("New package recommendation")
    }

    return {
        score: Math.min(100, Math.round(score)),
        reasons,
    }
}

export function getAIMatchedPackages(
    userId: string,
    assessment: StressAssessment,
): { packageId: string; matchScore: number; matchReasons: string[] }[] {
    const store = useStore.getState()
    const purchases = store.getUserPurchases(userId)
    const userPurchaseIds = purchases.map((p) => p.packageId)

    const matchedPackages = store.packages
        .map((pkg) => {
            const { score, reasons } = calculatePackageMatch(pkg, {
                assessment,
                userPurchases: userPurchaseIds,
            })
            return {
                packageId: pkg.id,
                matchScore: score,
                matchReasons: reasons,
            }
        })
        .filter((m) => m.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 12)

    return matchedPackages
}
