import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Handles GET requests to fetch newsletter subscribers (for admin dashboard)
 */
export async function GET() {
  try {
    const subscribers = await (prisma as any).newsletter.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("Failed to fetch subscribers:", error);
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
  }
}

/**
 * Handles POST requests for newsletter subscriptions
 * Adds the provided email to the Newsletter table in the database
 */
export async function POST(req: Request) {
  try {
    // Parse the request body to get the email
    const body = await req.json();
    const { email } = body;

    console.log("Newsletter subscription request for:", email);

    // Basic validation to ensure email is provided
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Check if the email already exists in the newsletter table
    // We use type casting to any because Prisma Client might not be regenerated yet due to file locks
    const existingSubscription = await (prisma as any).newsletter.findUnique({
      where: { email },
    });

    if (existingSubscription) {
      return NextResponse.json(
        { message: "You are already subscribed to our newsletter!" },
        { status: 200 }
      );
    }

    // Create a new entry in the Newsletter table
    await (prisma as any).newsletter.create({
      data: { email },
    });

    // Return a success response
    return NextResponse.json(
      { message: "Successfully subscribed to the newsletter!" },
      { status: 201 }
    );
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error("Newsletter subscription error:", error);
    
    // Return a generic error message to the client
    return NextResponse.json(
      { error: error.message || "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
