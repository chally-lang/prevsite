import { NextRequest, NextResponse } from 'next/server'; // Import NextResponse for API responses
import { prisma } from '../../../../lib/prisma'; // Import prisma client for DB operations using relative path

// ==========================================
// UPDATE BLOG (PUT) - Handles editing and publishing/unpublishing
// ==========================================
export async function PUT(
  req: NextRequest, // The incoming request object
  { params }: { params: Promise<{ id: string }> } // Route parameters containing the blog ID
) {
  try {
    const { id } = await params; // Extract blog ID from params
    const body = await req.json(); // Parse the request body as JSON
    const { title, content, photo, category, readTime, published } = body; // Destructure blog fields from body

    // Generate slug if title is provided to keep URLs SEO friendly
    let slugData = {};
    if (title) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); // Create slug from title
      slugData = { slug: `${slug}-${Date.now()}` }; // Append timestamp to ensure uniqueness
    }

    // Update the blog record in the database
    const updatedBlog = await prisma.blog.update({
      where: { id }, // Find the blog by its unique ID
      data: {
        ...(title && { title }), // Update title if provided
        ...slugData, // Update slug if title was provided
        ...(content !== undefined && { content }), // Update content if provided
        ...(photo !== undefined && { photo }), // Update photo URL if provided
        ...(category !== undefined && { category }), // Update category if provided
        ...(readTime !== undefined && { readTime }), // Update read time if provided
        ...(published !== undefined && { published }), // Update publish status (true/false)
      },
    });

    return NextResponse.json(updatedBlog); // Return the updated blog as JSON
  } catch (error) {
    console.error("Error updating blog:", error); // Log any errors for debugging
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 }); // Return error response
  }
}

// ==========================================
// DELETE BLOG (DELETE) - Removes a blog from the database
// ==========================================
export async function DELETE(
  req: Request, // The incoming request object
  { params }: { params: Promise<{ id: string }> } // Route parameters containing the blog ID
) {
  try {
    const { id } = await params; // Extract blog ID from params

    // Delete the blog record from the database
    await prisma.blog.delete({
      where: { id }, // Find and delete by unique ID
    });

    return NextResponse.json({ message: "Blog deleted successfully" }); // Return success message
  } catch (error) {
    console.error("Error deleting blog:", error); // Log any errors for debugging
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 }); // Return error response
  }
}
