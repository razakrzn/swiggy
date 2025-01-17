import BestCities from "@/components/frontend/BestCities";
import BestCuisines from "@/components/frontend/BestCuisines";
import Footer from "@/components/frontend/Footer";
import Header from "@/components/frontend/Header";
import NearMe from "@/components/frontend/NearMe";
import OnlineDelivery from "@/components/frontend/OnlineDelivery";
import RestauratChain from "@/components/frontend/RestauratChain";
import Slider from "@/components/frontend/Slider";
import RestaurantsLayout from "./layout";

export default function Restaurant() {
  return (
    <RestaurantsLayout title="Best Restaurants in Your Area">
      <Header />
      <Slider />
      <RestauratChain />
      <OnlineDelivery />
      {/* <BestCities /> */}
      {/* <BestCuisines /> */}
      {/* <NearMe /> */}
      <Footer />
    </RestaurantsLayout>
  );
}
