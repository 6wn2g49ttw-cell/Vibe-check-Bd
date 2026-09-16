const { Telegraf } = require('telegraf');
const bot = new Telegraf('YOUR_BOT_TOKEN');

// ইউজার যখন /buy বা পেমেন্ট করতে চাবে
bot.command('buy', async (ctx) => {
    await ctx.replyWithInvoice({
        title: 'চ্যাট আনলক প্রিমিয়াম',
        description: 'সায়মা প্রিয়ার সাথে চ্যাট আনলক করতে ৫টি স্টার পে করুন।',
        payload: 'chat_unlock_payload',
        provider_token: '', // টেলিগ্রাম স্টারস (XTR) এর ক্ষেত্রে এই টোকেনটি খালি বা ফাঁকা রাখতে হয়
        currency: 'XTR', // কারেন্সি অবশ্যই XTR দিতে হবে (স্টার্সের জন্য)
        prices: [
            { label: 'Chat Access', amount: 5 } // ৫টি স্টার (amount: 5)
        ]
    });
});

// পেমেন্টের আগের চেকআউট প্রসেস অনুমোদন করা
bot.on('pre_checkout_query', async (ctx) => {
    try {
        await ctx.answerPreCheckoutQuery(true);
    } catch (e) {
        console.log(e);
    }
});

// পেমেন্ট সফল হওয়ার পরের কাজ (এখানে ডাটাবেজ আপডেট বা চ্যাট আনলক হবে)
bot.on('successful_payment', async (ctx) => {
    const paymentInfo = ctx.message.successful_payment;
    console.log("Payment Successful:", paymentInfo);
    
    await ctx.reply("ধন্যবাদ! আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। এখন আপনি আনলিমিটেড চ্যাট করতে পারবেন। 🎉");
});

bot.launch();
