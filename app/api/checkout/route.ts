import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app", "data", "orders.json");
console.log("logging filePath", filePath);
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("body is", data);
    // check existing orders
    const existingOrders = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];

    // add new orders

    const newOrder = { ...data, createdAt: new Date().toString() };
    const updateOrders = [...existingOrders, newOrder];
    console.log("newOrder", newOrder, updateOrders);
    console.log("log DATA", data);
    // save orders to the file
    fs.writeFileSync(filePath, JSON.stringify(updateOrders, null, 2));

    return NextResponse.json({
      success: true,
      message: "Order placed successfully!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send the order! Please try again",
      },
      { status: 500 }
    );
  }
}
