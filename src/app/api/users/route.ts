import { NextResponse } from 'next/server'; // Import NextResponse for API handling
import { prisma } from "@/lib/prisma"; // Import prisma client using alias
import { getServerSession } from "next-auth"; // Import getServerSession for authentication
import { authOptions } from "@/lib/auth"; // Import authOptions for session verification
import { hash } from "bcryptjs"; // Import hash for password encryption
import { Role } from "@/generated/client_v2"; // ✅ Correct enum import

// ==========================================
// GET ALL USERS - Admin only view
// ==========================================
export async function GET() {
  try { // Start try
    // 1. Authentication Check - Only logged in admins can view all users
    const session = await getServerSession(authOptions); // Get current session
    
    if (!session || session.user.role !== "ADMIN") { // Check if user is authorized
      return NextResponse.json(
        { error: "Unauthorized access. Admin privileges required." }, 
        { status: 401 }
      ); // Return 401 Unauthorized
    }

    // 2. Database Fetch - Get users from DB
    const users = await prisma.user.findMany({ // Call DB
      select: { // Select specific fields to avoid sending sensitive data like passwords
        id: true, // Unique ID
        name: true, // User name
        email: true, // Email address
        role: true, // System role (ADMIN, STAFF, STUDENT)
        status: true, // User status (ACTIVE, INACTIVE, SUSPENDED)
        createdAt: true, // Creation date
      },
      orderBy: { // Sort users by creation date
        createdAt: 'desc', // Most recent first
      },
    }); // End of DB call

    // 3. Success Response - Return the user list
    return NextResponse.json(users); // Return the list of users as JSON
  } catch (error) { // Catch any unexpected errors
    console.error("CRITICAL ERROR in GET /api/users:", error); // Log full error details for server-side debugging
    return NextResponse.json(
      { error: "Internal Server Error while fetching users" }, 
      { status: 500 }
    ); // Return generic 500 error to client
  } // End try-catch
}

// ==========================================
// CREATE NEW USER - Admin only
// ==========================================
export async function POST(req: Request) {
  try {
    // 1. Authorization check
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse request body
    const body = await req.json();
    const { name, email, role, password } = body;

    // 3. Validation
    if (!name || !email || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 4. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

    // 5. Hash password (use provided or default)
    const passwordToHash = password || "Welcome123!";
    const hashedPassword = await hash(passwordToHash, 12);

    // 6. Create user in DB
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role: role as Role, // ✅ Correct enum usage
        password: hashedPassword,
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      }
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
