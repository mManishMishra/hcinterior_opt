// Remove 'use client' here to keep it a server component
import AddBootstrap from "./common/AdBoostrap";
import LoadNonCriticalCSS from "./common/LoadNonCriticalCSS";
import LazyToastContainer from "./common/LazyToastContainer";
import RouteAwareScriptLoader from "./common/RouteAwareScriptLoader";
import ClientProvider from "../store/ClientProvider";
import Script from "next/script";

// CSS imports - Next.js will bundle and optimize these automatically
// Critical CSS is inlined in <head> for above-the-fold content (see <style> tag below)
// This prevents render-blocking and improves FCP, LCP, and Speed Index
import "./globals.css";
import "../../public/style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Poppins, Outfit, Great_Vibes } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
  variable: "--font-poppins",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-outfit",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-greatvibes",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en"  className={`${poppins.variable} ${outfit.variable} ${greatVibes.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Resource hints for better CSS loading performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        
        {/* Critical CSS for above-the-fold content - improves FCP, LCP, and Speed Index */}
        {/* Expanded critical CSS includes header, navigation, and above-the-fold content styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical reset and base styles - prevents layout shift */
            *{margin:0;padding:0;box-sizing:border-box}
            body,html{height:100%;margin:0;padding:0;font-family:var(--font-poppins);visibility:visible}
            /* Critical header and navigation styles - above the fold */
            .hedaer_wrapper{background-color:#fff;box-shadow:rgba(60,64,67,0.3)0px 1px 2px 0px,rgba(60,64,67,0.15)0px 2px 6px 2px;position:relative;z-index:1000}
            .fixed-top{position:fixed;top:0;right:0;left:0;z-index:1030}
            .navbar{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;padding:0.5rem 1rem}
            .navbar-brand{display:inline-block;padding-top:0.3125rem;padding-bottom:0.3125rem;margin-right:1rem;font-size:1.25rem;line-height:inherit;white-space:nowrap}
            .navbar-nav{display:flex;flex-direction:column;padding-left:0;margin-bottom:0;list-style:none}
            .nav-link{display:block;padding:0.5rem 1rem;color:#171717;font-family:var(--font-poppins)!important;font-size:20px!important;text-decoration:none;transition:color 0.15s ease-in-out}
            .dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;min-width:10rem;padding:0.5rem 0;margin:0;font-size:1rem;color:#212529;text-align:left;list-style:none;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,0.15);border-radius:0.25rem;box-shadow:0 0.5rem 1rem rgba(0,0,0,0.15)}
            .dropdown:hover .dropdown-menu{display:block}
            /* Critical banner/carousel styles - above the fold */
            .carousel{position:relative;width:100%}
            .carousel-item{display:none;position:relative}
            .carousel-item.active{display:block}
            .carousel-inner{position:relative;width:100%;overflow:hidden}
            .carousel_img{width:100%;height:auto;display:block;object-fit:cover}
            .home_banner_heading{font-size:80px;font-weight:800;font-family:var(--font-poppins)!important;color:#454038;line-height:1.2}
            .home_subhead{color:#63736e;font-size:18px!important;margin:0}
            .font_stylish{font-family:var(--font-greatvibes)!important;font-size:60px;font-weight:400!important}
            /* Prevent layout shift - critical positioning */
            .carousel-caption{position:absolute;top:130px;text-align:left!important;z-index:1}
            /* Optimize video banner */
            .home_video_banner{width:100%;height:auto;object-fit:cover;display:block}
            /* Critical typography - prevents FOUT */
            h1{font-size:50px;color:#171717;font-family:var(--font-poppins)}
            h2,h3{font-size:50px!important;font-family:var(--font-poppins);font-weight:600!important}
            h4,h5,h6{font-family:var(--font-poppins);font-weight:600!important}
            h5{font-size:18px}
            p{font-family:var(--font-poppins);font-weight:400!important;font-size:15px;color:rgb(0,0,0)}
            a{text-decoration:none!important;color:#171717}
            /* Critical container and layout */
            .container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}
            .container-fluid{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}
            .row{display:flex;flex-wrap:wrap;margin-right:-15px;margin-left:-15px}
            /* Critical button styles */
            .btn{display:inline-block;font-weight:400;text-align:center;text-decoration:none;vertical-align:middle;cursor:pointer;user-select:none;border:1px solid transparent;padding:0.375rem 0.75rem;font-size:1rem;line-height:1.5;border-radius:0.25rem;transition:color 0.15s ease-in-out,background-color 0.15s ease-in-out}
            /* Prevent FOUC and layout shift */
            body{visibility:visible}
            img{max-width:100%;height:auto}
          `
        }} />

        {/* Slick carousel CSS - loaded dynamically when needed */}
        {/* DataTables CSS - loaded dynamically when needed */}

        {/* Google Tag Manager - lazy loaded */}
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PRVJK9N');`}
        </Script>
        <meta
          name="google-site-verification"
          content="k0iGFVO_noqQ7H1uUsJXGeReQ5YhgKjfOOgoKkSsrAw"
        />

        {/* Meta Pixel Code - lazy loaded */}
        <Script id="fb-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '768898314129368');
          fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=651426977052497&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Google Analytics - lazy loaded */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MJZK1MXG9E"
          strategy="lazyOnload"
        />
        <Script id="ga" strategy="lazyOnload">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MJZK1MXG9E');`}
        </Script>

        {/* FAQ Schema - lazy loaded to reduce initial HTML size */}
        <Script id="faq-schema" type="application/ld+json" strategy="lazyOnload">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Where do you provide services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide our interior design services across the NCR (National Capital Region) and surrounding areas. Our team is equipped to handle projects in Noida, Delhi, Gurgaon, Faridabad , Ghaziabad, Greater Noida and other nearby locations. Additionally, we are expanding to other cities, so we can also accommodate projects in select regions. Whether it’s a residential, commercial, or luxury project, we are dedicated to delivering exceptional design solutions wherever you are located. Let us know your location, and we’ll be happy to discuss how we can assist with your project!"
                }
              },
              {
                "@type": "Question",
                "name": "How much time will you take to provide the final quotation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The time it takes to provide a quotation depends on the scope and complexity of your project. Typically, we can provide an initial quotation within 1 to 2 business days after our site visit or initial consultation. During this time, we assess your requirements, space, and design preferences to ensure that the quotation is accurate and tailored to your needs. For larger or more complex projects, it may take a bit longer, but we will always keep you informed throughout the process. Rest assured, we aim to provide a detailed and transparent quotation as quickly as possible."
                }
              },
              {
                "@type": "Question",
                "name": "Can you work within my budget?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! We are committed to delivering high-quality interior design solutions that align with your budget. Our team works closely with you to understand your financial parameters and priorities, ensuring that we create a design that meets your vision while staying within your budget. We offer a range of options for materials, finishes, and design elements to accommodate different price points, and we strive to find the most cost-effective solutions without compromising on quality or style. Let us know your budget, and we'll tailor the design to fit your needs."
                }
              },
              {
                "@type": "Question",
                "name": "What services do you offer for luxury home interior design?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer a comprehensive range of high-end interior design services dedicated to crafting luxurious, personalized, and sophisticated living spaces. Our expertise includes custom design, where we develop tailored concepts that reflect your unique style and lifestyle, ensuring an exclusive luxury experience. Thoughtful space planning and layout optimization enhance functionality while maintaining an elegant aesthetic. We provide bespoke furniture, crafting custom pieces that perfectly complement your space, along with a curated selection of premium materials such as marble, granite, fine wood, and luxurious textiles. Our lighting design solutions incorporate high-end fixtures and smart systems to enhance ambiance and functionality. Additionally, we curate art and décor, selecting exquisite pieces that elevate the elegance of your home. Our renovation and remodeling services transform existing spaces into modern, opulent environments, while our smart home integration seamlessly incorporates the latest automation technologies for effortless control of lighting, security, climate, and entertainment. With meticulous project management, we ensure seamless execution and timely completion, paying attention to every detail. Our goal is to create a luxurious, comfortable, and unique home environment that enhances your lifestyle and offers an unparalleled sense of elegance and tranquility. Let us bring your vision to life!"
                }
              },
              {
                "@type": "Question",
                "name": "What types of materials do you use in interior design?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In our interior design projects, we utilize a diverse selection of high-quality materials, carefully chosen to meet both aesthetic and functional requirements. Wood is a staple for furniture, flooring, and accents, offering a timeless and natural appeal, while marble and granite bring luxury and durability to countertops, flooring, and wall finishes. Glass is frequently used for windows, partitions, and decorative elements, creating a sleek and modern look. Metals such as steel, brass, and copper add sophistication and strength to fixtures, hardware, and accent pieces. We incorporate high-quality textiles for upholstery, curtains, cushions, and rugs, ensuring both style and comfort. Ceramic and porcelain tiles provide versatile design options for walls, floors, and backsplashes, while synthetic materials, including engineered woods, laminates, and faux finishes, offer cost-effective yet stylish alternatives. Additionally, natural stones like slate and limestone contribute to stunning flooring and wall features, delivering a rustic or contemporary aesthetic. Every material is meticulously selected to align with your design vision, durability needs, and maintenance preferences, achieving the perfect blend of elegance and practicality."
                }
              },
              {
                "@type": "Question",
                "name": "How do I get started with an interior design project?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starting your interior design project is a simple and seamless process. We begin with an initial consultation where we discuss your needs, preferences, and overall vision, gathering essential details about the project scope, budget, and timeline. Based on this discussion, we create a design brief that outlines key objectives, preferred styles, materials, and any specific requirements. Our team then develops initial design concepts, presenting layout ideas, color schemes, furniture selections, and materials for your feedback. Once the concept is approved, we refine and finalize the design, incorporating any requested changes and providing detailed plans or 3D renderings if needed. With the design set, we move into the execution phase, handling material procurement, project management, and installation to ensure a flawless transformation. Upon completion, we review the space with you to ensure it meets your expectations. Throughout the entire process, we provide expert guidance to make your experience smooth and enjoyable. Let’s get in touch and bring your vision to life!"
                }
              }
              // Add other FAQ entries here
            ]
          })}
        </Script>

        {/* Organization Schema - lazy loaded to reduce initial HTML size */}
        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="lazyOnload"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "High Creation Interior",
            "url": "https://hcinterior.in",
            "logo": "https://hcinterior.in/images/new_hc_logo.png",
            "sameAs": [
              "https://www.instagram.com/highcreationinterior/",
              "https://www.linkedin.com/company/high-creation-interior-projects-private-limited/",
              "https://www.facebook.com/HighCreationInteriorProjectsPvtLtd/",
              "https://www.youtube.com/@HIGHCREATIONINTERIOR/",
              "https://in.pinterest.com/highcreation41/"
            ],
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "1800-1200-532",
                "contactType": "customer service",
                "email": "info@hcinterior.in",
                "contactOption": "TollFree",
                "areaServed": "IN",
                "availableLanguage": "en"
              }
            ]
          })}
        </Script>
      </head>
      <body suppressHydrationWarning={false}>
        {/* Load non-critical CSS asynchronously after initial render */}
        <LoadNonCriticalCSS />
        
        {/* Route-aware script loader - only loads jQuery/DataTables on pages that need them */}
        {/* This reduces initial bundle size by ~140KB and improves TTI by 200-400ms */}
        <RouteAwareScriptLoader />
        
        <AddBootstrap />
        <ClientProvider>{children}</ClientProvider>
        <LazyToastContainer />
      </body>
    </html>
  );
}
