"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Define the Blog interface
interface Blog {
  id: string;
  title: string;
  content: string;
  photo: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export default function SingleBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the specific blog from our API
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch('/api/blogs');
        const blogs: Blog[] = await response.json();
        const foundBlog = blogs.find(b => b.id === id);
        setBlog(foundBlog || null);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          The article you are looking for might have been moved or deleted.
        </p>
        <Link href="/blog" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-white">
      {/* Blog Hero Image */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src={blog.photo}
          alt={blog.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block">
              {blog.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-white/90 font-medium">
              <span>{blog.author}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
              <span>{blog.date}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/blog" className="text-blue-600 font-semibold mb-8 inline-flex items-center gap-2 group">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all blogs
        </Link>

        <div className="prose prose-lg prose-blue max-w-none mt-8">
          <p className="text-xl text-gray-700 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-3 first-letter:float-left mb-8">
            {blog.content}
          </p>
          
         

      

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Key Takeaways</h2>
          <ul className="list-disc pl-6 space-y-4 text-gray-600 mb-10">
            <li>Understand the core principles before jumping into advanced frameworks.</li>
            <li>Continuous learning is the only way to stay relevant in the tech industry.</li>
            <li>Focus on writing readable code that your future self will understand.</li>
            <li>Always test your assumptions and validate your solutions with real data.</li>
          </ul>

          <p className="text-gray-600">
            At Prevail Computer Institute, we believe in empowering our students with the skills needed to thrive in this digital age. Whether you&apos;re interested in web development, robotics, or computer learning, our curriculum is designed to provide you with a solid foundation and practical experience.
          </p>
        </div>

        {/* Share Section */}
        <div className="border-t border-gray-100 mt-16 pt-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{blog.author}</p>
              <p className="text-xs text-gray-500">Industry Expert & Educator</p>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="p-2 rounded-full bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
             </button>
             <button className="p-2 rounded-full bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
             </button>
          </div>
        </div>
      </article>
    </main>
  );
}
