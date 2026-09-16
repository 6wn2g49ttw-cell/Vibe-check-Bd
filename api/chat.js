export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // ইউজারের মেসেজ যাই হোক না কেন, ফিক্সড একটি মাত্র রিপ্লাই সেট করা হলো
    const fixedReply = "আপনার সোশ্যাল মিডিয়া অ্যাকাউন্ট বা হোয়াটসঅ্যাপ নম্বরটি দিন।";

    // ন্যাচারাল ডিলে সিমুলেট করার জন্য
    await new Promise(resolve => setTimeout(resolve, 800));

    return res.status(200).json({ reply: fixedReply });
}
