import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req, res, next) {
  try {
    await connectMongoDB();

    const users = await User.find();
    return NextResponse.json(
      { users },
      { message: "User data found successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
