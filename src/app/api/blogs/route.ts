import { NextResponse } from 'next/server'; // Import NextResponse for API handling
import { prisma } from '../../../lib/prisma'; // Import prisma client for database access using relative path

// ==========================================
// GET ALL BLOGS - Supports public view and admin view
// ==========================================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url); // Parse the request URL to get query parameters
    const isAdmin = searchParams.get('admin') === 'true'; // Check if the request is from the admin dashboard

    // Fetch blogs from the database with author information included
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            name: true, // Only fetch the author's name
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Sort by newest first
      },
    });

    // If it's for admin dashboard, return raw data including unpublished posts
    if (isAdmin) {
      return NextResponse.json(blogs);
    }

    // **TypeScript fix - define blog type**
    type BlogType = typeof blogs[number];

    // Transform to match expected UI format and filter in-memory for public view
    const transformedBlogs = blogs
      .filter((blog: BlogType) => blog.published !== false) // Only show published blogs to the public
      .map((blog: BlogType) => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        photo: blog.photo || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60", // Default image if none provided
        author: blog.author?.name || "Admin", // Fallback author name
        date: new Date(blog.createdAt).toLocaleDateString('en-US', { // Format date for display
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        category: blog.category || "General",
        readTime: blog.readTime || "5 min read",
      }));

    return NextResponse.json(transformedBlogs); // Return the transformed list of blogs
  } catch (error) {
    console.error("Error fetching blogs:", error); // Log any errors
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 }); // Return generic error
  }
}

// ==========================================
// CREATE NEW BLOG (POST)
// ==========================================
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body as JSON
    const { title, content, photo, category, readTime, authorId, published } = body; // Destructure fields

    // Create a URL-friendly slug from the title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Create a new blog record in the database
    const blog = await prisma.blog.create({
      data: {
        title,
        slug: `${slug}-${Date.now()}`, // Append timestamp to slug for uniqueness
        content,
        photo,
        category,
        readTime,
        authorId,
        published: published ?? true, // Default to published if not specified
      },
    });

    return NextResponse.json(blog); // Return the newly created blog
  } catch (error) {
    console.error("Error creating blog:", error); // Log any errors
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 }); // Return generic error
  }
}
