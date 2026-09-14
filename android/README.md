# راهنمای ساخت خروجی APK و AAB برای مایکت و کافه بازار

این پروژه حاوی پروژه کامل گرادل (Gradle) استاندارد نیتیو برای تولید خروجی **APK** و **AAB (Android App Bundle)** جهت انتشار مستقیم در مایکت (Myket)، بازار (Bazaar) و گوگل پلی است.

---

### ۱. دستورات ساخت اتوماتیک با ترمینال (Gradle)

وارد پوشه `android` شوید:

#### برای ساخت فایل APK:
```bash
cd android
./gradlew assembleRelease
```
فایل نهایی در مسیر زیر تولید می‌شود:
`android/app/build/outputs/apk/release/app-release-unsigned.apk`

#### برای ساخت فایل AAB (فرمت استاندارد و پیشنهادی مایکت و بازار):
```bash
cd android
./gradlew bundleRelease
```
فایل نهایی در مسیر زیر تولید می‌شود:
`android/app/build/outputs/bundle/release/app-release.aab`

---

### ۲. ساخت با نرم‌افزار Android Studio (آسان با رابط کاربری)

1. نرم‌افزار **Android Studio** را باز کنید.
2. گزینه **Open** را بزنید و پوشه `android` همین پروژه را انتخاب کنید.
3. اجازه دهید همگام‌سازی Gradle (Gradle Sync) کامل شود.
4. از منوی بالای برنامه:
   - برای ساخت نسخه تستی/نصب مستقیم: **Build > Build Bundle(s) / APK(s) > Build APK(s)**
   - برای انتشار رسمی در مایکت و بازار: **Build > Generate Signed Bundle / APK...** را زده و فرمت **Android App Bundle (.aab)** یا **APK** را با کلید امضای خود (Keystore) خروجی بگیرید.

---

### ۳. تنظیمات بسته (Package Configuration)
- **Application ID:** `ir.tavanacity.app`
- **Target SDK:** 34 (سازگار با آخرین الزامات مایکت و بازار)
- **Min SDK:** 21 (پشتیبانی از بیش از ۹۹٪ گوشی‌های اندروید کشور)
- **پشتیبانی از زبان فارسی (RTL):** فعال
- **ارتباط با پیام‌رسان‌ها:** کلیک روی شماره تلفن، لینک‌های واتساپ و تلگرام مستقیماً به برنامه‌های مربوطه در گوشی کاربر هدایت می‌شوند.
