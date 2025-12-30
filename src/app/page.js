import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../../public/style/style.css";
import "../../public/style/style.css"
import MainLayout from "./layouts/MainLayout";
import Home from "./home/page";
import BootstrapTooltips from "./common/BootstrapTooltips";
import { fetchHomepageBanner, fetchHomePageContent } from "@/utils/serverApi";

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
