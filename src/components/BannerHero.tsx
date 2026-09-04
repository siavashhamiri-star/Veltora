import React from 'react';
import { Building, ShieldCheck, Truck, Percent, Sparkles, Store, CheckCircle2 } from 'lucide-react';

interface BannerHeroProps {
  onOpenVendors: () => void;
  onOpenCalculator: () => void;
  activeTradeMode: 'all' | 'wholesale' | 'retail';
  setActiveTradeMode: (mode: 'all' | 'wholesale' | 'retail') => void;
}

export const BannerHero: React.FC<BannerHeroProps> = ({
  onOpenVendors,
  onOpenCalculator,
  activeTradeMode,
  setActiveTradeMode,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-950 text-white p-6 md:p-10 shadow-2xl mb-8 border border-indigo-800/60">
      {/* Background Decorative Graphic Spheres */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-400/10 border border-amber-400/40 text-amber-300 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>بزرگترین شبکه تجاری و خرید مستقیم پوشاک و لباس زیر بانوان</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight md:leading-snug text-white font-serif">
          بازار تخصصی بنکداران، تولیدکنندگان و تک‌فروشان <span className="text-amber-400">«شهر توانا»</span>
        </h2>

        {/* Subtitle */}
        <p className="text-indigo-200 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
          دسترسی مستقیم و بدون واسطه به مجهزترین تولیدی‌های مانتو، لباس مجلسی، اسپرت و ست‌های لباس زیر و خواب. 
          قیمت‌های جینی و عمده بازار بزرگ تهران را مقایسه کنید و آنلاین استعلام بگیرید.
        </p>

        {/* Trade Mode Toggle (عمده / تک / همه) */}
        <div className="inline-flex bg-indigo-950/80 p-1.5 rounded-2xl border border-indigo-700/60 shadow-lg">
          <button
            onClick={() => setActiveTradeMode('all')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTradeMode === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-indigo-200 hover:text-white'
            }`}
          >
            همه اقلام بازار
          </button>
          <button
            onClick={() => setActiveTradeMode('wholesale')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTradeMode === 'wholesale'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-indigo-200 hover:text-white'
            }`}
          >
            <Building className="w-4 h-4 text-amber-300" />
            فقط خرید عمده (جینی)
          </button>
          <button
            onClick={() => setActiveTradeMode('retail')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTradeMode === 'retail'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-indigo-200 hover:text-white'
            }`}
          >
            خرید تک‌فروشی
          </button>
        </div>

        {/* Key Platform Value Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto text-xs">
          <div className="bg-indigo-900/50 border border-indigo-700/40 rounded-xl p-3 flex items-center gap-2.5 text-right">
            <div className="bg-amber-400/20 text-amber-300 p-2 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">تولیدی‌های تاییدشده</p>
              <p className="text-[10px] text-indigo-300">اصالت و ضمانت بنکدار</p>
            </div>
          </div>

          <div className="bg-indigo-900/50 border border-indigo-700/40 rounded-xl p-3 flex items-center gap-2.5 text-right">
            <div className="bg-amber-400/20 text-amber-300 p-2 rounded-lg">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">قیمت عمده (جینی)</p>
              <p className="text-[10px] text-indigo-300">تخفیف تا ۴۵٪ روی جين</p>
            </div>
          </div>

          <div className="bg-indigo-900/50 border border-indigo-700/40 rounded-xl p-3 flex items-center gap-2.5 text-right">
            <div className="bg-amber-400/20 text-amber-300 p-2 rounded-lg">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">ارسال باربری & تیپاکس</p>
              <p className="text-[10px] text-indigo-300">تحویل سریع سراسری</p>
            </div>
          </div>

          <div className="bg-indigo-900/50 border border-indigo-700/40 rounded-xl p-3 flex items-center gap-2.5 text-right">
            <div className="bg-amber-400/20 text-amber-300 p-2 rounded-lg">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">ارتباط مستقیم واتساپ</p>
              <p className="text-[10px] text-indigo-300">استعلام تلفنی و پیام</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
