const { Telegraf } = require('telegraf');
const bot = new Telegraf('YOUR_BOT_TOKEN');

// ইউজার যখনই /start কমান্ড দেবে
bot.start(async (ctx) => {
    try {
        // সাথে সাথে পেমেন্টের ইনভয়েস পাঠিয়ে দেওয়া
        await ctx.replyWithInvoice({
            title: 'ভিআইপি অ্যাক্সেস (Vibe Check BD)',
            description: 'অ্যাপে প্রবেশ করতে এবং চ্যাট ফিচার আনলক করতে ৫টি স্টার পে করুন।',
            payload: 'start_payment_payload',
            provider_token: '', // টেলিগ্রাম স্টারস (XTR) এর ক্ষেত্রে এটি অবশ্যই খালি রাখতে হবে
            currency: 'XTR', // কারেন্সি আবশ্যিকভাবেই XTR দিতে হবে
            prices: [
                { label: 'VIP Access', amount: 5 } // ৫টি স্টার (আপনার ইচ্ছমতো অ্যামাউন্ট দিতে পারেন)
            ]
        });
    } catch (error) {
        console.log("Start Invoice Error:", error);
        await ctx.reply("দুঃখিত, এই মুহূর্তে পেমেন্ট ইনভয়েস তৈরি করা যাচ্ছে না। একটু পর আবার চেষ্টা করুন।");
    }
});

// পেমেন্টের আগের চেকআউট অনুমোদন
bot.on('pre_checkout_query', async (ctx) => {
    await ctx.answerPreCheckoutQuery(true);
});

// পেমেন্ট সফল হওয়ার পর ইউজারকে মিনি অ্যাপ ব্যবহারের লিংক বা মেসেজ পাঠানো
bot.on('successful_payment', async (ctx) => {
    const paymentInfo = ctx.message.successful_payment;
    console.log("Payment Successful:", paymentInfo);
    
    await ctx.reply("ধন্যবাদ! আপনার পেমেন্ট সফল হয়েছে। এখন আপনি নিচের বাটন থেকে আমাদের মিনি অ্যাপে প্রবেশ করে আনলিমিটেড চ্যাট করতে পারবেন। 🎉", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "🚀 মিনি অ্যাপ ওপেন করুন", web_app: { url: "https://vibe-check-bd.vercel.app" } }]
            ]
        }
    });
});

bot.launch();
