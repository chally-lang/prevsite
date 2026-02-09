const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@prevailing.com';

  let admin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!admin) {
    const hashedPassword = await bcrypt.hash('admin123', 12);
    admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
  }

  const blogsData = [];
  const categories = ['Web Development', 'Frontend Development', 'Backend Development'];
  const topics = ['Introduction to', 'Mastering', 'Best Practices for'];
  const photos = ['https://images.unsplash.com/photo-1?w=800', 'https://images.unsplash.com/photo-2?w=800'];

  for (let i = 1; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const title = `${topic} ${category} Vol. ${i}`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + `-${i}`;

    blogsData.push({
      title,
      slug,
      content: `This is a guide about ${category} #${i}.`,
      photo: photos[Math.floor(Math.random() * photos.length)],
      category,
      readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
      authorId: admin.id,
      published: true,
    });
  }

  await prisma.blog.createMany({
    data: blogsData,
    skipDuplicates: true,
  });

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
    }
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { id: `course-${course.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: course,
      create: {
        id: `course-${course.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...course,
      },
    });
  }

  console.log("Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
