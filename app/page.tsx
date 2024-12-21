import Header from "@/components/Header";
import Hero from "@/components/Hero";

const Home = () => {
  return (
    <main className="relative z-50">
      <div className="py-3 bg-white text-center ">
        <p className="text-xs text-customBlack">
          Free shipping available on all orders!
        </p>
      </div>
      <Header />
      <Hero />
    </main>
  );
};
export default Home;
