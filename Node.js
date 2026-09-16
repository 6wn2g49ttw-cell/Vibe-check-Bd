const { Telegraf } = require('telegraf');
const bot = new Telegraf('YOUR_BOT_TOKEN');

// ১. /start দিলে বটের ডিটেইলস এবং মিনি অ্যাপ ওপেন করার বাটন দেখাবে
bot.start(async (ctx) => {
    const welcomeText = `👋 **Vibe Check BD**-তে স্বাগতম!\n\n` +
        `এখানে আপনি পেয়ে যাবেন আকর্ষণীয় সব রিয়েল প্রোফাইল এবং চ্যাট করার দারুণ সুযোগ।\n\n` +
        `⚠️ **নিয়মাবলী:**\n` +
        `• মিনি অ্যাপ ব্যবহার করতে এবং লগইন করতে প্রথমে **৫০ টাকার (Telegram Stars)** পেমেন্ট করতে হবে।\n` +
        `• পেমেন্ট সফল হওয়ার পরই আপনি আপনার ইনফরমেশন দিয়ে অ্যাপে প্রবেশ করতে পারবেন।`;

    await ctx.reply(welcomeText, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "💳 ৫০ টাকা পেমেন্ট করুন (Pay 50 BDT Stars)", callback_data: "pay_50_stars" }],
                [{ text: "🚀 মিনি অ্যাপ ওপেন করুন", web_app: { url: "https://vibe-check-bd.vercel.app" } }]
            ]
        }
    });
});

// ২. ইউজার পেমেন্ট বাটনে ক্লিক করলে ইনভয়েস পাঠানো
bot.action('pay_50_stars', async (ctx) => {
    try {
        await ctx.answerCbQuery();
        // টেলিগ্রাম স্টারস (XTR) এর মাধ্যমে ইনভয়েস পাঠানো
        // (৫০ টাকার সমপরিমাণ বা আপনার নির্ধারিত স্টার সংখ্যা এখানে বসাতে পারেন, যেমন ২৫টি স্টার)
        await ctx.replyWithInvoice({
            title: 'Vibe Check BD - VIP Access',
            description: 'মিনি অ্যাপে লগইন এবং চ্যাট ফিচার আনলক করতে পেমেন্ট সম্পন্ন করুন।',
            payload: 'vip_login_access',
            provider_token: '', // টেলিগ্রাম স্টারস (XTR) এর জন্য এটি খালি থাকবে
            currency: 'XTR',
            prices: [
                { label: 'VIP Login Access', amount: 25 } // ২৫টি স্টার (টেলিগ্রাম স্টার হিসেবে ৫০ টাকার কাছাকাছি ভ্যালু)
            ]
        });
    } catch (error) {
        console.log("Invoice Error:", error);
        await ctx.reply("দুঃখিত, এই মুহূর্তে ইনভয়েস তৈরি করা যাচ্ছে না। আবার চেষ্টা করুন।");
    }
});

// ৩. পেমেন্টের আগের চেকআউট অনুমোদন
bot.on('pre_checkout_query', async (ctx) => {
    await ctx.answerPreCheckoutQuery(true);
});

// ৪. পেমেন্ট সফল হওয়ার পর লগইন ও মিনি অ্যাপের অ্যাক্সেস দেওয়া
bot.on('successful_payment', async (ctx) => {
    await ctx.reply(
        "🎉 অভিনন্দন! আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। এখন আপনি নিচে ক্লিক করে আপনার ইনফরমেশন দিয়ে মিনি অ্যাপে লগইন করতে পারবেন:",
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "🔐 এখন লগইন করুন (Open Mini App)", web_app: { url: "https://vibe-check-bd.vercel.app" } }]
                ]
            }
        }
    );
});

bot.launch();
