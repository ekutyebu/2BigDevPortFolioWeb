import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { ContactEmail } from "@/components/emails/ContactEmail";
import { AutoReplyEmail } from "@/components/emails/AutoReplyEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // 1. Save to Database
    const savedMessage = await prisma.message.create({
      data: { name, email, subject, message },
    });

    // 2. Send Email to Owner
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Replace with your verified domain
      to: process.env.CONTACT_EMAIL || "your-email@example.com",
      subject: `New Contact: ${subject}`,
      react: ContactEmail({ name, email, subject, message }),
    });

    // 3. Send Auto-Reply to User
    await resend.emails.send({
      from: "2BigDev <onboarding@resend.dev>", // Replace with your verified domain
      to: email,
      subject: "Thanks for reaching out!",
      react: AutoReplyEmail({ name }),
    });

    return NextResponse.json({ success: true, id: savedMessage.id });
  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
