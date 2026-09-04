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

  // Initialize Gemini AI Client lazily/safely
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('کلید GEMINI_API_KEY تنظیم نشده است.');
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

  // API Route: Smart Market Advisor for Tavana City
  app.post('/api/ai-assistant', async (req, res) => {
    try {
      const { prompt, context } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'لطفاً پرسش خود را وارد کنید.' });
      }

      const ai = getAiClient();
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

      const reply = response.text || 'متأسفانه پاسخی دریافت نشد.';
      return res.json({ reply });
    } catch (err: any) {
      console.error('Gemini AI error:', err);
      return res.status(500).json({
        error: 'خطا در ارتباط با دستیار هوشمند. لطفاً دوباره تلاش کنید.',
        details: err?.message,
      });
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
