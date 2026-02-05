import { NextResponse } from 'next/server'; // Import NextResponse for API handling
import { prisma } from '../../../../lib/prisma'; // Import prisma client for database access using relative path
import { getServerSession } from "next-auth"; // Import getServerSession for authentication
import { authOptions } from "@/lib/auth"; // Import authOptions for session verification

// ==========================================
// GET SINGLE USER - Admin view
// ==========================================
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authorization check
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // Extract user ID from route params

    // Fetch user details from DB excluding password
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        passport: true,
        createdAt: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 }); // Return 404 if user doesn't exist
    }

    return NextResponse.json(user); // Return user data
  } catch (error) {
    console.error("Error fetching user:", error); // Log error
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 }); // Return error
  }
}

// ==========================================
// UPDATE USER - Update role or status
// ==========================================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authorization check
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // Extract ID
    const body = await req.json(); // Parse request body
    const { role, status } = body; // Destructure update fields

    // Perform the update in the database
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        role, // Update user role
        status, // Update user status
      },
    });

    return NextResponse.json(updatedUser); // Return updated record
  } catch (error) {
    console.error("Error updating user:", error); // Log error
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 }); // Return error
  }
}

// ==========================================
// DELETE USER - Remove user from DB
// ==========================================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authorization check
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // Extract ID

    // Delete user from database
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted successfully" }); // Return success message
  } catch (error) {
    console.error("Error deleting user:", error); // Log error
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 }); // Return error
  }
}
