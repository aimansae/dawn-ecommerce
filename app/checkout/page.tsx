import dynamic from "next/dynamic";
import CheckoutFormSkeleton from "@/components/CheckoutFormSkeleton";

const CheckoutPage = () => {
  const CheckoutForm = dynamic(() => import("../../components/CheckoutForm"), {
    ssr: false,
    loading: () => <CheckoutFormSkeleton />,
  });
  return <CheckoutForm />;
};

export default CheckoutPage;
