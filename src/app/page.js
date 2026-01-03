import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../../public/style/style.css";
import "../../public/style/style.css"
import MainLayout from "./layouts/MainLayout";
import Home from "./home/page";
import BootstrapClient from "./common/BootstrapClient";

export default function App() {
  return (
    <>
     <BootstrapClient />
     <MainLayout>
      <Home />
     </MainLayout>
    </>
  );
}
