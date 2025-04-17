import BackInStock from "@/components/BackInStock";
import Hero from "@/components/Hero";
import OrderSuccessBanner from "@/components/OrderSuccessBanner";
import ProductList from "@/components/ProductList";
import Refinery from "@/components/Refinery";
import VideoPlayer from "@/components/VideoPlayer";
import data from "../app/data/productList.json";
import { transformProduct } from "./utils/transformProduct";

const HomePage = () => {
  const transformedProducts = data.products.map(transformProduct);
  const productsForMainPage = transformedProducts.slice(0, 8);
  return (
    <>
      <OrderSuccessBanner />
      <Hero />
      <ProductList productsForPage={productsForMainPage} />
      <BackInStock />
      <VideoPlayer />
      <Refinery />
    </>
  );
};

export default HomePage;
