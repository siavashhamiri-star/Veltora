import React, { useState } from 'react';
import { UserProfile, VipLevel } from '../types';
import { X, Sparkles, Crown, Zap, ShieldCheck, MessageCircle, FileText, Star, Award, ShieldAlert } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUpgradeToPremium: (level: VipLevel) => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpgradeToPremium,
}) => {
  if (!isOpen) return null;

  const [paymentMode, setPaymentMode] = useState<'lumpSum' | 'monthly'>('lumpSum');
  const [selectedPlanPeriod, setSelectedPlanPeriod] = useState<'1m' | '3m' | '6m' | '12m' | '24m'>('24m');

  const plans = {
    '1m': {
      title: 'اشتراک ۱ ماهه',
      vipLevel: 1 as VipLevel,
      badgeName: 'VIP 1 - برنزی',
      priceLump: '۱۹۹,۰۰۰',
      priceMonthly: '۱۹۹,۰۰۰',
      discountBadge: '',
      color: 'from-amber-700 to-amber-900',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    '3m': {
      title: 'اشتراک ۳ ماهه',
      vipLevel: 2 as VipLevel,
      badgeName: 'VIP 2 - نقره‌ای',
      priceLump: '۴۹۰,۰۰۰',
      priceMonthly: '۱۶۳,۰۰۰',
      discountBadge: '۳۵٪ تخفیف',
      color: 'from-slate-600 to-slate-800',
      badgeBg: 'bg-slate-200 text-slate-900 border-slate-300',
    },
    '6m': {
      title: 'اشتراک ۶ ماهه',
      vipLevel: 3 as VipLevel,
      badgeName: 'VIP 3 - طلایی',
      priceLump: '۸۹۰,۰۰۰',
      priceMonthly: '۱۴۸,۰۰۰',
      discountBadge: '۴۰٪ تخفیف',
      color: 'from-amber-500 to-amber-700',
      badgeBg: 'bg-amber-300 text-slate-950 border-amber-400 font-extrabold',
    },
    '12m': {
      title: 'اشتراک ۱ ساله',
      vipLevel: 4 as VipLevel,
      badgeName: 'VIP 4 - پلاتینیوم',
      priceLump: '۱,۲۹۰,۰۰۰',
      priceMonthly: '۱۰۷,۰۰۰',
      discountBadge: '۴۵٪ تخفیف',
      color: 'from-indigo-600 to-purple-800',
      badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300 font-extrabold',
    },
    '24m': {
      title: 'اشتراک ۲ ساله (بالاترین سطح)',
      vipLevel: 5 as VipLevel,
      badgeName: 'VIP 5 - الماس ویژه',
      priceLump: '۱,۹۹۰,۰۰۰',
      priceMonthly: '۸۲,۰۰۰',
      discountBadge: '۵۵٪ تخفیف ویژه VIP 5',
      color: 'from-purple-700 via-indigo-900 to-slate-950',
      badgeBg: 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 border-amber-300 font-black shadow-sm',
    },
  };

  const currentPlan = plans[selectedPlanPeriod];

  const handleActivate = () => {
    onUpgradeToPremium(currentPlan.vipLevel);
    alert(`تبریک! حساب شما با موفقیت به سطح ویژه «${currentPlan.badgeName}» ارتقا یافت و نشان اختصاصی در پروفایل شما درج شد.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex justify-center items-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative my-auto border border-slate-200">
        
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-purple-700 via-indigo-800 to-slate-950 text-amber-300 p-3 rounded-2xl shadow-lg ring-2 ring-purple-300/40">
              <Crown className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">ارتقا به حساب VIP (سطوح ۱ تا ۵)</h3>
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
                  درج نشان اختصاصی در پروفایل
                </span>
              </div>
              <p className="text-xs text-slate-500">خرید اشتراک دوره و فعال‌سازی تگ‌های معتبر VIP 1 تا VIP 5 در حساب کاربری</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Payment Mode Selector (Lump-sum vs Monthly) */}
        <div className="flex justify-center mb-4">
          <div className="bg-slate-100 p-1 rounded-2xl flex text-xs font-bold w-full max-w-md border border-slate-200">
            <button
              onClick={() => setPaymentMode('lumpSum')}
              className={`flex-1 py-2 px-3 rounded-xl transition text-center ${
                paymentMode === 'lumpSum'
                  ? 'bg-indigo-900 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              پرداخت یکجای دوره (تخفیف کامل)
            </button>
            <button
              onClick={() => setPaymentMode('monthly')}
              className={`flex-1 py-2 px-3 rounded-xl transition text-center ${
                paymentMode === 'monthly'
                  ? 'bg-indigo-900 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              پرداخت اقساطی ماهانه VIP
            </button>
          </div>
        </div>

        {/* 5 VIP Tier Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5 text-xs font-bold">
          {(['1m', '3m', '6m', '12m', '24m'] as const).map((key) => {
            const p = plans[key];
            const isSelected = selectedPlanPeriod === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedPlanPeriod(key)}
                className={`p-2.5 rounded-2xl border transition text-center relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-purple-500 ring-2 ring-purple-400 shadow-md scale-105'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {p.discountBadge && (
                  <span className="absolute -top-2.5 right-1/2 translate-x-1/2 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full shadow whitespace-nowrap">
                    {p.discountBadge}
                  </span>
                )}
                
                <div className="text-[11px] font-black">{p.title}</div>
                
                <div className={`mt-1 text-[10px] py-0.5 px-1 rounded-md border ${p.badgeBg}`}>
                  {p.badgeName}
                </div>

                <div className="text-amber-400 font-extrabold text-xs mt-1.5">
                  {paymentMode === 'lumpSum' ? `${p.priceLump} ت` : `${p.priceMonthly} ت/ماه`}
                </div>
              </button>
            );
          })}
        </div>

        {/* Badge & Features Showcase */}
        <div className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white p-4 rounded-2xl border border-purple-500/30 mb-5 space-y-3 text-xs shadow-inner">
          <div className="flex items-center justify-between border-b border-purple-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-300" />
              <div>
                <span className="text-slate-300 text-[11px]">سطح انتخابی شما:</span>
                <h4 className="font-black text-amber-300 text-sm">{currentPlan.badgeName}</h4>
              </div>
            </div>

            <div className={`px-3 py-1 rounded-full text-xs font-black border ${currentPlan.badgeBg}`}>
              تگ اختصاصی پروفایل {currentPlan.badgeName.split(' - ')[0]}
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-slate-200">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                دستیار هوشمند تحلیلی بازار (Gemini AI):
              </span>
              <span className="font-bold text-emerald-400">نامحدود کل دوره</span>
            </div>

            <div className="flex items-center justify-between text-slate-200">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                نشان رسمی معتبر در پروفایل کاربری:
              </span>
              <span className="font-extrabold text-amber-300">{currentPlan.badgeName}</span>
            </div>

            <div className="flex items-center justify-between text-slate-200">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-300" />
                تولید کپشن اینستاگرام + محاسبه سود جینی:
              </span>
              <span className="font-bold text-emerald-400">فعال پیشرفته</span>
            </div>

            <div className="flex items-center justify-between text-slate-200">
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-amber-300" />
                پاسخگویی بنکداران بازار:
              </span>
              <span className="font-bold text-amber-300">
                {currentPlan.vipLevel === 5 ? 'اولیت مطلق VIP 5 الماس' : `اولویت ویژه ${currentPlan.badgeName.split(' - ')[0]}`}
              </span>
            </div>
          </div>
        </div>

        {/* Price & Activation Button */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            <p className="text-xs text-slate-400">
              {paymentMode === 'lumpSum' ? 'مبلغ کل یکجا:' : 'مبلغ پرداختی ماهانه:'}
            </p>
            <p className="text-xl font-black text-amber-400">
              {paymentMode === 'lumpSum' ? currentPlan.priceLump : currentPlan.priceMonthly} <span className="text-xs font-normal text-slate-300">تومان</span>
            </p>
          </div>

          <button
            onClick={handleActivate}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4" />
            <span>فعال‌سازی نشان {currentPlan.badgeName}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
