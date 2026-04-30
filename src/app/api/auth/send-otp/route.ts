import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password use karein
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Verification Code for BlogNews",
      html: `<div style="font-family: sans-serif; text-align: center;">
              <h2>Welcome to BlogNews</h2>
              <p>Your verification code is:</p>
              <h1 style="color: #2563eb;">${otp}</h1>
            </div>`,
    });

    // Yahan Database mein OTP save karne ka logic likhein (e.g., Prisma)
    return NextResponse.json({ message: "OTP Sent Successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}