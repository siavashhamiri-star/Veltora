// Helper utilities for Persian currency and formatting

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fa-IR').format(amount);
}

export function toPersianDigits(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/\d/g, (x) => persianDigits[parseInt(x, 10)]);
}

export function calculateWholesaleSavings(singlePrice: number, packPrice: number, packSize: number): {
  singleTotal: number;
  packTotal: number;
  savingsAmount: number;
  savingsPercent: number;
} {
  const singleTotal = singlePrice * packSize;
  const packTotal = packPrice * packSize;
  const savingsAmount = singleTotal - packTotal;
  const savingsPercent = Math.round((savingsAmount / singleTotal) * 100);
  
  return {
    singleTotal,
    packTotal,
    savingsAmount,
    savingsPercent: Math.max(0, savingsPercent)
  };
}

export function generateWhatsAppMessage(
  productName: string,
  vendorName: string,
  packCount: number,
  packSize: number,
  pricePerUnit: number
): string {
  const totalItems = packCount * packSize;
  const totalPrice = packCount * packSize * pricePerUnit;
  
  return encodeURIComponent(
    `باسلام و احترام خدمت غرفه محترم ${vendorName}\n` +
    `از طریق سامانه «شهر توانا» درخواست استعلام خرید عمده دارم:\n\n` +
    `📦 نام محصول: ${productName}\n` +
    `🔢 تعداد سفارش: ${packCount} جين (${totalItems} عدد)\n` +
    `💰 قیمت عمده تخمینی: ${formatPrice(totalPrice)} تومان\n\n` +
    `لطفا شرایط تحویل، رنگ‌بندی موجود و نحوه‌ ارسال را اعلام بفرمایید. با تشکر!`
  );
}
