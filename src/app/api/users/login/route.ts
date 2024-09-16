import { connect } from "@/dbConfig/dbCongig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody)

        // Check if the user exists
        const user = await User.findOne({ email });
        console.log("user found")
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Validate the password
        const isValidPassword = await bcryptjs.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        // Creating token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        };

        // Creating the token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "2d" });

        // Sending the response with the token
        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error: any) {
        console.log("Error in POST /api/users/login:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
