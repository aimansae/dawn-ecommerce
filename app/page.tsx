import BackInStock from "@/components/BackInStock";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
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
