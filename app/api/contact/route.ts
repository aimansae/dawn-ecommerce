import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/libs/mongodb";
import Contact from "@/models/Contact";
export async function POST(req: NextRequest) {
  try {
    const contactFormData = await req.json();
    await connectToMongoDB();
    const newContactForm = await Contact.create(contactFormData);
    return NextResponse.json({
      success: true,
      message:
        "We received your message, we will respond within 3 business days",
      contactId: newContactForm._id,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        message: "Ops something went wrong",
      },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await connectToMongoDB();
    const contactMessageList = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contactMessageList);
  } catch (error) {
    console.error("Get messages", error);
    return NextResponse.json({ error: "Failed to fetch list of messages" });
  }
}
