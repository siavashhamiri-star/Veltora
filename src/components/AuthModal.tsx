import React, { useState } from 'react';
import { UserProfile, UserPlan } from '../types';
import { X, Phone, Mail, ShieldCheck, Check, ArrowRight, Lock, User, Sparkles, Building2, Crown, Award } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
  onOpenUpgradeModal: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
  onOpenUpgradeModal,
}) => {
  if (!isOpen) return null;

  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  
  // Phone Form
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [otpCode, setOtpCode] = useState('');
  
  // Email Form
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');

  // General Profile
  const [name, setName] = useState(currentUser?.name || '');
  const [role, setRole] = useState<'retailer' | 'wholesaler' | 'manufacturer'>(currentUser?.role || 'retailer');

  const vipBadgeConfigs = {
    1: { name: 'VIP 1 - برنزی (۱ ماهه)', bg: 'bg-amber-100 text-amber-900 border-amber-300' },
    2: { name: 'VIP 2 - نقره‌ای (۳ ماهه)', bg: 'bg-slate-200 text-slate-900 border-slate-300' },
    3: { name: 'VIP 3 - طلایی (۶ ماهه)', bg: 'bg-amber-300 text-amber-950 border-amber-400 font-extrabold' },
    4: { name: 'VIP 4 - پلاتینیوم (۱ ساله)', bg: 'bg-indigo-100 text-indigo-900 border-indigo-300 font-extrabold' },
    5: { name: 'VIP 5 - الماس ویژه (۲ ساله)', bg: 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 border-amber-300 font-black shadow-md' },
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('لطفاً شماره تلفن همراه معتبر وارد فرمایید.');
      return;
    }
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== '1234' && otpCode.length < 4) {
      alert('کد تایید پیامک شده ۴ رقمی را وارد کنید (کد آزمایشی: 1234)');
      return;
    }

    const loggedUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: name.trim() || 'فروشنده همکار',
      phone,
      email: email || undefined,
      role,
      plan: currentUser?.plan || 'free',
      dailyAiQueriesCount: currentUser?.dailyAiQueriesCount || 0,
    };

    onLoginSuccess(loggedUser);
    onClose();
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('لطفاً ایمیل و کلمه عبور را تکمیل فرمایید.');
      return;
    }

    const loggedUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: name.trim() || email.split('@')[0],
      phone: phone || '09120000000',
      email,
      role,
      plan: currentUser?.plan || 'free',
      dailyAiQueriesCount: currentUser?.dailyAiQueriesCount || 0,
    };

    onLoginSuccess(loggedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex justify-center items-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative my-auto border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* If user is already logged in, show account dashboard */}
        {currentUser ? (
          <div className="space-y-5 text-center pt-2">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center text-slate-950 font-black mx-auto text-xl shadow-lg ring-4 ring-amber-100">
              {currentUser.name.charAt(0) || 'U'}
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">{currentUser.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{currentUser.phone}</p>
              
              {/* Membership badge */}
              <div className="mt-3 inline-flex flex-col items-center gap-1">
                {currentUser.plan === 'premium' ? (
                  <div className={`px-4 py-1.5 rounded-full text-xs border flex items-center gap-1.5 shadow-sm ${
                    vipBadgeConfigs[currentUser.vipLevel || 5]?.bg || 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 border-amber-300 font-black'
                  }`}>
                    <Crown className="w-4 h-4 text-slate-950 fill-amber-400" />
                    <span>نشان رسمی {vipBadgeConfigs[currentUser.vipLevel || 5]?.name || 'VIP 5 - الماس ویژه (۲ ساله)'}</span>
                  </div>
                ) : (
                  <span className="bg-slate-100 text-slate-700 border border-slate-300 px-3 py-1 rounded-full text-xs font-bold">
                    حساب معمولی (رایگان)
                  </span>
                )}
              </div>
            </div>

            {/* Profile Info Details */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-right space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">نقش شغلی:</span>
                <span className="font-bold text-slate-800">
                  {currentUser.role === 'retailer' && 'خریدار عمده و مغازه‌دار'}
                  {currentUser.role === 'wholesaler' && 'بنکدار و پخش عمده'}
                  {currentUser.role === 'manufacturer' && 'تولیدکننده مستقیم'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">استفاده هوش مصنوعی امروز:</span>
                <span className="font-bold text-indigo-700">
                  {currentUser.plan === 'premium' ? 'نامحدود (پریمیوم)' : `${currentUser.dailyAiQueriesCount} از ۳ سوال`}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">وضعیت استعلام‌ها:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> فعال و تاییدشده
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              {currentUser.plan === 'free' && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenUpgradeModal();
                  }}
                  className="w-full bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white font-extrabold py-3 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>ارتقا به حساب ویژه پریمیوم VIP</span>
                </button>
              )}

              <button
                onClick={onLogout}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold py-2.5 rounded-xl text-xs transition border border-rose-200"
              >
                خروج از حساب کاربری
              </button>
            </div>
          </div>
        ) : (
          /* Login/Register Form */
          <div className="space-y-4">
            
            {/* Header */}
            <div className="text-center space-y-1">
              <div className="bg-indigo-100 text-indigo-800 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">ورود / ثبت‌نام در «شهر توانا»</h3>
              <p className="text-xs text-slate-500">بازار تخصصی بنکداران و عمده‌فروشان پوشاک بانوان</p>
            </div>

            {/* Auth Method Switcher (Phone vs Email) */}
            <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
              <button
                onClick={() => { setAuthMethod('phone'); setStep('input'); }}
                className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  authMethod === 'phone' ? 'bg-white text-indigo-900 shadow-sm' : ''
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>شماره همراه (SMS)</span>
              </button>

              <button
                onClick={() => { setAuthMethod('email'); setStep('input'); }}
                className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  authMethod === 'email' ? 'bg-white text-indigo-900 shadow-sm' : ''
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>ورود با ایمیل</span>
              </button>
            </div>

            {/* Role Picker */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">نقش شما در بازار:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600 bg-white"
              >
                <option value="retailer">خریدار عمده / مغازه‌دار و آنلاین شاپ</option>
                <option value="wholesaler">بنکدار / پخش عمده بازار</option>
                <option value="manufacturer">تولیدکننده مستقیم پوشاک</option>
              </select>
            </div>

            {/* Form Fields */}
            {authMethod === 'phone' ? (
              step === 'input' ? (
                <form onSubmit={handleSendOtp} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">نام و نام خانوادگی:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثال: علی محمدی"
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">شماره تلفن همراه *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09121112233"
                      required
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600 text-left font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold py-3 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
                  >
                    <span>ارسال کد پیامکی ورود</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3 text-xs">
                  <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-[11px] text-amber-900">
                    کد پیامکی ۴ رقمی به شماره <strong>{phone}</strong> ارسال شد. (کد تست: <strong>1234</strong>)
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">کد تایید ۴ رقمی *</label>
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="1234"
                      maxLength={4}
                      required
                      className="w-full border border-indigo-500 rounded-xl px-3 py-2.5 text-center text-base font-mono tracking-widest outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep('input')}
                      className="w-1/3 bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
                    >
                      اصلاح شماره
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition shadow"
                    >
                      تایید و ورود به بازار
                    </button>
                  </div>
                </form>
              )
            ) : (
              /* Email Form */
              <form onSubmit={handleEmailSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نام و نام خانوادگی:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: مریم رضایی"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">آدرس ایمیل *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@domain.com"
                    required
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600 text-left font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">کلمه عبور *</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-600 text-left font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold py-3 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
                >
                  <span>ورود با ایمیل</span>
                  <Lock className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
