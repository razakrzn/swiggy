import BestCities from "@/components/BestCities";
import BestCuisines from "@/components/BestCuisines";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NearMe from "@/components/NearMe";
import OnlineDelivery from "@/components/OnlineDelivery";
import RestauratChain from "@/components/RestauratChain";
import Slider from "@/components/Slider";

export default function Restaurant() {
  return (
    <>
      <Header />
      <Slider />
      <RestauratChain />
      <OnlineDelivery />
      <BestCities />
      <BestCuisines />
      <NearMe />
      <Footer />
    </>
  );
}
