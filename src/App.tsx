import React, { useState, useMemo, useEffect } from 'react';
import { Product, MainCategory, QuoteCartItem, CategoryInfo, UserProfile, VipLevel } from './types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_VENDORS } from './data/initialData';
import { Header } from './components/Header';
import { BannerHero } from './components/BannerHero';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AddProductModal } from './components/AddProductModal';
import { WholesaleCalculatorModal } from './components/WholesaleCalculatorModal';
import { QuoteCartDrawer } from './components/QuoteCartDrawer';
import { AIAssistantModal } from './components/AIAssistantModal';
import { VendorBoothsModal } from './components/VendorBoothsModal';
import { AuthModal } from './components/AuthModal';
import { PremiumModal } from './components/PremiumModal';
import { Footer } from './components/Footer';
import { SlidersHorizontal, Sparkles, Filter, Store, RefreshCcw, Building2, Layers } from 'lucide-react';

export default function App() {
  // User & Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('tavana_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      id: 'usr_guest',
      name: 'همکار همیشگی (رایگان)',
      phone: '09121112233',
      role: 'retailer',
      plan: 'free',
      dailyAiQueriesCount: 0,
    };
  });

  // State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('tavana_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && !JSON.stringify(parsed).includes('photo-1534528741775-53994a69daeb')) {
          return parsed;
        }
      } catch (e) { /* fallback */ }
    }
    return INITIAL_PRODUCTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<MainCategory>('all');
  const [activeTradeMode, setActiveTradeMode] = useState<'all' | 'wholesale' | 'retail'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'priceLow' | 'priceHigh' | 'popular'>('newest');

  // Modals
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isQuoteCartOpen, setIsQuoteCartOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiProductContext, setAiProductContext] = useState<Product | null>(null);
  const [isVendorsOpen, setIsVendorsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  // Quote Cart & Wishlist
  const [quoteCart, setQuoteCart] = useState<QuoteCartItem[]>(() => {
    const saved = localStorage.getItem('tavana_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('tavana_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  // Save changes to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('tavana_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('tavana_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('tavana_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tavana_cart', JSON.stringify(quoteCart));
  }, [quoteCart]);

  useEffect(() => {
    localStorage.setItem('tavana_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Handlers for User & Subscription
  const handleUpgradeToPremium = (level: VipLevel = 5) => {
    const datesMap: Record<VipLevel, string> = {
      1: '2026-09-11',
      2: '2026-11-11',
      3: '2027-02-11',
      4: '2027-08-11',
      5: '2028-08-11',
    };

    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            plan: 'premium',
            vipLevel: level,
            premiumExpiryDate: datesMap[level],
          }
        : {
            id: 'usr_premium',
            name: 'خریدار ویژه پریمیوم VIP',
            phone: '09121112233',
            role: 'retailer',
            plan: 'premium',
            vipLevel: level,
            premiumExpiryDate: datesMap[level],
            dailyAiQueriesCount: 0,
          }
    );
  };

  const handleIncrementAiCount = () => {
    if (currentUser && currentUser.plan === 'free') {
      setCurrentUser((prev) =>
        prev
          ? { ...prev, dailyAiQueriesCount: prev.dailyAiQueriesCount + 1 }
          : null
      );
    }
  };

  // Product Counts for CategoryBar
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Vendor filter
        if (selectedVendorId && p.vendorId !== selectedVendorId) {
          return false;
        }
        // Trade Mode filter
        if (activeTradeMode === 'wholesale' && p.priceWholesale >= p.priceSingle) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCategory = p.categoryLabel.toLowerCase().includes(q);
          const matchFabric = p.fabricType.toLowerCase().includes(q);
          const matchVendor = p.vendorName.toLowerCase().includes(q);
          if (!matchName && !matchCategory && !matchFabric && !matchVendor) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priceLow') return a.priceWholesale - b.priceWholesale;
        if (sortBy === 'priceHigh') return b.priceWholesale - a.priceWholesale;
        if (sortBy === 'popular') return b.rating - a.rating;
        // Default newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, selectedCategory, selectedVendorId, activeTradeMode, searchQuery, sortBy]);

  // Handlers
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleAddToQuote = (product: Product, quantityPacks = 1) => {
    setQuoteCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantityPacks: item.quantityPacks + quantityPacks }
            : item
        );
      }
      return [...prev, { product, quantityPacks }];
    });
    setIsQuoteCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setQuoteCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantityPacks + delta;
            return newQty > 0 ? { ...item, quantityPacks: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as QuoteCartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setQuoteCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOpenAIForProduct = (product: Product) => {
    setAiProductContext(product);
    setIsAIOpen(true);
  };

  const activeVendor = INITIAL_VENDORS.find((v) => v.id === selectedVendorId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950">
      
      {/* Header */}
      <Header
        onOpenAddModal={() => setIsAddProductOpen(true)}
        onOpenQuoteCart={() => setIsQuoteCartOpen(true)}
        onOpenAIModal={() => {
          setAiProductContext(null);
          setIsAIOpen(true);
        }}
        onOpenVendorsModal={() => setIsVendorsOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenAuthModal={() => setIsAuthOpen(true)}
        onOpenUpgradeModal={() => setIsUpgradeOpen(true)}
        currentUser={currentUser}
        quoteCart={quoteCart}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Container */}
      <main className="container mx-auto px-4 py-6 flex-1">
        
        {/* Banner Hero */}
        <BannerHero
          onOpenVendors={() => setIsVendorsOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          activeTradeMode={activeTradeMode}
          setActiveTradeMode={setActiveTradeMode}
        />

        {/* Category Filter Bar */}
        <CategoryBar
          categories={INITIAL_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSelectedVendorId(null);
          }}
          productCounts={productCounts}
        />

        {/* Active Vendor Banner Filter Notice */}
        {selectedVendorId && activeVendor && (
          <div className="bg-indigo-900 text-white p-3.5 rounded-2xl mb-6 flex justify-between items-center text-xs shadow-md">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-amber-400" />
              <span>در حال مشاهده محصولات غرفه: <strong>{activeVendor.name}</strong> ({activeVendor.bazaarLocation})</span>
            </div>
            <button
              onClick={() => setSelectedVendorId(null)}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-xl transition"
            >
              نمایش همه غرفه‌ها
            </button>
          </div>
        )}

        {/* Controls & Sorting Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs">
          
          {/* Results count */}
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>
              نمایش <strong className="text-indigo-600 font-extrabold">{filteredProducts.length}</strong> مدل لباس زیر و پوشاک بانوان
            </span>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500 font-medium">مرتب‌سازی:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-100 font-bold text-slate-800 border border-slate-200 rounded-xl px-3 py-1.5 outline-none focus:border-indigo-600 cursor-pointer"
            >
              <option value="newest">جدیدترین محصولات</option>
              <option value="popular">محبوب‌ترین و پربازدید</option>
              <option value="priceLow">ارزان‌ترین قیمت عمده</option>
              <option value="priceHigh">گران‌ترین قیمت عمده</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-lg mx-auto my-8">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">هیچ محصولی با مشخصات انتخابی پیدا نشد.</h3>
            <p className="text-xs text-slate-500">لطفاً عبارات جستجو یا فیلترهای دسته بندی را تغییر دهید.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveTradeMode('all');
                setSearchQuery('');
                setSelectedVendorId(null);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition inline-flex items-center gap-1.5"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>پاک‌سازی همه فیلترها</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProductForDetail(p)}
                onAddToQuote={(p) => handleAddToQuote(p)}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToQuote={(p, qty) => handleAddToQuote(p, qty)}
        onAskAI={handleOpenAIForProduct}
      />

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <WholesaleCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        products={products}
      />

      <QuoteCartDrawer
        isOpen={isQuoteCartOpen}
        onClose={() => setIsQuoteCartOpen(false)}
        items={quoteCart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setQuoteCart([])}
      />

      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        initialProductContext={aiProductContext}
        currentUser={currentUser}
        onOpenUpgradeModal={() => {
          setIsAIOpen(false);
          setIsUpgradeOpen(true);
        }}
        onIncrementAiCount={handleIncrementAiCount}
      />

      <VendorBoothsModal
        isOpen={isVendorsOpen}
        onClose={() => setIsVendorsOpen(false)}
        vendors={INITIAL_VENDORS}
        onSelectVendorFilter={(vId) => setSelectedVendorId(vId)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(u) => setCurrentUser(u)}
        onLogout={() => setCurrentUser(null)}
        onOpenUpgradeModal={() => setIsUpgradeOpen(true)}
      />

      <PremiumModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        currentUser={currentUser}
        onUpgradeToPremium={handleUpgradeToPremium}
      />
    </div>
  );
}

