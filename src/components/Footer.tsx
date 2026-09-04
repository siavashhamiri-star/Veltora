import React from 'react';
import { Building2, ShieldCheck, Truck, Phone, Mail, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-slate-300 pt-12 pb-6 border-t border-indigo-900/50 mt-16 text-xs">
      <div className="container mx-auto px-4 space-y-8">
        
        {/* Top Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-indigo-900/60 text-center">
          <div className="space-y-1">
            <Building2 className="w-6 h-6 text-amber-400 mx-auto" />
            <h4 className="font-bold text-white text-xs">مستقیم از بنکداران</h4>
            <p className="text-[11px] text-slate-400">حذف واسطه و قیمت کف بازار</p>
          </div>

          <div className="space-y-1">
            <ShieldCheck className="w-6 h-6 text-amber-400 mx-auto" />
            <h4 className="font-bold text-white text-xs">تولیدی‌های تاییدشده</h4>
            <p className="text-[11px] text-slate-400">تضمین کیفیت پارچه و دوخت</p>
          </div>

          <div className="space-y-1">
            <Truck className="w-6 h-6 text-amber-400 mx-auto" />
            <h4 className="font-bold text-white text-xs">ارسال باربری سراسری</h4>
            <p className="text-[11px] text-slate-400">تحویل سریع به تمام شهرها</p>
          </div>

          <div className="space-y-1">
            <Phone className="w-6 h-6 text-amber-400 mx-auto" />
            <h4 className="font-bold text-white text-xs">پشتیبانی و استعلام آنلاین</h4>
            <p className="text-[11px] text-slate-400">پاسخگویی سریع بنکداران</p>
          </div>
        </div>

        {/* Bazaar Merchants Philosophy & Privacy Guarantee Card */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-indigo-900/40 border border-amber-400/30 p-4 rounded-2xl text-right space-y-2">
          <div className="flex items-center gap-2 font-black text-amber-300 text-xs">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>تعهد «شهر توانا» به اهالی و بنکداران بازار سنتی ایران</span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed font-light">
            «به غرفه داران و کاسبان بازار سنتی ایران این وعده را می‌دهیم که ما به هیچ عنوان در امور مالی آن‌ها که شخصی است و به خودشان مربوط است دخالتی نخواهیم داشت و هیچ کنکاشی راجع به درآمد آن‌ها نمی‌کنیم. ما گوشه‌ای از این اقیانوس بزرگ ایستاده‌ایم و به اندازه توانمان کارها را تسهیل خواهیم کرد، به جریان مبادله کالا و خرید و فروش آن در بستر وب کمک می‌کنیم و از آنچه باید ما را منتفع کند، خود به خود منتفع خواهیم شد.»
          </p>
        </div>

        {/* Middle Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
          
          {/* About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-amber-400 p-1.5 rounded-lg text-slate-950">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-white">شهر توانا</h3>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              «شهر توانا» جامع‌ترین بازار تخصصی و سامانه ارتباط مستقیم تولیدکنندگان، بنکداران و فروشندگان پوشاک، لباس مجلسی و ست‌های تخصصی لباس زیر و خواب بانوان در کشور است.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">راسته‌های تخصصی بازار</h4>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li>• مانتو، پالتو و کت‌های بهاره و زمستانه</li>
              <li>• پیراهن مجلسی، اورال و ماکسی‌های شب</li>
              <li>• ست سوتین و شورت، بادی و گن‌های فرم‌دهنده</li>
              <li>• پیراهن خواب ساتن، حریر و ربدوشامبر</li>
              <li>• پوشاک اسپرت، هودی و ست‌های راحتی منزل</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">ارتباط با دبیرخانه بازار</h4>
            <div className="space-y-2 text-slate-400 text-xs">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>تهران، بازار بزرگ، پاساژ رضا و بازار مسگرها</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>تلفن استعلام: ۰۲۱-۵۵۶۲۰۰۰۰</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ایمیل: info@tavanacity.ir</span>
              </p>
            </div>
          </div>
        </div>

        {/* Infrastructure & Hosting Partner Banner (SevenHosts) */}
        <div className="bg-slate-950/80 border border-indigo-800/80 p-3.5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs flex items-center gap-2">
                <span>توسعه زیرساخت ابری و هاستینگ:</span>
                <span className="text-amber-300 font-extrabold">سون هاست (SevenHosts)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                پشتیبان رسمی سرورهای ابری، دامنه و آرم مورد نیاز توسعه‌دهندگان در پروژه شهر توانا
              </p>
            </div>
          </div>

          <a
            href="https://sevenho.st"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black px-4 py-2 rounded-xl text-xs transition shadow flex items-center gap-1.5 shrink-0"
          >
            <span>ورود به وب‌سایت سون هاست</span>
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-indigo-900/60 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-2">
          <p>© ۲۰۲۶ تمامی حقوق برای «اکوسیستم آفرینش | شهر جدید نیومتاورسیتی جهان | توان استیج FBNM» محفوظ است.</p>
          <p className="flex items-center gap-1 text-slate-400">
            پشتیبانی شده توسط <span className="text-emerald-400 font-bold">SevenHosts</span> با <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
