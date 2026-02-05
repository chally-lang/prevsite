import { NextResponse } from "next/server"; // Import NextResponse for handling API responses
import { prisma } from "@/lib/prisma"; // Import Prisma client for database operations
import { getServerSession } from "next-auth"; // Import getServerSession to get user session
import { authOptions } from "@/lib/auth"; // Import authOptions for session configuration

// GET /api/notes - Fetches all notes for the authenticated user
export async function GET() { // Define the GET handler
  try { // Start of try-catch block for error handling
    // 1. Retrieve the current user's session from NextAuth
    const session = await getServerSession(authOptions); // Fetch the current user session
    
    // 2. Critical Safety Check: If no session or user ID, return Unauthorized (401)
    if (!session || !session.user || !session.user.id) { // Check if user is authenticated
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); // Return 401 if not logged in
    } // End of safety check

    // 3. Query the database for notes that belong SPECIFICALLY to this user
    // Enhanced Security: If the user is a student, ensure they don't see notes from staff roles
    const notes = await prisma.note.findMany({ // Query the database for notes
      where: { // Define filter conditions
        userId: session.user.id, // Filter by the unique user ID from the session
        ...(session.user.role === "STUDENT" ? { // If the user is a student, add more filters
          user: { // Filter based on user properties
            role: { // Filter based on role
              not: "STAFF" // Explicitly prevent students from seeing notes created by staff
            } // End of role filter
          } // End of user filter
        } : {}) // No extra filter for non-students
      }, // End of where clause
      orderBy: { createdAt: "desc" }, // Sort by newest first
    }); // End of database query

    // 4. Return the list of notes to the client
    return NextResponse.json(notes); // Return notes as a JSON response
  } catch (error) { // Catch any errors that occur during execution
    // Log errors for server-side debugging
    console.error("GET /api/notes error:", error); // Log the error to console
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 }); // Return 500 error
  } // End of try-catch block
} // End of GET handler

// POST /api/notes - Creates a new note for the authenticated user
export async function POST(request: Request) { // Define the POST handler
  try { // Start of try-catch block
    // 1. Retrieve the current user's session
    const session = await getServerSession(authOptions); // Get the current session
    
    // 2. Safety Check: Only authenticated users can create notes
    if (!session || !session.user || !session.user.id) { // Check authentication
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); // Return 401 if unauthorized
    } // End of authentication check

    // 3. Parse the request body to get note details
    const { title, content } = await request.json(); // Destructure title and content from JSON body

    // 4. Validation: Both title and content must be provided
    if (!title || !content) { // Check if required fields are present
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 }); // Return 400 if missing
    } // End of validation

    // 5. Create the new note in the database linked to the current user's ID
    const note = await prisma.note.create({ // Call prisma create method
      data: { // Define data for the new note
        title, // Set note title
        content, // Set note content
        userId: session.user.id, // Ensure the note is owned by the logged-in user
      }, // End of data object
    }); // End of prisma create

    // 6. Return the newly created note
    return NextResponse.json(note); // Return the created note as JSON
  } catch (error) { // Catch any errors
    // Log errors for server-side debugging
    console.error("POST /api/notes error:", error); // Log error details
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 }); // Return 500 error
  } // End of try-catch block
} // End of POST handler
