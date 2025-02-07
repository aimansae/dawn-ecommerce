import BackInStock from "@/components/BackInStock";
import Hero from "@/components/Hero";
import ProductBySearch from "@/components/ProductBySearch";
import ProductList from "@/components/ProductList";

const Home = () => {
  return (
    <main>
      <Hero />
      <ProductList />
      <BackInStock />
    </main>
  );
};
export default Home;
