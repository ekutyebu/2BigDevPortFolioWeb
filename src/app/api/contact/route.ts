import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { ContactEmail } from "@/components/emails/ContactEmail";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(100),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Strict Server-Side Validation
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.format() },
        { status: 400 }
      );
    }
    
    const { name, email, subject, message } = parsed.data;

    // 2. Save to Database (Always succeeds if data is valid)
    const savedMessage = await prisma.message.create({
      data: { name, email, subject, message },
    });

    // 3. Send Email Alert to Admin
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>", 
          to: process.env.CONTACT_EMAIL || "ebubarna1@gmail.com", // Fallback to user's known email
          subject: `New Contact: ${subject}`,
          react: ContactEmail({ name, email, subject, message }),
        });
      }
    } catch (emailError) {
      console.error("Failed to send email alert, but message saved:", emailError);
      // We don't throw here so the user still sees a "success" message
    }

    return NextResponse.json({ success: true, id: savedMessage.id });
  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
