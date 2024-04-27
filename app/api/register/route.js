import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req, res, next) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    
    const existingUser = await User.findOne({ email: email});

    if(existingUser){
      return NextResponse.json(
        { message: "User already exists. " },
        { status: 400 }
      );
    }

    await User.create({ name, email, password: hashedPassword });

    await connectMongoDB();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
