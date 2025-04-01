import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app", "data", "subscribers.json");
console.log("subscribers path", filePath);
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    const existingData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];
    const updatedData = [...existingData, { email }];
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    return NextResponse.json({
      success: true,
      message: "You are now subscribed!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
