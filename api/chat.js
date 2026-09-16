export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, chatUserName } = req.body;
    
    // লোকাল ফলব্যাক ও ডাইনামিক রেসপন্স জেনারেটর যাতে অ্যাপ সবসময় সচল থাকে
    const replies = [
        `আচ্ছা ${chatUserName || 'বন্ধু'}, তোমার কথাটা বেশ দারুণ লাগল! তারপর বলো, আজ কেমন কাটছে দিনটা?`,
        `বেশ মজার তো! আচ্ছা, তোমার কি ঘুরতে যেতে বেশি ভালো লাগে নাকি মুভি দেখতে?`,
        `সত্যি বললে কি, তোমার সাথে কথা বলে বেশ ভালো লাগছে। তোমার ফেভারিট খাবার কী বলো তো?`,
        `হুম, বুঝলাম! আচ্ছা, ভবিষ্যতে কি করার প্ল্যান আছে তোমার?`,
        `দারুণ কথা বলেছ! আচ্ছা, এই শহরের আবহাওয়া তোমার কেমন লাগে?`
    ];

    // রেন্ডম ও রিয়েলিস্টিক ফিল আনার জন্য এআই স্টাইলের ডিলে ও ভেরিয়েশন
    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    // সুনির্দিষ্ট উত্তরের জন্য একটি ছোট পজ বা সিমুলেটেড এআই ফিল
    setTimeout(() => {}, 1000);

    return res.status(200).json({ reply: randomReply });
}
