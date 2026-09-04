import React from 'react';
import { Vendor } from '../types';
import { X, Store, Building2, BadgeCheck, Phone, MessageCircle, MapPin, Star, Calendar } from 'lucide-react';

interface VendorBoothsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendors: Vendor[];
  onSelectVendorFilter: (vendorId: string) => void;
}

export const VendorBoothsModal: React.FC<VendorBoothsModalProps> = ({
  isOpen,
  onClose,
  vendors,
  onSelectVendorFilter,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex justify-center items-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl p-6 shadow-2xl relative my-auto border border-slate-200">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-700 text-white p-2.5 rounded-2xl shadow-md">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">غرفه‌های برتر بنکداران و تولیدکنندگان</h3>
              <p className="text-xs text-slate-500">ارتباط مستقیم با مراکز اصلی پخش در بازار بزرگ تهران و کشور</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Bazaar Merchants Privacy & Financial Guarantee Charter */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/70 border border-amber-300 p-4 rounded-2xl mb-4 text-xs text-amber-950 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 font-black text-amber-900 text-sm">
            <BadgeCheck className="w-5 h-5 text-amber-600 fill-amber-300" />
            <span>میثاق‌نامه «شهر توانا» با کاسبان و بنکداران بازار سنتی ایران</span>
          </div>
          <p className="leading-relaxed font-medium text-slate-800">
            ما به بنکداران و کاسبان شریف بازار سنتی این وعده قطعی را می‌دهیم که <strong>به هیچ عنوان در امور مالی که کاملاً شخصی و مربوط به خود شماست دخالت و کنکاشی نخواهیم کرد</strong>. ما گوشه‌ای از این اقیانوس بزرگ ایستاده‌ایم و به اندازه توانمان کارها را تسهیل می‌کنیم و به جریان مبادله کالا در بستر وب کمک می‌کنیم، و از آنچه باید ما را منتفع کند خود به خود منتفع خواهیم شد.
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[65vh] overflow-y-auto p-1">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-slate-50 hover:bg-slate-100/80 p-4 rounded-2xl border border-slate-200 transition space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <img
                    src={vendor.logo}
                    alt={vendor.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <h4 className="font-extrabold text-slate-900 text-sm">{vendor.name}</h4>
                      {vendor.isVerified && (
                        <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" title="غرفه تاییدشده" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500">مدیریت: {vendor.manager}</p>
                    <div className="flex items-center gap-2 text-[11px] text-amber-600 font-bold mt-1">
                      <span className="flex items-center gap-0.5 bg-amber-100 px-2 py-0.5 rounded-md">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {vendor.satisfactionRate}٪ رضایت خریداران
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-slate-600 pt-1">
                  <p className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{vendor.bazaarLocation}</span>
                  </p>
                  <p className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>سابقه حضور در بازار: از سال {vendor.establishedYear}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {vendor.featuredCategories.map((cat, i) => (
                    <span key={i} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vendor Action Buttons */}
              <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`https://wa.me/98${vendor.whatsapp.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>پیام واتساپ</span>
                </a>

                <button
                  onClick={() => {
                    onSelectVendorFilter(vendor.id);
                    onClose();
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>محصولات این غرفه</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
