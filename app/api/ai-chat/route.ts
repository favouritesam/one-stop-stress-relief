// This API now supports MULTI-LANGUAGE responses. 
// It uses a robust translation dictionary to provide empathetic advice in the user's preferred language.

export const maxDuration = 30

const TRANSLATIONS: Record<string, Record<string, string>> = {
    "English": {
        "welcome": "Hello! I'm your Stress Relief Assistant. I'm here to listen and help you find the right tools to feel better. How have things been for you lately?",
        "work": "Work stress can be incredibly overwhelming, especially with tight deadlines. I recommend the 'Priority Matrix' tool found in our 'Work Stress Mastery' package to help clear the mental clutter. Would you like a quick 1-minute breathing exercise to reset right now?",
        "meditation": "Mindfulness is a skill that gets stronger with practice. Even just noticing the sensation of your feet on the ground for a moment can ground you. Have you tried guided meditation before, or are you looking for something new?",
        "sleep": "Sleep and stress are closely linked. When we're stressed, our minds stay 'on' at night. I suggest a 'brain dump'—writing down everything you're worried about before bed. We also have audio 'Sleep Stories' in our packages. Would you like to hear about those?",
        "money": "Financial anxiety can feel very isolating. The best way to manage it is through small, concrete steps to regain a sense of control. Our 'Financial Anxiety Relief' package is designed for exactly this. Would you like to see how it helps you organize your goals?",
        "relationship": "Relationships are a major source of both support and stress. Setting boundaries isn't about pushing people away, it's about protecting your own peace. Our 'Relationship Harmony' package has great worksheets on this. Would you like me to explain how boundary-setting works?",
        "thanks": "You're very welcome! I'm glad I could help. Is there anything else you'd like to explore, or are you feeling better for now?",
        "default": "I hear you. Managing stress is a personal journey, and there's no one-size-fits-all solution. To help you best, would you like to explore some immediate breathing techniques, or should we look for a structured package that matches your situation?",
        "breathing_instruction": "Great! Let's try the '4-7-8' technique. Inhale quietly through your nose for 4 counts, hold your breath for 7, and exhale completely through your mouth for 8 counts. This works like a natural tranquilizer for the nervous system. How do you feel after trying that?",
        "package_intro": "I'd stay happy to help you find a structured package! These are curated by experts like Dr. Sarah Johnson. To see matches tailored specifically to the results of your quiz, click on the 'Recommendations' tab at the top. Should I explain what's usually inside one of our packages?",
        "package_content": "Most of our packages include three core pillars: Expert Video/Audio Guides, Actionable Worksheets, and Direct Chat Access to the expert. Does this sound like the kind of structured support you're looking for?"
    },
    "Spanish": {
        "welcome": "¡Hola! Soy tu Asistente de Alivio del Estrés. Estoy aquí para escucharte y ayudarte a encontrar las herramientas adecuadas para sentirte mejor. ¿Cómo te ha ido últimamente?",
        "work": "El estrés laboral puede ser increíblemente abrumador. Recomiendo la herramienta 'Matriz de Prioridades' en nuestro paquete de 'Maestría en Estrés Laboral'. ¿Te gustaría un ejercicio de respiración rápido de 1 minuto?",
        "meditation": "La atención plena es una habilidad que se fortalece con la práctica. ¿Has probado la meditación guiada antes o buscas algo nuevo?",
        "sleep": "El sueño y el estrés están estrechamente vinculados. Sugiero escribir todo lo que te preocupa antes de dormir. ¿Te gustaría saber más sobre nuestras 'Historias para Dormir'?",
        "money": "La ansiedad financiera puede sentirse muy aislante. Nuestro paquete 'Alivio de la Ansiedad Financiera' está diseñado para esto. ¿Quieres ver cómo te ayuda?",
        "relationship": "Las relaciones son una gran fuente de apoyo y estrés. Establecer límites protege tu paz. ¿Te explico cómo funciona el establecimiento de límites?",
        "thanks": "¡De nada! Me alegra haber podido ayudar. ¿Hay algo más que quieras explorar?",
        "default": "Te escucho. Manejar el estrés es un viaje personal. Para ayudarte mejor, ¿te gustaría explorar técnicas de respiración o buscar un paquete estructurado?",
        "breathing_instruction": "¡Genial! Probemos la técnica '4-7-8'. Inhala por la nariz durante 4 segundos, mantén por 7 y exhala por la boca durante 8. ¿Cómo te sientes?",
        "package_intro": "¡Estaré encantado de ayudarte! Nuestros paquetes son creados por expertos. Haz clic en 'Recomendaciones' para ver tus coincidencias. ¿Te explico qué contienen?",
        "package_content": "Incluyen tres pilares: Guías de video/audio, hojas de trabajo accionables y chat directo con el experto. ¿Es esto lo que buscas?"
    },
    "French": {
        "welcome": "Bonjour ! Je suis votre Assistant Anti-stress. Je suis là pour vous écouter et vous aider. Comment vous sentez-vous ces derniers temps ?",
        "work": "Le stress au travail peut être écrasant. Je recommande l'outil 'Matrice de Priorités'. Voulez-vous un exercice de respiration rapide d'une minute ?",
        "meditation": "La pleine conscience est une compétence qui se développe. Avez-vous déjà essayé la méditation guidée ?",
        "sleep": "Le sommeil et le stress sont liés. Je suggère de noter vos soucis avant de dormir. Voulez-vous découvrir nos 'Histoires pour s'endormir' ?",
        "money": "L'anxiété financière peut être isolante. Notre pack 'Soulagement de l'Anxiété Financière' est là pour vous. Voulez-vous voir comment il fonctionne ?",
        "relationship": "Les relations sont sources de soutien et de stress. Poser des limites protège votre paix. Voulez-vous que j'explique comment faire ?",
        "thanks": "Je vous en prie ! Je suis ravi d'avoir pu aider. Autre chose à explorer ?",
        "default": "Je vous entends. Gérer le stress est un voyage personnel. Voulez-vous essayer la respiration ou voir nos packages structurés ?",
        "breathing_instruction": "Super ! Essayons la technique '4-7-8'. Inspirez pendant 4s, bloquez pendant 7s, expirez pendant 8s. Comment vous sentez-vous ?",
        "package_intro": "Je serais ravi de vous aider ! Nos packs sont créés par des experts. Cliquez sur 'Recommandations' pour voir vos matchs. Voulez-vous le détail ?",
        "package_content": "Ils incluent : Guides vidéo/audio, fiches de travail et accès direct par chat avec l'expert. Est-ce ce que vous recherchez ?"
    },
    "German": {
        "welcome": "Hallo! Ich bin dein Stressbewältigungs-Assistent. Wie geht es dir in letzter Zeit?",
        "work": "Arbeitsstress kann überwältigend sein. Ich empfehle die 'Prioritäten-Matrix' in unserem Paket. Möchtest du eine kurze Atemübung machen?",
        "meditation": "Achtsamkeit ist eine Fähigkeit, die Übung erfordert. Hast du schon mal geführte Meditation ausprobiert?",
        "sleep": "Schlaf und Stress hängen eng zusammen. Ich empfehle, alle Sorgen vor dem Schlafengehen aufzuschreiben. Möchtest du mehr über unsere 'Schlafgeschichten' erfahren?",
        "money": "Finanzielle Ängste können sehr isolierend wirken. Unser Paket 'Finanzielle Angstbewältigung' hilft dir dabei. Möchtest du sehen wie?",
        "relationship": "Beziehungen sind eine Quelle von Unterstützung und Stress. Grenzen zu setzen schützt deinen inneren Frieden. Soll ich erklären wie?",
        "thanks": "Sehr gerne! Ich freue mich, dass ich helfen konnte. Möchtest du noch etwas anderes erkunden?",
        "default": "Ich verstehe. Stressbewältigung ist ein persönlicher Weg. Möchtest du Atemtechniken ausprobieren oder nach einem strukturierten Paket suchen?",
        "breathing_instruction": "Toll! Versuchen wir die '4-7-8'-Technik. 4 Sek. einatmen, 7 Sek. halten, 8 Sek. ausatmen. Wie fühlst du dich danach?",
        "package_intro": "Gerne helfe ich dir! Unsere Pakete werden von Experten erstellt. Klicke auf 'Empfehlungen', um passende Lösungen zu finden. Soll ich den Inhalt erklären?",
        "package_content": "Sie umfassen: Video/Audio-Anleitungen, Arbeitsblätter und direkten Chat mit dem Experten. Klingt das nach der Unterstützung, die du suchst?"
    },
    "Chinese": {
        "welcome": "你好！我是你的压力缓解助手。最近感觉怎么样？",
        "work": "工作压力可能会让人感到窒息。我建议使用我们“工作压力管理”包中的“优先矩阵”工具。你想现在做一个1分钟的深呼吸练习吗？",
        "meditation": "正念是一项需要练习的技能。你以前尝试过冥想吗？还是在寻找新的方法？",
        "sleep": "睡眠和压力紧密相关。我建议在睡觉前把所有担心的事都写下来。你想了解我们的“睡眠故事”音频吗？",
        "money": "经济焦虑会让人感到孤立。我们的“缓解财务焦虑”包就是为此设计的。你想看看它如何帮助你吗？",
        "relationship": "人际关系是压力和支持的重要来源。设定界限是为了保护你的平静。你想让我解释一下如何设定界限吗？",
        "thanks": "不客气！很高兴能帮到你。还有什么想了解的吗？",
        "default": "我明白你的感受。压力管理是一个个人旅程。你想尝试简单的呼吸练习，还是寻找适合你的结构化方案？",
        "breathing_instruction": "太棒了！让我们尝试“4-7-8”呼吸法。吸气4秒，憋气7秒，呼气8秒。现在感觉如何？",
        "package_intro": "我很乐意帮你寻找方案！这些方案由专家精心打造。点击顶部的“推荐”选项卡查看匹配项。需要我解释包里的内容吗？",
        "package_content": "我们的方案包含三大支柱：专家视听指南、实操工作表以及与专家的直接沟通。这是你需要的支持吗？"
    }
};

export async function POST(req: Request) {
    const { message, userId, previousMessages = [], language = "English" } = await req.json()

    try {
        const lowerMessage = message.toLowerCase().trim()
        const lastAIMessage = [...previousMessages].reverse().find(m => m.role === "assistant")?.content.toLowerCase() || ""

        // Use translation dictionary
        const dict = TRANSLATIONS[language] || TRANSLATIONS["English"];
        let response = ""

        // Selection Detection
        const isAffirmative = ["yes", "okay", "ok", "sure", "id like that", "please", "yes please", "definitely", "absolutely", "si", "oui", "ja", "是的"].some(word => lowerMessage === word || lowerMessage.startsWith(word + " "));
        const isPickPackage = lowerMessage.includes("package") || lowerMessage.includes("structured") || lowerMessage.includes("paquete") || lowerMessage.includes("pack") || lowerMessage.includes("方案");
        const isPickBreathing = lowerMessage.includes("breathing") || lowerMessage.includes("technique") || lowerMessage.includes("exercise") || lowerMessage.includes("respiración") || lowerMessage.includes("呼吸");
        const isAskingExplanation = lowerMessage.includes("inside") || lowerMessage.includes("explain") || lowerMessage.includes("content") || lowerMessage.includes("explicar") || lowerMessage.includes("解释");

        if (isAffirmative || isPickPackage || isPickBreathing) {
            if (isPickBreathing && !isPickPackage) {
                response = dict["breathing_instruction"];
            } else if (isAskingExplanation) {
                response = dict["package_content"];
            } else if (isPickPackage) {
                response = dict["package_intro"];
            } else if (isAffirmative) {
                if (lastAIMessage.includes("breathing") || lastAIMessage.includes("respiración") || lastAIMessage.includes("呼吸")) {
                    response = dict["breathing_instruction"];
                } else if (lastAIMessage.includes("explain") || lastAIMessage.includes("explicar") || lastAIMessage.includes("解释")) {
                    response = dict["package_content"];
                } else {
                    response = dict["welcome"];
                }
            }
        }
        else if (lowerMessage.includes("work") || lowerMessage.includes("deadline") || lowerMessage.includes("trabajo") || lowerMessage.includes("工作")) {
            response = dict["work"];
        } else if (lowerMessage.includes("meditation") || lowerMessage.includes("relax") || lowerMessage.includes("meditación") || lowerMessage.includes("冥想")) {
            response = dict["meditation"];
        } else if (lowerMessage.includes("sleep") || lowerMessage.includes("night") || lowerMessage.includes("dormir") || lowerMessage.includes("睡眠")) {
            response = dict["sleep"];
        } else if (lowerMessage.includes("money") || lowerMessage.includes("financial") || lowerMessage.includes("dinero") || lowerMessage.includes("财务")) {
            response = dict["money"];
        } else if (lowerMessage.includes("relationship") || lowerMessage.includes("family") || lowerMessage.includes("familia") || lowerMessage.includes("关系")) {
            response = dict["relationship"];
        } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hola") || lowerMessage.includes("你好")) {
            response = dict["welcome"];
        } else if (lowerMessage.includes("thank") || lowerMessage.includes("gracias") || lowerMessage.includes("merci") || lowerMessage.includes("谢谢")) {
            response = dict["thanks"];
        }
        else {
            response = dict["default"];
        }

        await new Promise(resolve => setTimeout(resolve, 800))
        return Response.json({ response })
    } catch (error) {
        console.error("AI Chat Error:", error)
        return Response.json(
            { response: "I apologize, I'm having trouble processing your request. Please try again." },
            { status: 500 }
        )
    }
}



