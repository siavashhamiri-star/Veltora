import React from 'react';
import { QuoteCartItem } from '../types';
import { formatPrice, generateWhatsAppMessage } from '../utils/formatters';
import { X, ShoppingCart, Trash2, MessageCircle, ArrowLeft, Building2, CheckCircle, Sparkles } from 'lucide-react';

interface QuoteCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteCartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const QuoteCartDrawer: React.FC<QuoteCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalWholesalePrice = items.reduce(
    (acc, item) => acc + item.product.priceWholesale * item.product.packSize * item.quantityPacks,
    0
  );

  const totalItemsCount = items.reduce(
    (acc, item) => acc + item.product.packSize * item.quantityPacks,
    0
  );

  const sendAllInquiriesToWhatsApp = () => {
    if (items.length === 0) return;
    const firstItem = items[0];
    const summaryText = items
      .map(
        (it) =>
          `• ${it.product.name} (${it.quantityPacks} جين - ${it.quantityPacks * it.product.packSize} عدد) - قیمت جين: ${formatPrice(
            it.product.priceWholesale * it.product.packSize
          )} تومان`
      )
      .join('\n');

    const msg = encodeURIComponent(
      `باسلام و احترام\nدرخواست استعلام خرید عمده جینی از پلتفرم «شهر توانا»:\n\n${summaryText}\n\n` +
      `💰 جمع کل استعلام: ${formatPrice(totalWholesalePrice)} تومان\n` +
      `لطفا موجودی رنگ‌بندی و شرایط ارسال را تایید بفرمایید.`
    );

    window.open(`https://wa.me/98${firstItem.product.vendorWhatsApp.replace(/^0/, '')}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-5 overflow-y-auto animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-700 text-white p-2 rounded-xl">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">سبد استعلام پیش‌فاکتور عمده</h3>
                <p className="text-xs text-slate-500">{items.length} قلم محصول انتخابی ({totalItemsCount} عدد)</p>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items List */}
          <div className="mt-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-3">
                <ShoppingCart className="w-12 h-12 mx-auto stroke-1 opacity-50" />
                <p className="text-sm font-medium">سبد استعلام شما خالی است.</p>
                <p className="text-xs text-slate-400">محصولات مورد نظر خود را برای دریافت پیش‌فاکتور عمده اضافه کنید.</p>
              </div>
            ) : (
              items.map((item) => {
                const itemTotal = item.product.priceWholesale * item.product.packSize * item.quantityPacks;
                return (
                  <div key={item.product.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex gap-3 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-200"
                    />

                    <div className="flex-1 space-y-1 text-xs">
                      <h4 className="font-bold text-slate-800 line-clamp-1">{item.product.name}</h4>
                      <p className="text-[11px] text-indigo-700 font-medium">{item.product.vendorName}</p>
                      <p className="font-black text-slate-900">
                        {formatPrice(itemTotal)} <span className="font-normal text-slate-500">تومان</span>
                      </p>

                      {/* Quantity Pack controls */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-6 h-6 rounded-lg bg-white border border-slate-300 font-bold flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="font-bold text-slate-800 text-xs">{item.quantityPacks} جين</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-6 h-6 rounded-lg bg-white border border-slate-300 font-bold flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer Area */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="bg-indigo-50 p-3 rounded-2xl border border-indigo-100 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700">جمع کل خرید عمده ({totalItemsCount} عدد):</span>
              <span className="text-base text-indigo-950 font-black">{formatPrice(totalWholesalePrice)} تومان</span>
            </div>

            <button
              onClick={sendAllInquiriesToWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-2xl text-xs transition shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>ارسال استعلام یکجا به بنکدار در واتساپ</span>
            </button>

            <button
              onClick={onClearCart}
              className="w-full text-slate-400 hover:text-rose-600 font-bold py-1 text-xs text-center"
            >
              خالی کردن سبد
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
