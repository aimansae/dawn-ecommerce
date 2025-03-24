import BackInStock from "@/components/BackInStock";
import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import Refinery from "@/components/Refinery";
import VideoPlayer from "@/components/VideoPlayer";
const Home = () => {
  return (
    <main>
      <Hero />
      <ProductList />
      <BackInStock />
      <VideoPlayer />
      <Refinery />
    </main>
  );
};

export default Home;
