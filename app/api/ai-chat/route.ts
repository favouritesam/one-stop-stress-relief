import { generateText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
    const { message, userId, previousMessages } = await req.json()

    try {
        const systemPrompt = `You are a compassionate and knowledgeable Stress Relief Assistant. You provide evidence-based advice on:
- Stress management techniques and coping strategies
- Meditation and mindfulness practices
- Time management and work-life balance
- Healthy lifestyle recommendations
- Recommendations for stress relief packages

Be empathetic, supportive, and practical. Keep responses concise (2-3 paragraphs max).
Always acknowledge when professional help might be needed.`

        const conversationContext = previousMessages
            .slice(-6) // Include last 6 messages for context
            .map((msg: any) => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
            .join("\n")

        const prompt = `${conversationContext}\nUser: ${message}\n\nAI Assistant:`

        const { text } = await generateText({
            model: "openai/gpt-5-mini",
            prompt: systemPrompt + "\n\n" + prompt,
            maxOutputTokens: 500,
            temperature: 0.7,
        })

        return Response.json({
            response: text.trim(),
        })
    } catch (error) {
        console.error("AI Chat Error:", error)
        return Response.json(
            {
                response: "I apologize, I'm having trouble processing your request. Please try again.",
            },
            { status: 500 },
        )
    }
}
