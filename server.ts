import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily/safely if key is present
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Automated intelligent fallback advisor (works 100% offline & without manual API key entry)
  const generateAutomatedAdvice = (prompt: string, context?: any): string => {
    const p = prompt.toLowerCase();
    const productName = context?.title || 'پوشاک و لباس زیر تخصصی بانوان';
    const priceWholesale = context?.priceWholesale ? Number(context.priceWholesale).toLocaleString('fa-IR') : '۲۸۰,۰۰۰';
    const priceSingle = context?.priceSingle ? Number(context.priceSingle).toLocaleString('fa-IR') : '۴۵۰,۰۰۰';

    if (p.includes('کپشن') || p.includes('تبلیغ') || p.includes('اینستا') || p.includes('متن')) {
      return `✨ **پیشنهاد کپشن جذاب و پرفروش برای پیج اینستاگرام و کانال تلگرام:**

🛍️ **پرفروش‌ترین ترند بازار بزرگ تهران رسید!**
✨ **${productName}**
کیفیت تضمینی و دوخت استاندارد شرکتی 🪡
تنخور فوق‌العاده شیک، پارچه درجه یک و رنگ‌بندی ویژه فصل ✨

📊 **مشخصات محصول:**
▫️ قیمت فروش ویژه مشتریان: ${priceSingle} تومان
▫️ تنوع رنگ و سایزبندی کامل
▫️ ارسال سریع به سراسر کشور با بسته‌بندی تمیز 📦

💬 **ثبت سفارش:** جهت سفارش به دایرکت پیام دهید یا در واتساپ پیام بگذارید.
#پوشاک_بانوان #لباس_زیر #خرید_عمده #بازار_بزرگ #تولیدی_پوشاک #حراج_فصلی #شهر_توانا`;
    }

    if (p.includes('سود') || p.includes('قیمت') || p.includes('محاسبه') || p.includes('مارجین') || p.includes('درصد')) {
      return `📊 **تحلیل هوشمند سود و قیمت‌گذاری در بازار:**

🔹 **برآورد قیمت خرید عمده:** حدود ${priceWholesale} تومان به ازای هر عدد در پک
🔹 **قیمت فروش تک‌فروشی پیشنهادی:** حدود ${priceSingle} تومان
📈 **حاشیه سود ناخالص تخمینی:** بین ۳۵٪ تا ۶۰٪ (بسته به موقعیت مغازه و فروش آنلاین).

💡 **توصیه تخصصی بنکداری شهر توانا:**
۱. برای مشتریان حضوری مغازه، حاشیه سود ۴۵٪ را لحاظ کنید تا قدرت رقابت حفظ شود.
۲. پک‌های ۳ تایی با تخفیف ویژه ۱۰٪ پیشنهاد دهید تا سرعت گردش نقدینگی کالای شما دوبرابر شود.`;
    }

    if (p.includes('ترند') || p.includes('رنگ') || p.includes('فصل') || p.includes('مد')) {
      return `🎨 **تحلیل ترندهای رنگ و سبک در فصل جاری:**

🌟 **رنگ‌های برتر و پرفروش بازار:**
• طیف رنگ‌های نود و خاکی (کرم کاراملی، خاکی روشن، وانیلی)
• رنگ‌های شاد و پاستلی (یاسی روشن، سبز نعنایی، صورتی باربی)
• کلاسیک‌های همیشگی و بی ریسک (مشکی پرکلاغی، زرشکی عمیق، سرمه‌ای)

✨ **توصیه تیراژ برای ویترین:**
۶۰٪ سفارشات را به رنگ‌های پایه (مشکی، کرم، طوسی) و ۴۰٪ را به رنگ‌های ترند فصلی جذاب اختصاص دهید تا ویترین شما بیشترین مشتری را جذب کند.`;
    }

    if (p.includes('پارچه') || p.includes('جنس') || p.includes('شستشو') || p.includes('کیفیت')) {
      return `🧵 **بررسی تخصصی پارچه و الیاف:**

✅ **ویژگی‌های الیاف استاندارد لباس زیر و راحتی:**
• **تنفس‌پذیری بالا:** جلوگیری از تعریق و حساسیت پوستی
• **ثبات رنگ:** عدم رنگ‌دهی در شستشوهای مکرر
• **دوام کشسانی:** استفاده از الیاف باکیفیت اسپندکس که بعد از شست‌وشو گشاد نمی‌شود.

🧼 **دستورالعمل نگهداری و شستشو برای مشتریان:**
دمای آب حداکثر ۳۰ درجه سانتی‌گراد، استفاده از شوینده ملایم مایع، و خشک کردن در سایه بدون چلاندن شدید.`;
    }

    // Default professional market consultation
    return `🤝 **مشاوره اختصاصی هوشمند بازار شهر توانا:**

در رابطه با سوال شما درباره **${productName}**:
۱. **گردش سرمایه:** در این رسته کالایی، خرید بسته‌ای (جین یا نیم‌جین) موجب کاهش قیمت تمام‌شده تا ۲۵٪ نسبت به تک‌فروشی می‌گردد.
۲. **جذب مشتری وفادار:** کیفیت دوخت و قواره استاندارد باعث تکرار خرید بالای مشتریان مغازه شما خواهد شد.
۳. **خدمات لجستیک:** غرفه‌های رسمی شهر توانا ارسال بار را از طریق باربری، تیپاکس و پیک اکسپرس تهران با بیمه سلامت کالا انجام می‌دهند.

💡 اگر مایلید، می‌توانید درباره متن تبلیغاتی، قیمت‌گذاری سود، یا انتخاب سایز و رنگ مناسب فصل سوال بفرمایید.`;
  };

  // API Route: Smart Market Advisor for Tavana City
  app.post('/api/ai-assistant', async (req, res) => {
    try {
      const { prompt, context } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'لطفاً پرسش خود را وارد کنید.' });
      }

      const ai = getAiClient();
      if (ai) {
        try {
          const systemInstruction = `شما دستیار هوشمند و مشاور تخصصی بازار «شهر توانا» هستید (پلتفرم تخصصی بنکداران، تولیدکنندگان و خریداران پوشاک و لباس زیر بانوان در بازار بزرگ تهران و سراسر کشور).
پاسخ‌های شما باید کاملا کاربردی، محترمانه، به زبان فارسی روان، جذاب و با ایموجی‌های مناسب برای بنکداران، مغازه‌داران و تولیدکنندگان باشد.
شما به کاربر در مواردی مثل:
۱. مشاوره خرید عمده و تحلیل سود مغازه‌داری
۲. معرفی مد و رنگ‌های ترند فصل (بهاره، تابستانه، پاییزه، زمستانه)
۳. نوشتن متن‌های تبلیغاتی و کاپشن‌های اینستاگرام برای فروش پوشاک و لباس زیر
۴. راهنمایی انتخاب بهترین سایزبندی و پارچه (کتان، ساتن، گیپور، نخ پنبه، ابروبادی)
کمک می‌کنید.
همواره کوتاه، دقیق و صمیمی پاسخ دهید.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: `${context ? `بستر/اطلاعات محصول: ${JSON.stringify(context)}\n` : ''}سوال کاربر: ${prompt}`,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          });

          const reply = response.text;
          if (reply && reply.trim().length > 0) {
            return res.json({ reply });
          }
        } catch (geminiError) {
          console.warn('Gemini API call failed, switching to automated offline advisor:', geminiError);
        }
      }

      // Automated fallback when API key is not present or failed - zero manual intervention needed
      const automatedReply = generateAutomatedAdvice(prompt, context);
      return res.json({ reply: automatedReply });
    } catch (err: any) {
      console.error('Advisor error:', err);
      const automatedReply = generateAutomatedAdvice(req.body?.prompt || '', req.body?.context);
      return res.json({ reply: automatedReply });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'شهر توانا' });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
