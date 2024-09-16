// src/app/api/users/profile/route.ts

import { connect } from "@/dbConfig/dbCongig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function GET(request: NextRequest) {
  try {
    // Extract the token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

    // Retrieve user data from the token
    const { id } = decodedToken as jwt.JwtPayload;

    // Find the user in the database
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Return the username of the current logged-in user
    return NextResponse.json({ username: user.username,
        id:user._id,email:user.email,
     }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    // Return an error response if an exception is thrown
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
