import React, { useState } from 'react';
import { Product } from '../types';
import { formatPrice, calculateWholesaleSavings } from '../utils/formatters';
import { X, Calculator, Sparkles, Printer, CheckCircle2, DollarSign, TrendingUp, Percent, Download } from 'lucide-react';

interface WholesaleCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export const WholesaleCalculatorModal: React.FC<WholesaleCalculatorModalProps> = ({
  isOpen,
  onClose,
  products,
}) => {
  if (!isOpen) return null;

  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [packQuantity, setPackQuantity] = useState<number>(5); // 5 packs
  const [customRetailMarkup, setCustomRetailMarkup] = useState<number>(60); // 60% markup

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  if (!selectedProduct) return null;

  const totalItemsCount = packQuantity * selectedProduct.packSize;
  const totalWholesaleCost = totalItemsCount * selectedProduct.priceWholesale;
  const suggestedRetailItemPrice = Math.round(selectedProduct.priceWholesale * (1 + customRetailMarkup / 100));
  const totalEstimatedRevenue = totalItemsCount * suggestedRetailItemPrice;
  const totalEstimatedProfit = totalEstimatedRevenue - totalWholesaleCost;
  const totalSavingsAgainstStandardRetail = (selectedProduct.priceSingle * totalItemsCount) - totalWholesaleCost;

  const handlePrintProforma = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex justify-center items-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl p-6 shadow-2xl relative my-auto border border-slate-200 print:shadow-none print:border-none print:p-0">
        
        {/* Header (Hidden on Print) */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-5 print:hidden">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 p-2.5 rounded-2xl shadow-md">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">محاسبه‌گر هوشمند سود و تخفیف جینی عمده</h3>
              <p className="text-xs text-slate-500">تخمین سود مغازه‌داری و صدور پیش‌فاکتور آزمایشی</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Controls (Hidden on Print) */}
        <div className="space-y-4 print:hidden text-xs">
          {/* Product Select */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">انتخاب محصول از لیست بازار:</label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-semibold outline-none focus:border-indigo-600 bg-white"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — (قیمت عمده: {formatPrice(p.priceWholesale)} تومان | جين {p.packSize} تایی)
                </option>
              ))}
            </select>
          </div>

          {/* Slider Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>تعداد جين سفارش:</span>
                <span className="text-indigo-600 font-extrabold">{packQuantity} جين ({totalItemsCount} عدد)</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={packQuantity}
                onChange={(e) => setPackQuantity(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>درصد سود تک‌فروشی شما:</span>
                <span className="text-emerald-600 font-extrabold">{customRetailMarkup}٪</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={customRetailMarkup}
                onChange={(e) => setCustomRetailMarkup(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Calculation Results Card / Proforma Printable View */}
        <div className="mt-6 bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-950 text-white rounded-3xl p-6 shadow-xl border border-indigo-700/60 space-y-4">
          <div className="flex justify-between items-center border-b border-indigo-800/80 pb-3">
            <div>
              <span className="text-xs text-amber-300 font-bold bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/30">
                پیش‌فاکتور تخمینی «شهر توانا»
              </span>
              <h4 className="text-base font-bold text-white mt-1">{selectedProduct.name}</h4>
              <p className="text-xs text-indigo-200">غرفه: {selectedProduct.vendorName}</p>
            </div>
            <div className="text-left text-xs text-indigo-300">
              <p>تاریخ: {new Date().toLocaleDateString('fa-IR')}</p>
              <p>کد پیگیری: #{selectedProduct.id.slice(0, 6)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-indigo-900/60 p-3 rounded-2xl border border-indigo-700/40">
              <p className="text-indigo-300 font-medium">کل تعداد اقلام:</p>
              <p className="text-lg font-black text-white mt-0.5">{totalItemsCount} عدد</p>
              <p className="text-[10px] text-indigo-300">({packQuantity} جين {selectedProduct.packSize} تایی)</p>
            </div>

            <div className="bg-indigo-900/60 p-3 rounded-2xl border border-indigo-700/40">
              <p className="text-indigo-300 font-medium">قیمت کل خرید عمده:</p>
              <p className="text-lg font-black text-amber-300 mt-0.5">{formatPrice(totalWholesaleCost)}</p>
              <p className="text-[10px] text-indigo-300">تومان</p>
            </div>

            <div className="bg-indigo-900/60 p-3 rounded-2xl border border-indigo-700/40">
              <p className="text-indigo-300 font-medium">قیمت پیشنهادی تک:</p>
              <p className="text-lg font-black text-white mt-0.5">{formatPrice(suggestedRetailItemPrice)}</p>
              <p className="text-[10px] text-indigo-300">تومان (با سود {customRetailMarkup}٪)</p>
            </div>

            <div className="bg-emerald-950/80 p-3 rounded-2xl border border-emerald-600/50">
              <p className="text-emerald-300 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> سود خالص شما:
              </p>
              <p className="text-lg font-black text-emerald-300 mt-0.5">{formatPrice(totalEstimatedProfit)}</p>
              <p className="text-[10px] text-emerald-200">تومان</p>
            </div>
          </div>

          {/* Savings Badge */}
          <div className="bg-amber-500/10 border border-amber-400/30 p-3 rounded-2xl text-xs text-amber-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              تخفیف جینی این خرید نسبت به تک‌فروشی بازار:
            </span>
            <span className="font-black text-amber-300 text-sm">
              {formatPrice(totalSavingsAgainstStandardRetail)} تومان سود مستقیم
            </span>
          </div>
        </div>

        {/* Action Buttons (Hidden on Print) */}
        <div className="mt-5 flex justify-end gap-3 print:hidden">
          <button
            onClick={handlePrintProforma}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition flex items-center gap-2 shadow"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ / دانلود پیش‌فاکتور</span>
          </button>

          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs transition"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
