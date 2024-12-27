import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import { CartProvider } from "./context/CartContext";

const Home = () => {
  return (
    <main>
      <Hero />
      <ProductList></ProductList>
    </main>
  );
};
export default Home;
