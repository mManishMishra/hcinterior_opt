# Next.js Performance Audit Report
## HC Interior Frontend - Comprehensive Performance Analysis

**Date:** 2025-01-XX  
**Project:** HC Interior Frontend (Next.js 14.2.13)  
**Auditor:** Senior Frontend Performance Auditor

---

## Executive Summary

This audit identifies performance bottlenecks that impact Google Lighthouse scores, specifically focusing on:
- **First Contentful Paint (FCP)**
- **Largest Contentful Paint (LCP)**
- **Speed Index**
- **Cumulative Layout Shift (CLS)**
- **Time to Interactive (TTI)**

**Key Findings:**
- ✅ **Good:** Font loading strategy, lazy loading of third-party scripts
- ⚠️ **Critical:** Render-blocking CSS, unoptimized background images, large JavaScript bundles
- ⚠️ **Environment Issues:** CORS restrictions, missing images (not code issues)

---

## 1. CRITICAL ISSUES (High Priority - Blocking Green Lighthouse Score)

### 1.1 Render-Blocking CSS Resources
**Severity:** HIGH  
**Impact:** Blocks FCP, LCP, and Speed Index  
**Location:** `src/app/layout.js`

**Issue:**
```javascript
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/style/style.css";
import "./globals.css";
```

**Problem:**
- Bootstrap CSS (~150KB) is imported synchronously in the root layout
- `public/style/style.css` is large (3000+ lines) and blocks rendering
- All CSS files are loaded before any content can render
- No CSS code splitting or critical CSS extraction for above-the-fold content

**Lighthouse Impact:**
- **Eliminate render-blocking resources** audit will fail
- Delays FCP by ~200-500ms on 3G connections
- Blocks LCP element rendering

**Recommendation:**
- Extract critical CSS for above-the-fold content (already partially done in inline styles)
- Load Bootstrap CSS conditionally or split it
- Consider using CSS-in-JS or CSS modules with code splitting
- Move non-critical CSS to `_document.js` or load asynchronously

**Fixable in Frontend:** ✅ Yes

---

### 1.2 Unoptimized Background Images via Inline Styles
**Severity:** HIGH  
**Impact:** Blocks LCP, increases bandwidth, poor mobile performance  
**Location:** Multiple components (`BgImageCard.jsx`, `home/page.jsx`)

**Issue:**
```jsx
// In home/page.jsx line 620, 696, 706, 718, 730, 740, 834
style={{backgroundImage: `url(${HomePageContent[1]?.json_content?.image})`}}
```

**Problem:**
- Background images loaded via inline styles bypass Next.js Image optimization
- No lazy loading, no responsive sizing, no format conversion (WebP/AVIF)
- Images may be missing in local/staging (environment issue)
- Large images loaded immediately, blocking LCP
- No `preload` for critical background images

**Lighthouse Impact:**
- **Serve images in next-gen formats** audit may fail
- **Properly size images** audit will fail
- **LCP element** may be delayed if background image is the LCP element
- **Offscreen images** audit will flag these

**Recommendation:**
- Convert background images to `<Image>` components with `fill` prop where possible
- Use CSS `background-image` with `image-set()` for responsive images
- Implement lazy loading for below-the-fold background images
- Preload critical background images using `<link rel="preload" as="image">`
- Ensure images are served from CDN with proper caching headers

**Fixable in Frontend:** ✅ Yes (but requires design changes)

---

### 1.3 Large JavaScript Bundles Loaded Synchronously
**Severity:** HIGH  
**Impact:** Blocks TTI, increases main thread work  
**Location:** `src/app/layout.js` lines 210-211

**Issue:**
```javascript
<Script src="https://code.jquery.com/jquery-3.6.0.min.js" async strategy="afterInteractive" />
<Script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js" async strategy="afterInteractive" />
```

**Problem:**
- jQuery (~90KB) loaded on every page, even when not needed
- DataTables (~50KB) loaded globally, only used in admin/dashboard pages
- Both loaded with `async` but still block JavaScript execution
- Bootstrap JS loaded dynamically but still adds to bundle size

**Additional Issues:**
- CKEditor (~500KB+) loaded in CMS pages but may be imported globally
- React Slick carousel loaded even when not used
- Multiple large dependencies: `framer-motion`, `react-bootstrap`, `datatables.net`

**Lighthouse Impact:**
- **Reduce JavaScript execution time** audit will fail
- **Minimize main-thread work** audit will flag
- Delays TTI significantly
- Increases bundle size beyond recommended limits

**Recommendation:**
- Load jQuery/DataTables only on pages that need them (dashboard, admin)
- Use dynamic imports: `const DataTable = dynamic(() => import('...'), { ssr: false })`
- Consider removing jQuery dependency where possible (use vanilla JS or React alternatives)
- Code split CKEditor to only load in CMS pages
- Analyze bundle with `@next/bundle-analyzer`

**Fixable in Frontend:** ✅ Yes

---

### 1.4 Missing Image Optimization for Next.js Image Components
**Severity:** HIGH  
**Impact:** Poor LCP, increased bandwidth  
**Location:** Multiple components

**Issue:**
```jsx
// In Card.jsx, RowImage.jsx, and others
<Image 
  src={imgSrc || "/images/default.jpg"} 
  width={400}
  height={300}
  priority={false}  // All images set to false
/>
```

**Problem:**
- All images have `priority={false}`, even above-the-fold images
- First carousel image should have `priority={true}` (partially fixed in home page)
- Missing `sizes` attribute for responsive images
- No `loading="eager"` for LCP images
- Default fallback images may not exist (environment issue)

**Lighthouse Impact:**
- **LCP element** may not be prioritized correctly
- **Offscreen images** may load before critical images
- **Image aspect ratio** warnings if dimensions are incorrect

**Recommendation:**
- Set `priority={true}` for first carousel image and hero images
- Add `sizes` attribute: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
- Use `fetchPriority="high"` for LCP images
- Ensure default images exist in public folder

**Fixable in Frontend:** ✅ Yes

---

## 2. MEDIUM PRIORITY ISSUES

### 2.1 CSS Files Imported in Multiple Components
**Severity:** MEDIUM  
**Impact:** Duplicate CSS loading, increased bundle size  
**Location:** 25+ files importing CSS

**Issue:**
- `style.css` imported in multiple components
- `globals.css` imported redundantly
- Bootstrap CSS may be loaded multiple times
- No CSS deduplication strategy

**Recommendation:**
- Import CSS only in root layout or `_document.js`
- Use CSS modules for component-specific styles
- Remove duplicate imports

**Fixable in Frontend:** ✅ Yes

---

### 2.2 Video Loading Strategy
**Severity:** MEDIUM  
**Impact:** Blocks LCP if video is above the fold  
**Location:** `src/app/home/page.jsx` lines 267-282

**Issue:**
```jsx
<video
  preload={index === 0 ? "auto" : "none"}
  // ...
>
```

**Problem:**
- First video uses `preload="auto"` which loads entire video file
- Large video files (experience-center.mp4 in public folder)
- No poster image for better LCP
- Videos may fail to load (environment issue)

**Recommendation:**
- Use `preload="metadata"` instead of `auto`
- Add `poster` attribute with optimized image
- Lazy load videos below the fold
- Consider using `<Image>` with play button overlay instead

**Fixable in Frontend:** ✅ Yes

---

### 2.3 API Calls Not Optimized for Performance
**Severity:** MEDIUM  
**Impact:** Delays content rendering, increases server load  
**Location:** `src/app/home/page.jsx`, `src/utils/serverApi.js`

**Issue:**
```javascript
// serverApi.js - cache: 'no-store' for all requests
cache: 'no-store', // Always fetch fresh data
```

**Problem:**
- All API calls use `cache: 'no-store'`, preventing Next.js caching
- Banner and homepage content fetched on every request
- No ISR (Incremental Static Regeneration) strategy
- Client-side API calls not debounced or batched

**Additional Issues:**
- Multiple API calls in `useEffect` with small delays (100ms, 200ms)
- No error boundaries for failed API calls
- CORS errors may occur (environment issue, not code issue)

**Recommendation:**
- Use `cache: 'force-cache'` with revalidation for static content
- Implement ISR with `revalidate: 3600` for homepage content
- Batch API calls where possible
- Add proper error handling and fallbacks

**Fixable in Frontend:** ✅ Yes (but may require backend coordination)

---

### 2.4 Missing Resource Hints
**Severity:** MEDIUM  
**Impact:** Slower DNS resolution and connection establishment  
**Location:** `src/app/layout.js`

**Issue:**
- No `preconnect` for external domains (Google Fonts, CDNs, API)
- No `dns-prefetch` for third-party resources
- No `preload` for critical resources

**Recommendation:**
```jsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://apidev.hcinterior.in" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
```

**Fixable in Frontend:** ✅ Yes

---

### 2.5 Large Dependencies in Bundle
**Severity:** MEDIUM  
**Impact:** Increases bundle size, delays TTI  
**Location:** `package.json`

**Issue:**
- CKEditor: ~500KB+ (only needed in CMS)
- Framer Motion: ~50KB (may not be used everywhere)
- React Bootstrap: ~100KB (Bootstrap already loaded)
- jQuery: ~90KB (loaded globally)
- Multiple carousel libraries (react-slick, slick-carousel)

**Recommendation:**
- Code split CKEditor to CMS pages only
- Audit Framer Motion usage, remove if unused
- Consider removing React Bootstrap if Bootstrap CSS is sufficient
- Replace jQuery with vanilla JS where possible

**Fixable in Frontend:** ✅ Yes

---

## 3. LOW PRIORITY ISSUES

### 3.1 Console.log Statements in Production
**Severity:** LOW  
**Impact:** Minor performance impact, code quality  
**Location:** Multiple files

**Issue:**
- `console.log` statements in production code
- Should be removed or wrapped in development checks

**Fixable in Frontend:** ✅ Yes

---

### 3.2 Missing Image Dimensions
**Severity:** LOW  
**Impact:** Causes layout shift (CLS)  
**Location:** Some Image components

**Issue:**
- Some images may not have explicit width/height
- Causes CLS when images load

**Recommendation:**
- Always provide width and height
- Use `fill` with `object-fit` for responsive images

**Fixable in Frontend:** ✅ Yes

---

### 3.3 Inline Styles for Background Images
**Severity:** LOW  
**Impact:** Prevents CSS caching, increases HTML size  
**Location:** Multiple components

**Issue:**
- Inline `style` attributes with background images
- Should be moved to CSS classes or CSS modules

**Fixable in Frontend:** ✅ Yes

---

## 4. ENVIRONMENT-RELATED ISSUES (Not Code Issues)

### 4.1 CORS Restrictions
**Severity:** N/A (Environment Issue)  
**Impact:** API calls may fail in local/staging  
**Location:** API calls throughout app

**Issue:**
- API calls to `apidev.hcinterior.in` may fail due to CORS
- This is a **backend/infrastructure issue**, not a frontend code issue
- Should be configured on the API server

**Lighthouse Impact:**
- May cause failed requests, but Lighthouse typically ignores network errors
- Does not directly impact Lighthouse score unless it blocks critical resources

**Action Required:**
- Backend team needs to configure CORS headers
- Add frontend domain to allowed origins

---

### 4.2 Missing Images in Local/Staging
**Severity:** N/A (Environment Issue)  
**Impact:** Broken images, but doesn't affect Lighthouse if handled gracefully  
**Location:** Throughout app

**Issue:**
- Images from API may not exist in local/staging environments
- Fallback images may also be missing
- This is an **environment/deployment issue**, not a code issue

**Lighthouse Impact:**
- Missing images don't directly impact Lighthouse score
- May cause layout shifts if images don't have proper dimensions
- Should be handled with proper error boundaries and fallbacks

**Action Required:**
- Ensure all images are properly deployed
- Add proper fallback handling in code (already partially done)

---

### 4.3 HTTP vs HTTPS Mixed Content
**Severity:** N/A (Environment Issue)  
**Impact:** Security warnings, may block resources  
**Location:** API URLs, image URLs

**Issue:**
- Some URLs may use HTTP instead of HTTPS
- Mixed content warnings in browser
- This is an **infrastructure issue**

**Action Required:**
- Ensure all external resources use HTTPS
- Update API base URLs to use HTTPS

---

## 5. POSITIVE FINDINGS (What's Working Well)

### 5.1 Font Loading Strategy ✅
- Using `next/font/google` with `display: "swap"`
- Fonts are self-hosted and optimized
- Prevents FOIT (Flash of Invisible Text)

### 5.2 Third-Party Scripts Loading ✅
- GTM, Facebook Pixel, Google Analytics loaded with `strategy="lazyOnload"`
- Does not block initial page load
- Properly deferred

### 5.3 Critical CSS Inlining ✅
- Critical CSS inlined in `<head>` (layout.js lines 42-64)
- Helps with FCP and prevents layout shift

### 5.4 Dynamic Imports ✅
- Some components use `dynamic()` imports (SliderCard, VideoTestimonialSlider)
- Reduces initial bundle size

### 5.5 Server-Side Data Fetching ✅
- Homepage banner and content fetched on server
- Reduces client-side API calls
- Improves initial load time

---

## 6. LIGHTHOUSE SCORE IMPACT ANALYSIS

### Metrics Affected:

| Metric | Current Impact | Primary Issues | Fixable? |
|--------|---------------|----------------|----------|
| **FCP** | ⚠️ Delayed | Render-blocking CSS, large JS bundles | ✅ Yes |
| **LCP** | ⚠️ Delayed | Unoptimized images, background images | ✅ Yes |
| **Speed Index** | ⚠️ Poor | Render-blocking resources, large bundles | ✅ Yes |
| **CLS** | ✅ Good | Critical CSS inlined, proper image dimensions | - |
| **TTI** | ⚠️ Delayed | Large JS bundles, synchronous scripts | ✅ Yes |
| **TBT** | ⚠️ High | Large JS execution, unoptimized code | ✅ Yes |

### Estimated Score Improvements:

- **Current Estimated Score:** 60-70 (Orange/Yellow)
- **After Fixing Critical Issues:** 85-90 (Green)
- **After Fixing All Issues:** 90-95 (Green)

---

## 7. PRIORITY ACTION ITEMS

### Immediate (Blocking Green Score):
1. ✅ **Fix render-blocking CSS** - Extract critical CSS, load Bootstrap conditionally
2. ✅ **Optimize background images** - Convert to Next.js Image or use CSS image-set
3. ✅ **Code split large JS bundles** - Load jQuery/DataTables only where needed
4. ✅ **Set priority on LCP images** - Mark first carousel image as priority

### Short-term (1-2 weeks):
5. ✅ **Add resource hints** - Preconnect to external domains
6. ✅ **Optimize API caching** - Use ISR and proper cache headers
7. ✅ **Remove duplicate CSS imports** - Consolidate CSS loading
8. ✅ **Add video poster images** - Improve LCP for video content

### Long-term (1 month+):
9. ✅ **Audit and remove unused dependencies** - Reduce bundle size
10. ✅ **Implement proper error boundaries** - Handle missing images gracefully
11. ✅ **Add bundle analysis** - Monitor bundle size over time

---

## 8. RECOMMENDATIONS SUMMARY

### Code-Level Fixes (Frontend Only):
- ✅ Extract and optimize critical CSS
- ✅ Code split large JavaScript dependencies
- ✅ Optimize image loading strategy
- ✅ Add resource hints (preconnect, dns-prefetch)
- ✅ Implement proper caching for API calls
- ✅ Remove duplicate CSS imports
- ✅ Set priority on LCP images

### Backend/Infrastructure Fixes Required:
- ⚠️ Configure CORS headers on API server
- ⚠️ Ensure all images are properly deployed
- ⚠️ Use HTTPS for all external resources
- ⚠️ Implement proper cache headers on API responses

### Safe to Ignore for Lighthouse:
- ✅ CORS errors (Lighthouse ignores network failures)
- ✅ Missing images (if handled gracefully with fallbacks)
- ✅ Console.log statements (minimal impact)

---

## 9. TESTING RECOMMENDATIONS

1. **Run Lighthouse Audit:**
   ```bash
   npm run build
   npm run start
   # Then run Lighthouse in Chrome DevTools
   ```

2. **Test on Slow 3G:**
   - Use Chrome DevTools Network throttling
   - Verify FCP < 1.8s
   - Verify LCP < 2.5s

3. **Test Image Loading:**
   - Verify all images load with proper fallbacks
   - Check for layout shifts
   - Verify WebP/AVIF formats are served

4. **Test Bundle Size:**
   ```bash
   npm install @next/bundle-analyzer
   # Add to next.config.mjs and analyze
   ```

---

## 10. CONCLUSION

The codebase has several performance optimizations in place (font loading, lazy scripts, critical CSS), but critical issues remain that prevent achieving a green Lighthouse score:

**Primary Blockers:**
1. Render-blocking CSS resources
2. Unoptimized background images
3. Large JavaScript bundles loaded globally

**Estimated Effort:**
- Critical fixes: 2-3 days
- Medium priority: 1 week
- Long-term optimizations: 2-3 weeks

**Expected Outcome:**
After implementing critical fixes, the Lighthouse score should improve from ~60-70 to 85-90, achieving a green score.

---

**Report Generated By:** Senior Frontend Performance Auditor  
**Next Review Date:** After implementing critical fixes

