export type UserType = "expert" | "client" | "admin"

export interface StressCategory {
    id: string
    name: string
    description: string
    icon: string
}

export const STRESS_CATEGORIES: StressCategory[] = [
    {
        id: "work",
        name: "Work Stress",
        description: "Deadlines, pressure, work-life balance",
        icon: "Briefcase",
    },
    {
        id: "relationships",
        name: "Relationship Issues",
        description: "Family, partnerships, social connections",
        icon: "Heart",
    },
    {
        id: "financial",
        name: "Financial Stress",
        description: "Money concerns, debt, budgeting",
        icon: "DollarSign",
    },
    {
        id: "health",
        name: "Health Anxiety",
        description: "Health concerns, fitness, wellness",
        icon: "Activity",
    },
    {
        id: "general",
        name: "General Anxiety",
        description: "Everyday stress and worry",
        icon: "Brain",
    },
    {
        id: "sleep",
        name: "Sleep Issues",
        description: "Insomnia, sleep quality, rest",
        icon: "Moon",
    },
]
