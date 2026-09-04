export type MainCategory = 'all' | 'manto' | 'majlesi' | 'sport' | 'underwear' | 'nightwear' | 'shapewear' | 'socks';

export type UserPlan = 'free' | 'premium';
export type VipLevel = 1 | 2 | 3 | 4 | 5;

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'wholesaler' | 'retailer' | 'manufacturer';
  plan: UserPlan;
  vipLevel?: VipLevel;
  premiumExpiryDate?: string;
  dailyAiQueriesCount: number;
}

export interface Product {
  id: string;
  name: string;
  category: MainCategory;
  categoryLabel: string;
  subCategory?: string;
  priceSingle: number; // قیمت تک‌فروشی (تومان)
  priceWholesale: number; // قیمت هر جين یا هر عدد در عمده (تومان)
  packSize: number; // تعداد در جين (مثلا ۶ یا ۱۲)
  moq: number; // حداقل تعداد جين سفارش (Minimum Order Quantity)
  image: string;
  gallery?: string[];
  vendorId: string;
  vendorName: string;
  vendorLocation: string;
  vendorPhone: string;
  vendorWhatsApp: string;
  isVerifiedVendor: boolean;
  isManufacturer: boolean;
  fabricType: string; // جنس پارچه (مثلا کتان، ساتن ابریشم، گیپور، نخ پنبه، اسفنجی، لایکرا)
  colors: string[]; // اسامی یا کدهای رنگی
  sizes: string[]; // سایزبندی (مثلا S, M, L, XL یا ۳۶ تا ۴۶)
  season: 'بهاره' | 'تابستانه' | 'پاییزه' | 'زمستانه' | 'چهارفصل';
  description: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  createdAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  manager: string;
  city: string;
  bazaarLocation: string; // موقعیت در بازار (مثلا پاساژ رضا طبقه منفی ۱)
  phone: string;
  whatsapp: string;
  logo: string;
  isVerified: boolean;
  isManufacturer: boolean;
  satisfactionRate: number; // درصد رضایت
  establishedYear: number;
  featuredCategories: string[];
}

export interface QuoteCartItem {
  product: Product;
  quantityPacks: number; // تعداد جين
  selectedColor?: string;
  selectedSize?: string;
  customNotes?: string;
}

export interface CategoryInfo {
  id: MainCategory;
  label: string;
  iconName: string;
  count: number;
  description: string;
}
