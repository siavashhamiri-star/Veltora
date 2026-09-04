import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  ShoppingCart, 
  Sparkles, 
  Heart, 
  Store, 
  Search, 
  PhoneCall, 
  Menu, 
  X,
  BadgeCheck,
  User,
  Crown,
  Globe
} from 'lucide-react';
import { QuoteCartItem, UserProfile } from '../types';

interface HeaderProps {
  onOpenAddModal: () => void;
  onOpenQuoteCart: () => void;
  onOpenAIModal: () => void;
  onOpenVendorsModal: () => void;
  onOpenCalculator: () => void;
  onOpenAuthModal: () => void;
  onOpenUpgradeModal: () => void;
  currentUser: UserProfile | null;
  quoteCart: QuoteCartItem[];
  wishlistCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAddModal,
  onOpenQuoteCart,
  onOpenAIModal,
  onOpenVendorsModal,
  onOpenCalculator,
  onOpenAuthModal,
  onOpenUpgradeModal,
  currentUser,
  quoteCart,
  wishlistCount,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = quoteCart.reduce((acc, item) => acc + item.quantityPacks, 0);

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-xl sticky top-0 z-40 border-b border-indigo-700/50">
      {/* Ecosystem & FBNM Title Bar */}
      <div className="bg-slate-950 text-amber-300 text-[11px] font-bold py-1 px-4 border-b border-indigo-900/60 flex justify-between items-center overflow-x-auto whitespace-nowrap">
        <div className="container mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-white font-extrabold">اکوسیستم آفرینش</span>
            <span className="text-amber-400">|</span>
            <span className="text-amber-200">شهر جدید نیومتاورسیتی جهان</span>
            <span className="text-amber-400">|</span>
            <span className="bg-amber-400 text-slate-950 px-2 py-0.2 rounded font-black text-[10px]">توان استیج FBNM</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-300">
            <span className="text-indigo-300">میزبانی و هاستینگ ابری:</span>
            <a
              href="https://sevenho.st"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-900/80 hover:bg-indigo-800 text-amber-300 border border-indigo-700 px-2 py-0.5 rounded transition flex items-center gap-1 font-semibold"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>سون هاست (SevenHosts)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Top Banner Bar */}
      <div className="bg-indigo-950/80 text-indigo-200 text-xs py-1.5 px-4 border-b border-indigo-800/40">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-medium">
              <BadgeCheck className="w-3.5 h-3.5 text-amber-400" /> راسته تخصصی عمده‌فروشان لباس زیر & پوشاک بانوان
            </span>
            <span className="hidden md:inline">ارسال سراسری سفارشات جینی از بازار بزرگ تهران</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* VIP Upgrade Badge */}
            <button
              onClick={onOpenUpgradeModal}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full font-black flex items-center gap-1 transition shadow"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>
                {currentUser?.plan === 'premium'
                  ? `نشان VIP ${currentUser.vipLevel || 5}`
                  : 'خرید اشتراک VIP (سطوح ۱ تا ۵)'}
              </span>
            </button>

            <span className="text-indigo-700">|</span>

            {/* User Profile Button */}
            <button
              onClick={onOpenAuthModal}
              className="hover:text-amber-300 transition flex items-center gap-1 font-semibold text-white bg-indigo-900/80 px-2.5 py-0.5 rounded-full border border-indigo-700"
            >
              <User className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentUser ? currentUser.name : 'ورود / ثبت‌نام (تلفن/ایمیل)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-amber-400 to-amber-500 text-indigo-950 p-2.5 rounded-2xl shadow-lg flex items-center justify-center ring-2 ring-amber-300/30">
              <Building2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-white font-serif">
                  شهر توانا
                </h1>
                <span className="bg-amber-400 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                  عمده و تک پوشاک بانوان
                </span>
              </div>
              <p className="text-xs text-indigo-200/90 font-light hidden sm:block">
                بازار تخصصی لباس زیر، بادی، ست خواب، مانتو و مجلسی
              </p>
            </div>
          </div>

          {/* Quick Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی سوتین، شورت، بادی، گن، مانتو و..."
              className="w-full bg-indigo-950/60 border border-indigo-600/50 rounded-xl py-2 px-4 pr-10 text-sm text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-amber-400/80 transition"
            />
            <Search className="w-4 h-4 text-indigo-300 absolute right-3 top-3" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-2.5 text-indigo-400 hover:text-white text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAIModal}
              className="bg-purple-600/80 hover:bg-purple-600 border border-purple-400/40 text-purple-100 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
              title="جایگاه دستیار هوشمند و تحلیل سود بازار"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>مشاور هوشمند (AI)</span>
            </button>

            {/* Add Product / Booth */}
            <button
              onClick={onOpenAddModal}
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-3.5 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ثبت محصول جدید</span>
            </button>

            {/* Quote Cart Button */}
            <button
              onClick={onOpenQuoteCart}
              className="relative bg-indigo-800/80 hover:bg-indigo-700 border border-indigo-600/60 text-white p-2.5 rounded-xl transition flex items-center justify-center"
              title="سبد استعلام پیش‌فاکتور عمده"
            >
              <ShoppingCart className="w-5 h-5 text-indigo-100" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-indigo-200 hover:text-white p-2 rounded-lg bg-indigo-950/50 border border-indigo-700/50"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 lg:hidden relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی مدل ست زیر، بادی، لباس خواب، مانتو و..."
            className="w-full bg-indigo-950/70 border border-indigo-600/50 rounded-xl py-2 px-4 pr-10 text-sm text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
          <Search className="w-4 h-4 text-indigo-300 absolute right-3 top-3" />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-950 border-t border-indigo-800 p-4 space-y-3 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenAuthModal(); }}
            className="w-full bg-indigo-800 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4 text-amber-300" />
            <span>{currentUser ? currentUser.name : 'ورود / ثبت‌نام با تلفن یا ایمیل'}</span>
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenUpgradeModal(); }}
            className="w-full bg-amber-400 text-slate-950 font-black py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow"
          >
            <Crown className="w-4 h-4" /> ارتقا به حساب پریمیوم VIP (امکانات ویژه)
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenAIModal(); }}
            className="w-full bg-purple-900/80 hover:bg-purple-800 border border-purple-600 text-purple-100 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" /> مشاور هوشمند بازار (Gemini AI)
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenAddModal(); }}
            className="w-full bg-indigo-800 text-indigo-100 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> ثبت محصول در غرفه
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenQuoteCart(); }}
            className="w-full bg-indigo-900 text-white py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4 text-amber-300" /> سبد استعلام عمده ({totalCartCount} جين)
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenCalculator(); }}
            className="w-full bg-indigo-900/90 text-amber-300 border border-amber-500/30 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 font-semibold"
          >
            <Sparkles className="w-4 h-4" /> محاسبه‌گر سود و تخفیف جینی
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenVendorsModal(); }}
            className="w-full bg-indigo-900 text-indigo-200 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
          >
            <Store className="w-4 h-4" /> لیست بنکداران و تولیدی‌ها
          </button>
        </div>
      )}
    </header>
  );
};

