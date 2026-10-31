# GANJI — How to Build a Native Android APK & Publish to Google Play

GANJI is built as an offline-first, mobile-optimized application. You can package it into an actual **native Android APK** (to share directly with anyone or test on your phone) or an **Android App Bundle (.aab)** for Google Play Console.

Here are the **two easiest ways** to do it:

---

## Method 1: Using Capacitor (Recommended & 100% Offline)
Capacitor converts your HTML, CSS, and JS code into a genuine native Android Studio project.

### Prerequisites
1. **Node.js** (Already installed on your system).
2. **Android Studio** (Free download from [developer.android.com/studio](https://developer.android.com/studio)).

### Step-by-Step Instructions

#### 1. Install Capacitor dependencies
Open PowerShell or your terminal in this project folder (`c:\xampp\htdocs\first android app`):
```bash
npm install
```

#### 2. Add the Android Native Platform
Run:
```bash
npx cap add android
```
> This creates an `android/` folder with complete native Gradle files, Java/Kotlin wrapper, and AndroidManifest.xml.

#### 3. Sync your Web Files into the Android Project
Whenever you edit your HTML, CSS, or JS, sync them with:
```bash
npx cap sync
```

#### 4. Open in Android Studio
```bash
npx cap open android
```
Android Studio will launch with your project loaded.

#### 5. Generate the APK or Google Play Bundle
* **To get a shareable APK immediately (for friends, WhatsApp, USB testing):**
  * In Android Studio, go to the top menu: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
  * Once finished, click **locate** in the pop-up notification.
  * Your ready-to-install file will be located at:
    `android/app/build/outputs/apk/debug/app-debug.apk`
  * You can send this `.apk` directly to any Android phone and install it!

* **To publish to Google Play Store:**
  * In Android Studio, go to: **Build > Generate Signed Bundle / APK**.
  * Select **Android App Bundle (.aab)**.
  * Create or choose your keystore key.
  * Click **Finish**. Android Studio will generate the signed `.aab` file ready to drag-and-drop into the **Google Play Console**!

---

## Method 2: PWABuilder (1-Click Cloud APK, No Android Studio Needed)
If you don't have Android Studio installed and want a quick APK generated online:

1. Deploy or host GANJI online (for example, free on GitHub Pages, Vercel, Netlify, or your own hosting).
2. Go to **[PWABuilder.com](https://www.pwabuilder.com/)**.
3. Paste your URL (e.g. `https://your-domain.com`) and click **Start**.
4. PWABuilder verifies your `manifest.json`, `sw.js`, and SVG icons.
5. Click **Package For Google Play**:
   * It builds your ready-to-upload Google Play Store `.aab` package and test `.apk` file for you to download instantly!

---

## Method 3: Google Bubblewrap (Command Line CLI)
Google's official CLI tool for packaging PWAs into Google Play Store packages:

```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest=https://your-domain.com/manifest.json
bubblewrap build
```
This generates the signed APK and Play Store release files automatically.
