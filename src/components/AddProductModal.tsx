import React, { useState } from 'react';
import { Product, MainCategory } from '../types';
import { X, Plus, Image as ImageIcon, Sparkles, Building2, Check, Upload, Tag } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

const SAMPLE_PRESET_IMAGES = [
  { label: 'مانتو بهاره شیک', url: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800&auto=format&fit=crop&q=80' },
  { label: 'پیراهن مجلسی ماکسی', url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=80' },
  { label: 'ست لباس زیر گیپور', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80' },
  { label: 'ست راحتی و هودی', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80' },
  { label: 'لباس خواب ساتن', url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80' },
  { label: 'بادی فانتزی توری', url: 'https://images.unsplash.com/photo-1520591799316-6b30425429aa?w=800&auto=format&fit=crop&q=80' },
];

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [category, setCategory] = useState<MainCategory>('manto');
  const [priceSingle, setPriceSingle] = useState<number | ''>('');
  const [priceWholesale, setPriceWholesale] = useState<number | ''>('');
  const [packSize, setPackSize] = useState<number>(6);
  const [fabricType, setFabricType] = useState('کتان اعلی');
  const [image, setImage] = useState(SAMPLE_PRESET_IMAGES[0].url);
  const [vendorName, setVendorName] = useState('تولیدی و پخش توانا');
  const [vendorPhone, setVendorPhone] = useState('02155620000');
  const [vendorWhatsApp, setVendorWhatsApp] = useState('09121110000');
  const [colors, setColors] = useState('مشکی، کرم، سرمه‌ای');
  const [sizes, setSizes] = useState('سایز ۱، سایز ۲');
  const [description, setDescription] = useState('');
  const [isManufacturer, setIsManufacturer] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !priceSingle || !priceWholesale || !image) {
      alert('لطفاً تمام فیلدهای ضروری را تکمیل فرمایید.');
      return;
    }

    const categoryLabels: Record<MainCategory, string> = {
      all: 'همه',
      manto: 'مانتو و پالتو',
      majlesi: 'لباس مجلسی',
      sport: 'اسپرت و راحتی',
      underwear: 'لباس زیر و ست',
      nightwear: 'لباس خواب',
      shapewear: 'گن و بادی',
      socks: 'جوراب و ساپورت',
    };

    const newProduct: Product = {
      id: 'p_' + Date.now(),
      name,
      category,
      categoryLabel: categoryLabels[category],
      priceSingle: Number(priceSingle),
      priceWholesale: Number(priceWholesale),
      packSize,
      moq: 1,
      image,
      vendorId: 'v_custom',
      vendorName,
      vendorLocation: 'بازار بزرگ تهران',
      vendorPhone,
      vendorWhatsApp,
      isVerifiedVendor: true,
      isManufacturer,
      fabricType,
      colors: colors.split('،').map((s) => s.trim()).filter(Boolean),
      sizes: sizes.split('،').map((s) => s.trim()).filter(Boolean),
      season: 'بهاره',
      description: description || 'محصول جدید ثبت شده در غرفه بازار توانا.',
      rating: 5.0,
      reviewCount: 1,
      isFeatured: true,
      createdAt: new Date().toISOString(),
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex justify-center items-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative my-auto border border-slate-200">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-5">
          <div className="flex items-center gap-2">
            <div className="bg-amber-400 p-2 rounded-xl text-slate-950">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">ثبت محصول جدید در غرفه بازار</h3>
              <p className="text-xs text-slate-500">انتشار فوری برای بنکداران و خریداران سراسر کشور</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Product Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">نام محصول *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: مانتو کتان بهاره مدل صدف"
                required
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">دسته بندی تخصصی *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MainCategory)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 bg-white"
              >
                <option value="manto">مانتو و پالتو</option>
                <option value="majlesi">لباس مجلسی</option>
                <option value="sport">اسپرت و راحتی</option>
                <option value="underwear">لباس زیر و ست</option>
                <option value="nightwear">لباس خواب و ربدوشامبر</option>
                <option value="shapewear">گن و بادی فرم‌دهنده</option>
                <option value="socks">جوراب و ساپورت</option>
              </select>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-700 mb-1">قیمت عمده هر عدد (تومان) *</label>
              <input
                type="number"
                value={priceWholesale}
                onChange={(e) => setPriceWholesale(e.target.value ? Number(e.target.value) : '')}
                placeholder="مثال: ۴۹۰۰۰۰"
                required
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">قیمت تک‌فروشی بازار (تومان) *</label>
              <input
                type="number"
                value={priceSingle}
                onChange={(e) => setPriceSingle(e.target.value ? Number(e.target.value) : '')}
                placeholder="مثال: ۷۸۰۰۰۰"
                required
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">تعداد در جين (پک)</label>
              <select
                value={packSize}
                onChange={(e) => setPackSize(Number(e.target.value))}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600 bg-white"
              >
                <option value={6}>۶ تایی (نیم جين)</option>
                <option value={12}>۱۲ تایی (یک جين کامل)</option>
                <option value={24}>۲۴ تایی (پک بزرگ)</option>
              </select>
            </div>
          </div>

          {/* Fabric & Vendor Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">جنس پارچه / الیاف</label>
              <input
                type="text"
                value={fabricType}
                onChange={(e) => setFabricType(e.target.value)}
                placeholder="مثال: کتان نخ سوپر، گیپور فرانسوی، ساتن ابریشم"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">نام غرفه / تولیدی</label>
              <input
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Preset Image Selector or Custom Link */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">انتخاب عکس نمونه یا لینک تصویر *</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
              {SAMPLE_PRESET_IMAGES.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImage(preset.url)}
                  className={`h-16 rounded-xl overflow-hidden border-2 relative transition ${
                    image === preset.url ? 'border-indigo-600 scale-105 shadow' : 'border-slate-200'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  {image === preset.url && (
                    <span className="absolute inset-0 bg-indigo-600/40 flex items-center justify-center text-white">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="یا لینک تصویر مستقیم وارد کنید: https://..."
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600"
            />
          </div>

          {/* Colors & Sizes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">رنگ‌بندی‌ها (با کاما جدا کنید)</label>
              <input
                type="text"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                placeholder="مشکی، کرم، سرمه‌ای"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">سایزبندی (با کاما جدا کنید)</label>
              <input
                type="text"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                placeholder="سایز ۱، سایز ۲ یا 75, 80, 85"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Contact & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">شماره واتساپ بنکدار</label>
              <input
                type="text"
                value={vendorWhatsApp}
                onChange={(e) => setVendorWhatsApp(e.target.value)}
                placeholder="09121110000"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer bg-slate-100 p-2.5 rounded-xl border border-slate-200 w-full">
                <input
                  type="checkbox"
                  checked={isManufacturer}
                  onChange={(e) => setIsManufacturer(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="font-bold text-slate-800">این غرفه تولیدکننده مستقیم است</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">توضیحات تکمیلی کیفیت و تنخور</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="توضیحات درباره دوخت، شستشو، تنخور و شرایط تحویل..."
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-3 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2 mt-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>ثبت و انتشار فوری محصول در بازار توانا</span>
          </button>
        </form>
      </div>
    </div>
  );
};
