export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // আপনার চাহিদা অনুযায়ী নির্ধারিত একক ও চূড়ান্ত রিপ্লাই
    const fixedReply = "আপনার WhatsApp নম্বর দিন ফ্রি হয়ে যোগাযোগ করব";

    return res.status(200).json({ reply: fixedReply });
}
