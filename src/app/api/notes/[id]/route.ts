import { NextRequest, NextResponse } from "next/server"; // Import NextResponse for API responses
import { prisma } from "@/lib/prisma"; // Import Prisma client for DB access
import { getServerSession } from "next-auth"; // Import getServerSession for authentication
import { authOptions } from "@/lib/auth"; // Import authOptions for session verification

// Handle PUT requests to update a note
export async function PUT( // Define PUT handler
  request: NextRequest, // Request object
  { params }: { params: Promise<{ id: string }> } // Route parameters
) {
  try { // Start of try-catch block
    // Get the current user session
    const session = await getServerSession(authOptions); // Fetch current session
    if (!session || !session.user || !session.user.id) { // Check authentication
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); // Return 401 if not authorized
    } // End of session check

    // Await params for Next.js 15+ compatibility
    const { id } = await params; // Extract ID from params

    // Extract title and content from request body
    const { title, content } = await request.json(); // Destructure body data

    // Validate that both title and content are provided
    if (!title || !content) { // Check required fields
      return NextResponse.json(
        { error: "Title and content are required" }, // Error message
        { status: 400 } // Status code
      ); // Return error response
    } // End of validation

    // Check if the note exists and belongs to the current user
    // Enhanced Security: Also check if the student is trying to access a staff note
    const existingNote = await prisma.note.findUnique({ // Query for existing note
      where: { id: id }, // Filter by ID
      include: { // Include related user data
        user: { // Select user relation
          select: { // Select specific fields
            role: true // Get the user role
          } // End of select
        } // End of user include
      } // End of include
    }); // End of findUnique

    // Return error if note not found or user doesn't own it
    // Additional Safeguard: If student, ensure the note owner is NOT staff
    if (!existingNote || existingNote.userId !== session.user.id || (session.user.role === "STUDENT" && existingNote.user.role === "STAFF")) { 
      return NextResponse.json(
        { error: "Note not found or unauthorized" }, // Error message
        { status: 404 } // Not found or forbidden
      ); // Return response
    } // End of ownership check

    // Update the note with new title and content
    const updatedNote = await prisma.note.update({ // Call prisma update
      where: { id: id }, // Filter by ID
      data: { // Define update data
        title, // New title
        content, // New content
      }, // End of data
    }); // End of update

    return NextResponse.json(updatedNote); // Return updated note
  } catch (error) { // Catch any errors
    console.error("PUT /api/notes/[id] error:", error); // Log error for debugging
    return NextResponse.json(
      { error: "Internal Server Error" }, // Generic error message
      { status: 500 } // Server error status
    ); // Return error response
  } // End of try-catch
} // End of PUT handler

// Handle DELETE requests to remove a note
export async function DELETE( // Define DELETE handler
  request: NextRequest, // Request object
  { params }: { params: Promise<{ id: string }> } // Route parameters
) {
  try { // Start of try-catch
    // Get the current user session
    const session = await getServerSession(authOptions); // Fetch current session
    if (!session || !session.user || !session.user.id) { // Check authentication
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); // Return 401 if unauthorized
    } // End of session check

    // Await params for Next.js 15+ compatibility
    const { id } = await params; // Extract ID from params

    // Check if the note exists and belongs to the current user
    // Enhanced Security: Check owner's role to prevent student-staff note access
    const existingNote = await prisma.note.findUnique({ // Query for note
      where: { id: id }, // Filter by ID
      include: { // Include user relation
        user: { // Select user
          select: { // Select fields
            role: true // Get role
          } // End of select
        } // End of user include
      } // End of include
    }); // End of findUnique

    // Return error if note not found or user doesn't own it
    // Safeguard: Ensure students cannot delete notes belonging to staff
    if (!existingNote || existingNote.userId !== session.user.id || (session.user.role === "STUDENT" && existingNote.user.role === "STAFF")) { 
      return NextResponse.json(
        { error: "Note not found or unauthorized" }, // Error message
        { status: 404 } // Not found or forbidden
      ); // Return response
    } // End of ownership check

    // Delete the note from the database
    await prisma.note.delete({ // Call prisma delete
      where: { id: id }, // Filter by ID
    }); // End of delete

    return NextResponse.json({ success: true }); // Return success response
  } catch (error) { // Catch errors
    console.error("DELETE /api/notes/[id] error:", error); // Log error
    return NextResponse.json(
      { error: "Internal Server Error" }, // Generic error message
      { status: 500 } // Status code
    ); // Return error response
  } // End of try-catch
} // End of DELETE handler
