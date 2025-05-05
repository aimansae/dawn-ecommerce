import dynamic from "next/dynamic";
import CheckoutFormSkeleton from "@/components/CheckoutFormSkeleton";
const CheckoutForm = dynamic(() => import("../../components/CheckoutForm"), {
  ssr: false,
  loading: () => <CheckoutFormSkeleton />,
});
const CheckoutPage = () => {
  return <CheckoutForm />;
};

export default CheckoutPage;
