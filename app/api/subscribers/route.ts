import { NextRequest, NextResponse } from "next/server";
import Subscriber from "@/models/Subscriber";
import connectToMongoDB from "@/libs/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    await connectToMongoDB();

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "Already Subscribed" },
        { status: 400 }
      );
    }
    await Subscriber.create({ email });
    return NextResponse.json({ message: "Subscribed" }, { status: 201 });
  } catch (error) {
    console.error("APi Error,", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToMongoDB();

    const subscribersList = await Subscriber.find().sort({ createdAt: -1 });
    return NextResponse.json(subscribersList);
  } catch (error) {
    console.error("Get subscribers error", error);
    return nextResponse.json({ error: "Failed to fetch list of subscribers" });
  }
}
