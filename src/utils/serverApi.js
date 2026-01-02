// Server-side API utility for Next.js server components
// This file is for server-side data fetching only

const getApiBaseUrl = () => {
  return process.env.NODE_ENV === "development" 
    ? process.env.NEXT_PUBLIC_API_DEV_URL 
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// Fetch homepage banner data
export async function fetchHomepageBanner() {
  try {
    const baseURL = getApiBaseUrl();
    const response = await fetch(`${baseURL}/cms-content/homepage_banner`, {
      // Use force-cache with revalidation for better performance
      // Revalidates every hour (3600 seconds) to keep content fresh
      cache: 'force-cache',
      next: { revalidate: 3600 },
      credentials: 'include',
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data?.json_content || null;
  } catch (error) {
    console.error('Error fetching homepage banner:', error);
    return null;
  }
}

// Fetch homepage content
export async function fetchHomePageContent() {
  try {
    const baseURL = getApiBaseUrl();
    const response = await fetch(`${baseURL}/cms-content/home_page_content_what_we_are`, {
      // Use force-cache with revalidation for better performance
      // Revalidates every hour to keep content fresh while improving load times
      cache: 'force-cache',
      next: { revalidate: 3600 },
      credentials: 'include',
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return [];
  }
}

// Fetch SEO data (non-critical, can be deferred)
export async function fetchSeoData() {
  try {
    const baseURL = getApiBaseUrl();
    const response = await fetch(`${baseURL}/content-manager/slug/design-idea`, {
      // SEO data changes less frequently, can cache longer
      cache: 'force-cache',
      next: { revalidate: 7200 }, // Revalidate every 2 hours
      credentials: 'include',
    });
    
    if (!response.ok) {
      return {};
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {};
  }
}

