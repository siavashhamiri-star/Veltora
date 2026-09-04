import React, { useState } from 'react';
import { Product, UserProfile } from '../types';
import { X, Sparkles, Send, Bot, User, RefreshCw, Crown, Zap, FileText } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductContext?: Product | null;
  currentUser?: UserProfile | null;
  onOpenUpgradeModal?: () => void;
  onIncrementAiCount?: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  initialProductContext = null,
  currentUser = null,
  onOpenUpgradeModal,
  onIncrementAiCount,
}) => {
  if (!isOpen) return null;

  const userPlan = currentUser?.plan || 'free';
  const dailyCount = currentUser?.dailyAiQueriesCount || 0;
  const isFreeLimitReached = userPlan === 'free' && dailyCount >= 3;

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: initialProductContext
        ? `سلام! من مشاور هوشمند بازار «شهر توانا» (Gemini AI) هستم. درباره محصول «${initialProductContext.name}» (قیمت عمده: ${initialProductContext.priceWholesale.toLocaleString('fa-IR')} تومان) چه سوالی دارید؟ برای راهنمایی فروش، تولید کپشن اینستاگرام یا تحلیل سود در خدمت شما هستم.`
        : `سلام! خوش آمدید به دستیار هوشمند بازار «شهر توانا». من پاسخگوی سوالات شما درباره ترندهای فصل، تحلیل سود مغازه‌داری، حاشیه سود لباس زیر و پوشاک بانوان، و تولید کپشن‌های پرفروش اینستاگرام هستم.`,
    },
  ]);

  const quickPrompts = [
    '📱 تولید کپشن جذاب اینستاگرام برای این محصول',
    '📊 محاسبه حاشیه سود جینی و تک‌فروشی مغازه',
    '🎨 پرفروش‌ترین سایزبندی و رنگ‌های لباس زیر زنانه',
    '🧵 بهترین جنس پارچه‌ها برای فصل گرم سال',
  ];

  const handleSend = async (customText?: string) => {
    const promptToSend = customText || input;
    if (!promptToSend.trim() || loading) return;

    if (isFreeLimitReached) {
      if (onOpenUpgradeModal) {
        onOpenUpgradeModal();
      } else {
        alert('سقف ۳ سوال رایگان امروز شما تمام شده است. لطفاً برای سوالات نامحدود، حساب خود را به پریمیوم VIP ارتقا دهید.');
      }
      return;
    }

    const userMsg: Message = { sender: 'user', text: promptToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    if (onIncrementAiCount) {
      onIncrementAiCount();
    }

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          context: initialProductContext,
          userPlan,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: data.error || 'متأسفانه پاسخی دریافت نشد.' },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'خطا در ارتباط با سرور هوشمند. لطفاً اتصال اینترنت را بررسی فرمایید.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex justify-center items-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl h-[85vh] shadow-2xl flex flex-col justify-between overflow-hidden relative my-auto border border-slate-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-indigo-950 text-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="bg-amber-400 p-2 rounded-xl text-slate-950 shadow-sm">
              <Sparkles className="w-5 h-5 text-indigo-950 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                <span>جایگاه هوش مصنوعی بازار (Gemini AI)</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
                  {userPlan === 'premium' ? 'عضویت پریمیوم VIP' : `رایگان: ${dailyCount}/۳ سوال`}
                </span>
              </h3>
              <p className="text-[11px] text-purple-200">مشاور تخصصی مد، تولید کپشن فروش و تحلیل سود بازار پوشاک</p>
            </div>
          </div>
          <button onClick={onClose} className="text-indigo-200 hover:text-white p-1 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Tier Status Banner */}
        <div className="bg-purple-950/90 text-purple-100 text-xs px-4 py-2 flex flex-wrap justify-between items-center gap-2 border-b border-purple-800">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-300" />
            <span>
              {userPlan === 'premium' 
                ? 'شما کاربر ویژه پریمیوم هستید و دسترسی نامحدود به هوش مصنوعی دارید.' 
                : `حالت معمولی: ${3 - dailyCount} سوال رایگان باقی‌مانده امروز`}
            </span>
          </div>

          {userPlan === 'free' && onOpenUpgradeModal && (
            <button
              onClick={onOpenUpgradeModal}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-3 py-1 rounded-lg text-[11px] transition shadow flex items-center gap-1"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>ارتقا به پریمیوم نامحدود</span>
            </button>
          )}
        </div>

        {/* Chat Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60 text-xs">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-indigo-700 text-white'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl max-w-[82%] leading-relaxed whitespace-pre-wrap shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-amber-400 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-purple-700 font-semibold p-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>دستیار هوشمند در حال تحلیل و پاسخ‌دهی است...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 overflow-x-auto flex gap-2 no-scrollbar text-[11px]">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              disabled={loading}
              className="bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-900 border border-slate-200 rounded-xl px-3 py-1.5 whitespace-nowrap transition shadow-sm font-medium shrink-0"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              isFreeLimitReached
                ? 'سقف ۳ سوال رایگان تمام شده. برای ادامه حساب خود را ارتقا دهید.'
                : 'سوال خود را بپرسید یا درخواست کپشن اینستاگرام دهید...'
            }
            disabled={loading || isFreeLimitReached}
            className="flex-1 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 disabled:bg-slate-100"
          />

          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim() || isFreeLimitReached}
            className="bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white p-2.5 rounded-xl transition shadow flex items-center justify-center"
          >
            <Send className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

