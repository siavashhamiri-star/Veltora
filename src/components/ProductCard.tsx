import React from 'react';
import { Product } from '../types';
import { formatPrice, calculateWholesaleSavings } from '../utils/formatters';
import { 
  Building2, 
  BadgeCheck, 
  Heart, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  Eye, 
  Tag, 
  Layers,
  ArrowLeft
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToQuote,
  isWishlisted,
  onToggleWishlist,
}) => {
  const savings = calculateWholesaleSavings(
    product.priceSingle,
    product.priceWholesale,
    product.packSize
  );

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between hover:-translate-y-1 relative">
      
      {/* Top Badges & Image Container */}
      <div className="relative h-64 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 right-3 left-3 flex justify-between items-start gap-2 pointer-events-none">
          <div className="flex flex-col gap-1 items-start">
            <span className="bg-indigo-900/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-indigo-700/60 shadow-sm flex items-center gap-1">
              <Layers className="w-3 h-3" />
              <span>عمده (جين {product.packSize} تایی)</span>
            </span>

            {product.isManufacturer && (
              <span className="bg-emerald-800/90 text-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-md border border-emerald-600/50 flex items-center gap-1">
                <BadgeCheck className="w-3 h-3 text-emerald-400" /> تولیدکننده
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition shadow ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-slate-900/40 text-white hover:bg-rose-500'
            }`}
            title="افزودن به علاقه‌مندی‌ها"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Fabric Type Badge at Bottom of Image */}
        <div className="absolute bottom-3 right-3 left-3 text-white text-xs pointer-events-none flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-200 bg-slate-900/80 px-2.5 py-1 rounded-md backdrop-blur-sm line-clamp-1 border border-slate-700/50">
            جنس: {product.fabricType}
          </span>
          {savings.savingsPercent > 0 && (
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow animate-pulse">
              {savings.savingsPercent}٪ تخفیف عمده
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="space-y-2">
          
          {/* Vendor Name & Verification */}
          <div className="flex items-center justify-between text-xs text-indigo-700 font-semibold">
            <span className="flex items-center gap-1 line-clamp-1">
              <Building2 className="w-3.5 h-3.5 text-indigo-500" />
              {product.vendorName}
            </span>
            {product.isVerifiedVendor && (
              <span className="text-emerald-600 flex items-center gap-0.5 text-[10px] font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                تاییدشده
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 hover:text-indigo-600 transition cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Color & Size Specs */}
          <div className="flex flex-wrap gap-1 text-[11px] text-slate-500">
            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              {product.colors.length} رنگ موجود
            </span>
            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              {product.sizes.slice(0, 2).join(', ')} {product.sizes.length > 2 ? '...' : ''}
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
          
          {/* Prices Row */}
          <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/60 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-medium">قیمت عمده (هر عدد/پک):</p>
              <p className="text-slate-950 font-black text-sm">
                {formatPrice(product.priceWholesale)} <span className="text-[10px] font-normal text-slate-500">تومان</span>
              </p>
            </div>
            <div className="text-left border-r border-slate-200 pr-2">
              <p className="text-[10px] text-slate-400 font-medium">قیمت تک‌فروشی:</p>
              <p className="text-slate-500 font-semibold text-xs line-through decoration-rose-500/60">
                {formatPrice(product.priceSingle)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(product)}
              className="bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>مشاهده جزئیات</span>
            </button>

            <button
              onClick={() => onAddToQuote(product)}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-sm hover:scale-102 active:scale-98"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>استعلام عمده</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
