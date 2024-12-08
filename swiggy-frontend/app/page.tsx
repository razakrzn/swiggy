import BestCities from "@/components/BestCities";
import Footer2 from "@/components/Footer2";
import Spotlight from "@/components/SpotlightHomePage";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Spotlight />
      <BestCities />
      <Footer2 />
    </>
  );
}
