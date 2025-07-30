import BestCities from "@/components/frontend/BestCities";
import Footer from "@/components/frontend/Footer";
import SpotlightHome from "@/components/frontend/SpotlightHome";
import { CustomerAuthProvider } from "@/contexts/CustomerAuthContext";

export default function Home() {
  return (
    <>
      <CustomerAuthProvider>
        <SpotlightHome />
        <BestCities />
        <Footer />
      </CustomerAuthProvider>
    </>
  );
}
