import React, { useState } from 'react';
import { Product } from '../types';
import { formatPrice, generateWhatsAppMessage, calculateWholesaleSavings } from '../utils/formatters';
import { 
  X, 
  Building2, 
  Phone, 
  MessageCircle, 
  BadgeCheck, 
  ShieldAlert, 
  Ruler, 
  Sparkles, 
  CheckCircle2, 
  ShoppingCart, 
  MapPin, 
  Layers,
  Percent
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product, quantityPacks: number) => void;
  onAskAI: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  onAskAI,
}) => {
  if (!product) return null;

  const [selectedPackCount, setSelectedPackCount] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  const images = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  const savings = calculateWholesaleSavings(
    product.priceSingle,
    product.priceWholesale,
    product.packSize
  );

  const totalWholesalePrice = product.priceWholesale * product.packSize * selectedPackCount;
  const totalSingleEquivalent = product.priceSingle * product.packSize * selectedPackCount;
  const totalDiscount = totalSingleEquivalent - totalWholesalePrice;

  const waLink = `https://wa.me/98${product.vendorWhatsApp.replace(/^0/, '')}?text=${generateWhatsAppMessage(
    product.name,
    product.vendorName,
    selectedPackCount,
    product.packSize,
    product.priceWholesale
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex justify-center items-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col md:flex-row my-auto border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 bg-slate-900/60 text-white hover:bg-slate-950 p-2 rounded-full transition backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images & Gallery (RTL layout: on RHS visually, LHS in code) */}
        <div className="w-full md:w-1/2 bg-slate-100 p-4 flex flex-col justify-between border-b md:border-b-0 md:border-l border-slate-200">
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-200 shadow-inner">
              <img
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 bg-indigo-950/80 text-amber-300 text-xs font-bold px-3 py-1 rounded-xl backdrop-blur-md border border-indigo-700/60">
                پک عمده: {product.packSize} تایی
              </span>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? 'border-indigo-600 scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vendor Mini Card */}
          <div className="mt-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-600" />
                {product.vendorName}
              </span>
              {product.isVerifiedVendor && (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" /> غرفه تاییدشده
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {product.vendorLocation}
            </p>
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Controls */}
        <div className="w-full md:w-1/2 p-5 md:p-6 overflow-y-auto space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Category & Title */}
            <div>
              <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-lg">
                {product.categoryLabel} / {product.subCategory || 'عمده'}
              </span>
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 mt-2 leading-snug">
                {product.name}
              </h2>
            </div>

            {/* Price Box */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100 space-y-2">
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="text-xs text-slate-500">قیمت هر عدد در جين عمده:</p>
                  <p className="text-xl font-black text-indigo-950">
                    {formatPrice(product.priceWholesale)} <span className="text-xs font-normal">تومان</span>
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-400">قیمت تک‌فروشی بازار:</p>
                  <p className="text-sm font-bold text-slate-500 line-through decoration-rose-500">
                    {formatPrice(product.priceSingle)} تومان
                  </p>
                </div>
              </div>

              {savings.savingsPercent > 0 && (
                <p className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-100/60 p-1.5 rounded-lg">
                  <Percent className="w-3.5 h-3.5 text-emerald-600" />
                  سود مغازه‌دار در هر جين: {formatPrice(savings.savingsAmount * product.packSize)} تومان ({savings.savingsPercent}٪)
                </p>
              )}
            </div>

            {/* Specifications */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">جنس پارچه:</span>
                <span className="text-slate-800 font-bold">{product.fabricType}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">بسته‌بندی عمده:</span>
                <span className="text-slate-800 font-bold">جین {product.packSize} عددی</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">فصل مناسب:</span>
                <span className="text-indigo-700 font-bold">{product.season}</span>
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">رنگ‌بندی آماده پک:</label>
              <div className="flex flex-wrap gap-1.5">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition border ${
                      selectedColor === c
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes & Size Guide */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 block">سایزبندی‌های موجود:</label>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-[11px] text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" /> راهنمای سایز
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(s)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition border ${
                      selectedSize === s
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Guide Modal Popup inline */}
            {showSizeGuide && (
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Ruler className="w-4 h-4 text-amber-600" /> جدول سایزبندی استاندارد بازار تهران:
                </p>
                <p>• فری سایز: مناسب ۳۶ الی ۴۴</p>
                <p>• سایز ۱: ۳۶ الی ۴۰ | سایز ۲: ۴۲ الی ۴۶</p>
                <p>• ست لباس زیر: سایز کپ B - ۷۵، ۸۰، ۸۵، ۹۰ استاندارد کشسانی</p>
              </div>
            )}

            {/* Description */}
            <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800 block mb-1">توضیحات تولیدکننده:</span>
              {product.description}
            </div>

            {/* Quantity Packs Picker */}
            <div className="bg-slate-100 p-3 rounded-2xl flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">تعداد سفارش جين:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedPackCount(Math.max(1, selectedPackCount - 1))}
                  className="w-8 h-8 rounded-xl bg-white text-slate-800 font-bold border border-slate-300 hover:bg-slate-200 flex items-center justify-center text-sm shadow-sm"
                >
                  -
                </button>
                <span className="font-black text-slate-900 text-sm px-2">
                  {selectedPackCount} جين
                </span>
                <button
                  onClick={() => setSelectedPackCount(selectedPackCount + 1)}
                  className="w-8 h-8 rounded-xl bg-white text-slate-800 font-bold border border-slate-300 hover:bg-slate-200 flex items-center justify-center text-sm shadow-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Action Area */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            
            {/* Total calculation */}
            <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-2">
              <span>جمع کل سفارش ({selectedPackCount * product.packSize} عدد):</span>
              <span className="text-base text-indigo-700 font-black">
                {formatPrice(totalWholesalePrice)} تومان
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* WhatsApp Direct Inquiry */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>استعلام مستقیم در واتساپ</span>
              </a>

              {/* Add to Quote Cart */}
              <button
                onClick={() => {
                  onAddToQuote(product, selectedPackCount);
                  onClose();
                }}
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-amber-400/20"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>افزودن به سبد استعلام</span>
              </button>
            </div>

            {/* AI Advice Button */}
            <button
              onClick={() => {
                onClose();
                onAskAI(product);
              }}
              className="w-full bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 font-bold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
              <span>مشاوره هوشمند AI درباره فروش این محصول</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
