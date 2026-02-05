import { NextResponse } from "next/server"; // Importing Next.js response helper for API routes
import { prisma } from "@/lib/prisma"; // Importing the Prisma client instance for database access

/**
 * Handles GET requests to fetch all contact messages from the database.
 * This is primarily used by the admin dashboard to view user inquiries.
 */
export async function GET() { 
  try { 
    // Fetching all messages from the 'Message' table in the database
    // We cast prisma to 'any' to bypass potential type mismatch if the client wasn't regenerated
    const messages = await (prisma as any).message.findMany({ 
      orderBy: { createdAt: "desc" }, // Ordering messages so the newest ones appear first
    }); 
    
    // Returning the list of messages as a JSON response with status 200
    return NextResponse.json(messages); 
  } catch (error) { 
    // Logging any errors that occur during the fetch process for debugging
    console.error("Failed to fetch messages:", error); 
    // Returning a generic error message with status 500 if something goes wrong
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 }); 
  } 
} 

/**
 * Handles POST requests to save a new contact message sent via the contact form.
 */
export async function POST(req: Request) { 
  try { 
    // Parsing the JSON body of the incoming request
    const body = await req.json(); 
    // Extracting name, email, subject, and message from the request body
    const { name, email, subject, message } = body; 

    // Basic server-side validation to ensure all required fields are present
    if (!name || !message) { 
      // Returning a 400 Bad Request error if any field is missing
      return NextResponse.json(
        { error: "Please fill in your name and message." }, 
        { status: 400 }
      ); 
    } 

    // Creating a new record in the 'Message' table with the provided data
    const newMessage = await (prisma as any).message.create({ 
      data: {
        name,
        email: email || null,
        subject: subject || "No Subject",
        message,
      }, 
    }); 

    // Returning a success message and the newly created message data with status 201
    return NextResponse.json(
      { message: "Your message has been sent successfully!", data: newMessage }, 
      { status: 201 }
    ); 
  } catch (error: any) { 
    // Logging the error to the console for server-side monitoring
    console.error("Message submission error:", error); 
    // Returning a user-friendly error message with status 500
    return NextResponse.json(
      { error: error.message || "Something went wrong. Please try again later." }, 
      { status: 500 }
    ); 
  } 
} 
