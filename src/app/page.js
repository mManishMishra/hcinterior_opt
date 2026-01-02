// CSS is now loaded centrally in layout.js to prevent duplicate imports
// This improves performance by reducing bundle size and preventing render-blocking
import MainLayout from "./layouts/MainLayout";
import Home from "./home/page";
import BootstrapTooltips from "./common/BootstrapTooltips";
import { fetchHomepageBanner, fetchHomePageContent } from "@/utils/serverApi";

// Generate metadata for SEO and social sharing
export async function generateMetadata() {
  return {
    title: "Top Interior Designers In Delhi NCR For Home",
    description: "Home interior designers in Delhi NCR - Elevate your living space with best interior design company in Noida & Delhi NCR. Book free consultation today",
    keywords: "interior designers, home interior, Delhi NCR, Noida, Gurgaon, interior design company",
    alternates: {
      canonical: "https://hcinterior.in",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://hcinterior.in",
      siteName: "High Creation Interior",
      title: "Top Interior Designers In Delhi NCR For Home",
      description: "Home interior designers in Delhi NCR - Elevate your living space with best interior design company in Noida & Delhi NCR. Book free consultation today",
      images: [
        {
          url: "https://apidev.hcinterior.in/uploads/cms-content/image-1742221446171-185128721.png",
          width: 624,
          height: 380,
          alt: "best interior designers in noida and gurugram",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Top Interior Designers In Delhi NCR For Home",
      description: "Home interior designers in Delhi NCR - Elevate your living space with best interior design company in Noida & Delhi NCR. Book free consultation today",
      images: ["https://hcinterior.in/images/new_hc_logo.png"],
      creator: "@HighCreationInterior",
    },
    other: {
      'article:published_time': '2022-03-31T06:00:17+00:00',
      'article:modified_time': '2025-06-07T13:03:32+00:00',
      'twitter:label1': 'Written by',
      'twitter:data1': 'High Creation Interior',
      'twitter:label2': 'Time to read',
      'twitter:data2': '6 minutes',
    },
  };
}

export default async function App() {
  // Fetch critical data on server-side
  const [bannerData, homePageContent] = await Promise.all([
    fetchHomepageBanner(),
    fetchHomePageContent(),
  ]);

  return (
    <>
     <MainLayout>
      <Home 
        initialBannerData={bannerData}
        initialHomePageContent={homePageContent}
      />
      <BootstrapTooltips />
     </MainLayout>
    </>
  );
}
