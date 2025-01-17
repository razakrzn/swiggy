import BestCities from "@/components/frontend/BestCities";
import Footer2 from "@/components/frontend/Footer2";
import SpotlightHome from "@/components/frontend/SpotlightHome";
import { CustomerAuthProvider } from "@/contexts/CustomerAuthContext";

export default function Home() {
  return (
    <>
      <CustomerAuthProvider>
        <SpotlightHome />
        <BestCities />
        <Footer2 />
      </CustomerAuthProvider>
    </>
  );
}
