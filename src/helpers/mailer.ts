import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

interface EmailProps {
  email: string;
  emailType: "VERIFY" | "RESET";
  userID: string;
}

export const sendEmail = async ({ email, emailType, userID }: EmailProps) => {
  try {
    // Create hashed token
    const hashedToken = await bcryptjs.hash(userID.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry: new Date(Date.now() + 3600000), // 1 hour expiry
      });
    }

    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: new Date(Date.now() + 3600000), // 1 hour expiry
      });
    }

    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e0e0aad041d164",
          pass: "eef69e3f780468"
        }
      });

    const mailOptions = {
      from: "rohithbn27@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
      Or copy and paste the link below in your browser:<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
    };

    // Send email
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
