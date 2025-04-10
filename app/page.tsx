import BackInStock from "@/components/BackInStock";
import Hero from "@/components/Hero";
import OrderSuccessBanner from "@/components/OrderSuccessBanner";
import ProductList from "@/components/ProductList";
import Refinery from "@/components/Refinery";
import VideoPlayer from "@/components/VideoPlayer";
const HomePage = () => {
  return (
    <>
      <OrderSuccessBanner />
      <Hero />
      <ProductList />
      <BackInStock />
      <VideoPlayer />
      <Refinery />
    </>
  );
};

export default HomePage;
