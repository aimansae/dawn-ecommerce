import React from "react";
import OrderConfirmation from "@/components/OrderConfirmation";
import { headers } from "next/headers";

const Page = async ({ params }: { params: { id: string } }) => {
  const host = headers().get("host"); // dynamically get current host
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/checkout/${params.id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return (
      <p className="bg-red-300 p-2 text-center">
        Order not found or failed to load.
      </p>
    );
  }
  const order = await res.json();
  return <OrderConfirmation order={order} params={params.id} />;
};

export default Page;
