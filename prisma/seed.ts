// Importing the PrismaClient to interact with the database
import { PrismaClient } from '@prisma/client';
// Importing hash function from bcryptjs for secure password storage
import { hash } from 'bcryptjs';

// Initializing the Prisma Client instance
const prisma = new PrismaClient();

// Main function to handle the database seeding process
async function main() {
  // Logging the start of the seeding process
  console.log('Seeding database...');

  // 1. Create or get an admin user
  // Defining the updated admin email address to use prevailing.com
  const adminEmail = 'admin@prevailing.com';
  // Checking if an admin user with this email already exists in the database
  let admin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  // If no admin user is found, create a new one
  if (!admin) {
    // Hashing the default admin password for security
    const hashedPassword = await hash('admin123', 12);
    // Creating the admin user record in the database
    admin = await prisma.user.create({
      data: {
        // Setting the name of the admin user
        name: 'Admin User',
        // Setting the email address
        email: adminEmail,
        // Setting the hashed password
        password: hashedPassword,
        // Assigning the ADMIN role
        role: 'ADMIN',
      },
    });
    // Logging the successful creation of the admin user
    console.log('Created admin user:', adminEmail);
  }

  // 2. Generate 100 blog posts
  // List of categories for generating sample blog content
  const categories = [
    'Web Development',
    'Frontend Development',
    'Backend Development',
    'Full-Stack Development',
    'HTML, CSS & JavaScript',
    'Web Performance & Optimization',
    'Web Accessibility (a11y)',
    'Responsive & Mobile-First Design',
    'Web Security',
    'Progressive Web Apps (PWA)',
    'Web Standards & Best Practices'
  ];

  // List of topics to prefix the blog titles
  const topics = [
    'Introduction to',
    'Mastering',
    'Best Practices for',
    'The Future of',
    'Deep Dive into',
    'Getting Started with',
    'Advanced Techniques in',
    'Why You Should Learn',
    'Top 10 Tips for',
    'Building Scalable'
  ];

  // List of Unsplash image URLs for blog post thumbnails
  const photos = [
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1505373633562-b7383a8f11bd?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60'
  ];

  // Logging the start of blog post generation
  console.log('Generating 100 blog posts...');

  // Array to hold the blog post data for batch insertion
  const blogsData = [];

  // Looping to generate 100 sample blog entries
  for (let i = 1; i <= 100; i++) {
    // Randomly selecting a category
    const category = categories[Math.floor(Math.random() * categories.length)];
    // Randomly selecting a topic prefix
    const topic = topics[Math.floor(Math.random() * topics.length)];
    // Creating the full title for the blog post
    const title = `${topic} ${category} Vol. ${i}`;
    // Generating a URL-friendly slug from the title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + `-${i}`;
    
    // Pushing the blog post data into the array
    blogsData.push({
      title,
      slug,
      // Generating sample content for the post
      content: `This is a comprehensive guide about ${category}. In this post #${i}, we delve deep into the core concepts, modern trends, and practical applications. ${category} is a vital part of the modern web ecosystem. We will cover everything from the basics to advanced strategies to help you become an expert in the field. Stay tuned for more insights and tutorials!`,
      // Randomly selecting a photo
      photo: photos[Math.floor(Math.random() * photos.length)],
      category,
      // Randomly generating a read time between 5 and 14 minutes
      readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
      // Assigning the admin user as the author
      authorId: admin.id,
      // Marking the post as published
      published: true,
    });
  }

  // Performing a batch insert of all blog posts into the database
  await prisma.blog.createMany({
    data: blogsData,
    // Skipping any entries that might cause duplicate errors
    skipDuplicates: true,
  });

  // Logging successful completion of blog seeding
  console.log('Successfully seeded 100 blog posts!');

  // 3. Create sample courses
  // Logging the start of course seeding
  console.log('Seeding courses...');
  // Defining a list of sample courses with their details
  const courses = [
    {
      name: "Web Development",
      description: "Master modern web development with HTML, CSS, JavaScript, React, and Next.js",
      duration: "12 weeks",
      level: "Beginner to Advanced",
      price: "$299",
      topics: ["HTML/CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Git"],
      instructor: "John Smith",
      photo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Computer Basics",
      description: "Learn fundamental computer concepts, MS Office, and internet basics",
      duration: "4 weeks",
      level: "Beginner",
      price: "$99",
      topics: ["Computer Fundamentals", "MS Word", "MS Excel", "PowerPoint", "Internet Basics"],
      instructor: "Jane Doe",
      photo: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Graphic Design",
      description: "Create stunning visual content with Adobe Creative Suite and design principles",
      duration: "10 weeks",
      level: "Intermediate",
      price: "$249",
      topics: ["Adobe Photoshop", "Adobe Illustrator", "Design Theory", "Typography", "UI/UX Basics"],
      instructor: "Michael Brown",
      photo: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Python Programming",
      description: "Build applications and automate tasks with Python programming language",
      duration: "8 weeks",
      level: "Beginner to Intermediate",
      price: "$199",
      topics: ["Python Basics", "OOP", "Data Structures", "Web Frameworks", "Automation"],
      instructor: "Sarah Wilson",
      photo: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Database Management",
      description: "Master SQL, MongoDB, and database design principles for enterprise applications",
      duration: "6 weeks",
      level: "Intermediate",
      price: "$179",
      topics: ["SQL", "MongoDB", "Database Design", "Optimization", "Data Security"],
      instructor: "David Lee",
      photo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Digital Marketing",
      description: "Learn SEO, social media marketing, and content creation strategies",
      duration: "8 weeks",
      level: "Beginner to Intermediate",
      price: "$199",
      topics: ["SEO", "Social Media Marketing", "Google Analytics", "Content Strategy", "Email Marketing"],
      instructor: "Emily Davis",
      photo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60"
    }
  ];

  // Iterating through the courses and upserting them into the database
  for (const course of courses) {
    await prisma.course.upsert({
      // Using a generated ID based on the course name as the unique identifier
      where: { id: `course-${course.name.toLowerCase().replace(/\s+/g, '-')}` },
      // Data to update if the course already exists
      update: course,
      // Data to use for creation if it doesn't exist
      create: {
        id: `course-${course.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...course,
      },
    });
  }
  // Logging the successful completion of course seeding
  console.log('Successfully seeded courses!');
}

// Executing the main seeding function
main()
  // Handling any errors that occur during the process
  .catch((e) => {
    // Logging the error
    console.error(e);
    // Exiting the process with a failure code
    process.exit(1);
  })
  // Disconnecting from the database after completion or error
  .finally(async () => {
    // Closing the Prisma Client connection
    await prisma.$disconnect();
  });
