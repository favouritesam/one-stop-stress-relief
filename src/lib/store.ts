// import { create } from "zustand"
//
// export interface Package {
//     id: string
//     expertId: string
//     title: string
//     description: string
//     category: string
//     price: number
//     rating: number
//     reviews: number
//     image?: string
//     content: {
//         audioGuides?: string[]
//         worksheets?: string[]
//         schedule?: string
//         tracker?: string
//     }
//     preview?: string
//     createdAt: Date
//     views: number
//     sales: number
// }
//
// export interface User {
//     id: string
//     email: string
//     name: string
//     userType: "expert" | "client" | "admin"
//     avatar?: string
//     verified?: boolean
//     rating?: number
//     totalEarnings?: number
//     createdAt: Date
// }
//
// export interface Purchase {
//     id: string
//     userId: string
//     packageId: string
//     amount: number
//     status: "completed" | "pending" | "refunded"
//     purchasedAt: Date
// }
//
// // New interfaces for AI features, quiz, and templates
// export interface StressAssessment {
//     id: string
//     userId: string
//     stressType: string // work, relationships, health, financial, family, etc.
//     severity: number // 1-10
//     budget: number
//     lifestyle: string
//     triggers: string[]
//     createdAt: Date
// }
//
// export interface Template {
//     id: string
//     name: string
//     type: "audio" | "worksheet" | "schedule" | "tracker"
//     category: string
//     description: string
//     content: string
//     preview: string
// }
//
// export interface AIChatMessage {
//     id: string
//     userId: string
//     role: "user" | "assistant"
//     content: string
//     timestamp: Date
// }
//
// export interface MatchedPackage {
//     packageId: string
//     matchScore: number // 0-100
//     matchReasons: string[]
// }
//
// interface StoreState {
//     // User state
//     currentUser: User | null
//     users: User[]
//     setCurrentUser: (user: User | null) => void
//     addUser: (user: User) => void
//     updateUser: (userId: string, updates: Partial<User>) => void
//
//     // Package state
//     packages: Package[]
//     addPackage: (pkg: Package) => void
//     updatePackage: (packageId: string, updates: Partial<Package>) => void
//     deletePackage: (packageId: string) => void
//     getPackagesByExpert: (expertId: string) => Package[]
//     searchPackages: (query: string) => Package[]
//
//     // Purchase state
//     purchases: Purchase[]
//     addPurchase: (purchase: Purchase) => void
//     getUserPurchases: (userId: string) => Purchase[]
//
//     // UI state
//     isAuthenticated: boolean
//     setAuthenticated: (value: boolean) => void
//
//     // AI and assessment state
//     assessments: StressAssessment[]
//     addAssessment: (assessment: StressAssessment) => void
//     getUserAssessment: (userId: string) => StressAssessment | undefined
//
//     // Template state
//     templates: Template[]
//     addTemplate: (template: Template) => void
//     getTemplatesByType: (type: string) => Template[]
//
//     // Chat message state
//     chatMessages: AIChatMessage[]
//     addChatMessage: (message: AIChatMessage) => void
//     getUserChatMessages: (userId: string) => AIChatMessage[]
//     clearUserChat: (userId: string) => void
//
//     // Matched packages state
//     matchedPackages: Map<string, MatchedPackage[]>
//     setMatchedPackages: (userId: string, matches: MatchedPackage[]) => void
//     getMatchedPackages: (userId: string) => MatchedPackage[]
// }
//
// export const useStore = create<StoreState>((set, get) => ({
//     // User state
//     currentUser: null,
//     users: [
//         {
//             id: "expert-1",
//             email: "dr.sarah@example.com",
//             name: "Dr. Sarah Johnson",
//             userType: "expert",
//             verified: true,
//             rating: 4.8,
//             totalEarnings: 15000,
//             createdAt: new Date("2024-01-15"),
//         },
//         {
//             id: "expert-2",
//             email: "james@example.com",
//             name: "James Chen",
//             userType: "expert",
//             verified: true,
//             rating: 4.6,
//             totalEarnings: 12000,
//             createdAt: new Date("2024-02-20"),
//         },
//     ],
//
//     setCurrentUser: (user) => set({ currentUser: user }),
//
//     addUser: (user) =>
//         set((state) => ({
//             users: [...state.users, user],
//         })),
//
//     updateUser: (userId, updates) =>
//         set((state) => ({
//             users: state.users.map((user) => (user.id === userId ? { ...user, ...updates } : user)),
//         })),
//
//     // Package state
//     packages: [
//         {
//             id: "pkg-1",
//             expertId: "expert-1",
//             title: "Work Stress Mastery",
//             description: "Comprehensive program to manage deadline anxiety and workplace pressure",
//             category: "Work Stress",
//             price: 29.99,
//             rating: 4.8,
//             reviews: 245,
//             content: {
//                 audioGuides: ["Guided Meditation", "Breathing Techniques", "Sleep Stories"],
//                 worksheets: ["Daily Reflection", "Priority Matrix", "Goal Setting"],
//                 schedule: "30-day personalized plan",
//                 tracker: "Progress monitoring tools",
//             },
//             preview: "First 5 days of content included",
//             createdAt: new Date("2024-01-20"),
//             views: 0,
//             sales: 0,
//         },
//         {
//             id: "pkg-2",
//             expertId: "expert-1",
//             title: "Relationship Harmony",
//             description: "Navigate relationship challenges with expert guidance and communication strategies",
//             category: "Relationships",
//             price: 24.99,
//             rating: 4.7,
//             reviews: 189,
//             content: {
//                 audioGuides: ["Communication Skills", "Conflict Resolution", "Emotional Intelligence"],
//                 worksheets: ["Conversation Starters", "Boundary Setting", "Love Languages"],
//                 schedule: "21-day course",
//                 tracker: "Relationship health tracker",
//             },
//             preview: "Introduction module free",
//             createdAt: new Date("2024-01-25"),
//             views: 0,
//             sales: 0,
//         },
//         {
//             id: "pkg-3",
//             expertId: "expert-2",
//             title: "Financial Anxiety Relief",
//             description: "Overcome money stress and build a healthy financial mindset",
//             category: "Financial Stress",
//             price: 34.99,
//             rating: 4.9,
//             reviews: 312,
//             content: {
//                 audioGuides: ["Money Mindset", "Budgeting Basics", "Investment Understanding"],
//                 worksheets: ["Budget Planner", "Debt Strategy", "Income Goals"],
//                 schedule: "45-day comprehensive program",
//                 tracker: "Financial progress dashboard",
//             },
//             preview: "First module available for preview",
//             createdAt: new Date("2024-02-01"),
//             views: 0,
//             sales: 0,
//         },
//     ],
//
//     addPackage: (pkg) =>
//         set((state) => ({
//             packages: [...state.packages, pkg],
//         })),
//
//     updatePackage: (packageId, updates) =>
//         set((state) => ({
//             packages: state.packages.map((pkg) => (pkg.id === packageId ? { ...pkg, ...updates } : pkg)),
//         })),
//
//     deletePackage: (packageId) =>
//         set((state) => ({
//             packages: state.packages.filter((pkg) => pkg.id !== packageId),
//         })),
//
//     getPackagesByExpert: (expertId) => {
//         return get().packages.filter((pkg) => pkg.expertId === expertId)
//     },
//
//     searchPackages: (query) => {
//         const lowerQuery = query.toLowerCase()
//         return get().packages.filter(
//             (pkg) =>
//                 pkg.title.toLowerCase().includes(lowerQuery) ||
//                 pkg.description.toLowerCase().includes(lowerQuery) ||
//                 pkg.category.toLowerCase().includes(lowerQuery),
//         )
//     },
//
//     // Purchase state
//     purchases: [
//         {
//             id: "purchase-1",
//             userId: "client-1",
//             packageId: "pkg-1",
//             amount: 29.99,
//             status: "completed",
//             purchasedAt: new Date("2024-03-01"),
//         },
//     ],
//
//     addPurchase: (purchase) =>
//         set((state) => ({
//             purchases: [...state.purchases, purchase],
//         })),
//
//     getUserPurchases: (userId) => {
//         return get().purchases.filter((p) => p.userId === userId)
//     },
//
//     // UI state
//     isAuthenticated: false,
//     setAuthenticated: (value) => set({ isAuthenticated: value }),
//
//     // AI and assessment state
//     assessments: [],
//     addAssessment: (assessment) =>
//         set((state) => ({
//             assessments: [...state.assessments, assessment],
//         })),
//     getUserAssessment: (userId) => {
//         return get().assessments.find((a) => a.userId === userId)
//     },
//
//     // Template state
//     templates: [
//         {
//             id: "tmpl-1",
//             name: "Guided Meditation",
//             type: "audio",
//             category: "Work Stress",
//             description: "10-minute guided meditation for work stress",
//             content: "Audio meditation content...",
//             preview: "5-minute preview available",
//         },
//         {
//             id: "tmpl-2",
//             name: "Daily Reflection Worksheet",
//             type: "worksheet",
//             category: "All",
//             description: "PDF worksheet for daily reflection",
//             content: "Worksheet PDF content...",
//             preview: "Preview available",
//         },
//         {
//             id: "tmpl-3",
//             name: "30-Day Schedule",
//             type: "schedule",
//             category: "All",
//             description: "Personalized 30-day stress relief schedule",
//             content: "Schedule content...",
//             preview: "First week preview",
//         },
//         {
//             id: "tmpl-4",
//             name: "Progress Tracker",
//             type: "tracker",
//             category: "All",
//             description: "Track your stress relief progress",
//             content: "Tracker template...",
//             preview: "Sample tracker",
//         },
//     ],
//     addTemplate: (template) =>
//         set((state) => ({
//             templates: [...state.templates, template],
//         })),
//     getTemplatesByType: (type) => {
//         return get().templates.filter((t) => t.type === type)
//     },
//
//     // Chat message state
//     chatMessages: [],
//     addChatMessage: (message) =>
//         set((state) => ({
//             chatMessages: [...state.chatMessages, message],
//         })),
//     getUserChatMessages: (userId) => {
//         return get().chatMessages.filter((m) => m.userId === userId)
//     },
//     clearUserChat: (userId) =>
//         set((state) => ({
//             chatMessages: state.chatMessages.filter((m) => m.userId !== userId),
//         })),
//
//     // Matched packages state
//     matchedPackages: new Map(),
//     setMatchedPackages: (userId, matches) => {
//         set((state) => {
//             const newMap = new Map(state.matchedPackages)
//             newMap.set(userId, matches)
//             return { matchedPackages: newMap }
//         })
//     },
//     getMatchedPackages: (userId) => {
//         return get().matchedPackages.get(userId) || []
//     },
// }))
//


import { create } from "zustand"

export interface Package {
    id: string
    expertId: string
    title: string
    description: string
    category: string
    price: number
    rating: number
    reviews: number
    image?: string
    content: {
        audioGuides?: string[]
        worksheets?: string[]
        schedule?: string
        tracker?: string
    }
    preview?: string
    createdAt: Date
    views: number
    sales: number
}

export interface User {
    id: string
    email: string
    name: string
    userType: "expert" | "client" | "admin"
    avatar?: string
    verified?: boolean
    rating?: number
    totalEarnings?: number
    createdAt: Date
}

export interface Purchase {
    id: string
    userId: string
    packageId: string
    amount: number
    status: "completed" | "pending" | "refunded"
    purchasedAt: Date
}

// New interfaces for AI features, quiz, and templates
export interface StressAssessment {
    id: string
    userId: string
    stressType: string // work, relationships, health, financial, family, etc.
    severity: number // 1-10
    budget: number
    lifestyle: string
    triggers: string[]
    createdAt: Date
}

export interface Template {
    id: string
    name: string
    type: "audio" | "worksheet" | "schedule" | "tracker"
    category: string
    description: string
    content: string
    preview: string
}

export interface AIChatMessage {
    id: string
    userId: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

export interface MatchedPackage {
    packageId: string
    matchScore: number // 0-100
    matchReasons: string[]
}

interface StoreState {
    // User state
    currentUser: User | null
    users: User[]
    setCurrentUser: (user: User | null) => void
    addUser: (user: User) => void
    updateUser: (userId: string, updates: Partial<User>) => void

    // Package state
    packages: Package[]
    addPackage: (pkg: Package) => void
    updatePackage: (packageId: string, updates: Partial<Package>) => void
    deletePackage: (packageId: string) => void
    getPackagesByExpert: (expertId: string) => Package[]
    searchPackages: (query: string) => Package[]

    // Purchase state
    purchases: Purchase[]
    addPurchase: (purchase: Purchase) => void
    getUserPurchases: (userId: string) => Purchase[]

    // UI state
    isAuthenticated: boolean
    setAuthenticated: (value: boolean) => void

    // AI and assessment state
    assessments: StressAssessment[]
    addAssessment: (assessment: StressAssessment) => void
    getUserAssessment: (userId: string) => StressAssessment | undefined

    // Template state
    templates: Template[]
    addTemplate: (template: Template) => void
    getTemplatesByType: (type: string) => Template[]

    // Chat message state
    chatMessages: AIChatMessage[]
    addChatMessage: (message: AIChatMessage) => void
    getUserChatMessages: (userId: string) => AIChatMessage[]
    clearUserChat: (userId: string) => void

    // Matched packages state
    matchedPackages: Map<string, MatchedPackage[]>
    setMatchedPackages: (userId: string, matches: MatchedPackage[]) => void
    getMatchedPackages: (userId: string) => MatchedPackage[]

    // Hydration state
    isHydrated: boolean
}

const STORAGE_KEY = "stressrelief-user"

export const useStore = create<StoreState>((set, get) => ({
    // User state
    currentUser: null,
    users: [
        {
            id: "expert-1",
            email: "dr.sarah@example.com",
            name: "Dr. Sarah Johnson",
            userType: "expert",
            verified: true,
            rating: 4.8,
            totalEarnings: 15000,
            createdAt: new Date("2024-01-15"),
        },
        {
            id: "expert-2",
            email: "james@example.com",
            name: "James Chen",
            userType: "expert",
            verified: true,
            rating: 4.6,
            totalEarnings: 12000,
            createdAt: new Date("2024-02-20"),
        },
    ],

    setCurrentUser: (user) => {
        if (user) {
            // Persist user to localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
            }
        } else {
            // Clear localStorage when logging out
            if (typeof window !== "undefined") {
                localStorage.removeItem(STORAGE_KEY)
            }
        }
        set({ currentUser: user })
    },

    addUser: (user) =>
        set((state) => ({
            users: [...state.users, user],
        })),

    updateUser: (userId, updates) =>
        set((state) => ({
            users: state.users.map((user) => (user.id === userId ? { ...user, ...updates } : user)),
        })),

    // Package state
    packages: [
        {
            id: "pkg-1",
            expertId: "expert-1",
            title: "Work Stress Mastery",
            description: "Comprehensive program to manage deadline anxiety and workplace pressure",
            category: "Work Stress",
            price: 29.99,
            rating: 4.8,
            reviews: 245,
            content: {
                audioGuides: ["Guided Meditation", "Breathing Techniques", "Sleep Stories"],
                worksheets: ["Daily Reflection", "Priority Matrix", "Goal Setting"],
                schedule: "30-day personalized plan",
                tracker: "Progress monitoring tools",
            },
            preview: "First 5 days of content included",
            createdAt: new Date("2024-01-20"),
            views: 1245,
            sales: 89,
        },
        {
            id: "pkg-2",
            expertId: "expert-1",
            title: "Relationship Harmony",
            description: "Navigate relationship challenges with expert guidance and communication strategies",
            category: "Relationships",
            price: 24.99,
            rating: 4.7,
            reviews: 189,
            content: {
                audioGuides: ["Communication Skills", "Conflict Resolution", "Emotional Intelligence"],
                worksheets: ["Conversation Starters", "Boundary Setting", "Love Languages"],
                schedule: "21-day course",
                tracker: "Relationship health tracker",
            },
            preview: "Introduction module free",
            createdAt: new Date("2024-01-25"),
            views: 892,
            sales: 64,
        },
        {
            id: "pkg-3",
            expertId: "expert-2",
            title: "Financial Anxiety Relief",
            description: "Overcome money stress and build a healthy financial mindset",
            category: "Financial Stress",
            price: 34.99,
            rating: 4.9,
            reviews: 312,
            content: {
                audioGuides: ["Money Mindset", "Budgeting Basics", "Investment Understanding"],
                worksheets: ["Budget Planner", "Debt Strategy", "Income Goals"],
                schedule: "45-day comprehensive program",
                tracker: "Financial progress dashboard",
            },
            preview: "First module available for preview",
            createdAt: new Date("2024-02-01"),
            views: 1567,
            sales: 123,
        },
    ],

    addPackage: (pkg) =>
        set((state) => ({
            packages: [...state.packages, pkg],
        })),

    updatePackage: (packageId, updates) =>
        set((state) => ({
            packages: state.packages.map((pkg) => (pkg.id === packageId ? { ...pkg, ...updates } : pkg)),
        })),

    deletePackage: (packageId) =>
        set((state) => ({
            packages: state.packages.filter((pkg) => pkg.id !== packageId),
        })),

    getPackagesByExpert: (expertId) => {
        return get().packages.filter((pkg) => pkg.expertId === expertId)
    },

    searchPackages: (query) => {
        const lowerQuery = query.toLowerCase()
        return get().packages.filter(
            (pkg) =>
                pkg.title.toLowerCase().includes(lowerQuery) ||
                pkg.description.toLowerCase().includes(lowerQuery) ||
                pkg.category.toLowerCase().includes(lowerQuery),
        )
    },

    // Purchase state
    purchases: [
        {
            id: "purchase-1",
            userId: "client-1",
            packageId: "pkg-1",
            amount: 29.99,
            status: "completed",
            purchasedAt: new Date("2024-03-01"),
        },
    ],

    addPurchase: (purchase) =>
        set((state) => ({
            purchases: [...state.purchases, purchase],
        })),

    getUserPurchases: (userId) => {
        return get().purchases.filter((p) => p.userId === userId)
    },

    // UI state
    isAuthenticated: false,
    setAuthenticated: (value) => set({ isAuthenticated: value }),

    // AI and assessment state
    assessments: [],
    addAssessment: (assessment) =>
        set((state) => ({
            assessments: [...state.assessments, assessment],
        })),
    getUserAssessment: (userId) => {
        return get().assessments.find((a) => a.userId === userId)
    },

    // Template state
    templates: [
        {
            id: "tmpl-1",
            name: "Guided Meditation",
            type: "audio",
            category: "Work Stress",
            description: "10-minute guided meditation for work stress",
            content: "Audio meditation content...",
            preview: "5-minute preview available",
        },
        {
            id: "tmpl-2",
            name: "Daily Reflection Worksheet",
            type: "worksheet",
            category: "All",
            description: "PDF worksheet for daily reflection",
            content: "Worksheet PDF content...",
            preview: "Preview available",
        },
        {
            id: "tmpl-3",
            name: "30-Day Schedule",
            type: "schedule",
            category: "All",
            description: "Personalized 30-day stress relief schedule",
            content: "Schedule content...",
            preview: "First week preview",
        },
        {
            id: "tmpl-4",
            name: "Progress Tracker",
            type: "tracker",
            category: "All",
            description: "Track your stress relief progress",
            content: "Tracker template...",
            preview: "Sample tracker",
        },
    ],
    addTemplate: (template) =>
        set((state) => ({
            templates: [...state.templates, template],
        })),
    getTemplatesByType: (type) => {
        return get().templates.filter((t) => t.type === type)
    },

    // Chat message state
    chatMessages: [],
    addChatMessage: (message) =>
        set((state) => ({
            chatMessages: [...state.chatMessages, message],
        })),
    getUserChatMessages: (userId) => {
        return get().chatMessages.filter((m) => m.userId === userId)
    },
    clearUserChat: (userId) =>
        set((state) => ({
            chatMessages: state.chatMessages.filter((m) => m.userId !== userId),
        })),

    // Matched packages state
    matchedPackages: new Map(),
    setMatchedPackages: (userId, matches) => {
        set((state) => {
            const newMap = new Map(state.matchedPackages)
            newMap.set(userId, matches)
            return { matchedPackages: newMap }
        })
    },
    getMatchedPackages: (userId) => {
        return get().matchedPackages.get(userId) || []
    },

    // Hydration state
    isHydrated: false,
}))

export const loadPersistedUser = () => {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                return JSON.parse(saved) as User
            } catch {
                return null
            }
        }
    }
    return null
}
