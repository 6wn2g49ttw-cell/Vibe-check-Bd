export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, chatUserName } = req.body;
    
    // সরাসরি এখানে আপনার জেমিনি এপিআই কি বসিয়ে দিন (কোড দুটির মাঝখানে)
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSy...আপনার_আসল_এপিআই_কি_এখানে_বসান";

    if (!apiKey) {
        return res.status(500).json({ error: 'API Key not configured' });
    }

    try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const promptText = `You are a friendly Bangladeshi person named "${chatUserName || 'Friend'}" chatting on an anonymous local dating and chat app. Reply in natural, conversational Bengali (or Banglish style like local chat). Keep it short, engaging, and realistic. IMPORTANT: Always reply to the user's message and end your response with a natural follow-up question to keep the conversation going. User says: "${message}"`;

        const apiResponse = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });

        const data = await apiResponse.json();
        let reply = "আচ্ছা, বিষয়টি বেশ ইন্টারেস্টিং! আপনার সম্পর্কে আরও কিছু বলুন তো?";

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            reply = data.candidates[0].content.parts[0].text;
        }

        return res.status(200).json({ reply });
    } catch (error) {
        return res.status(500).json({ error: 'AI processing failed.' });
    }
}
