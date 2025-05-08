import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/libs/mongodb";
import Order from "@/models/Orders";
export async function POST(req: NextRequest) {
  try {
    const orderData = await req.json();
    await connectToMongoDB();
    const newOrder = await Order.create(orderData);
    console.log(orderData, "ORDER DATA");
    return NextResponse.json({
      success: true,
      message: "Order placed successfully!",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log("order error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send the order! Please try again",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToMongoDB();

    const orderList = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orderList);
  } catch (error) {
    console.error("Get orders", error);
    return NextResponse.json({ error: "Failed to fetch list of orders" });
  }
}
