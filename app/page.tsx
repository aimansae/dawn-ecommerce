import BackInStock from "@/components/BackInStock";
import Hero from "@/components/Hero";
import OrderSuccessBanner from "@/components/OrderSuccessBanner";
import ProductList from "@/components/ProductList";
import Refinery from "@/components/Refinery";
import VideoPlayer from "@/components/VideoPlayer";
const Home = () => {
  return (
    <main>
      <OrderSuccessBanner />
      <Hero />
      <ProductList />
      <BackInStock />
      <VideoPlayer />
      <Refinery />
    </main>
  );
};

export default Home;
