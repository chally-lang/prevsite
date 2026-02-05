"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define the Blog interface for type safety
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

export default function BlogPage() {
  // State to store blogs and loading status
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch blogs from our new API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get unique categories from blogs
  const categories = ["All", ...new Set(blogs.map(b => b.category))];

  // Filter blogs based on selected category
  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter(b => b.category === selectedCategory);

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50">
      {/* Hero Section with a more elegant design */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden bg-blue-900">
        <div className="absolute inset-0 z-0 opacity-40">
           <Image 
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&auto=format&fit=crop&q=80"
            alt="Blog Hero"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-6xl font-extrabold mb-6 tracking-tight">Our Stories & Insights</h1>
          <p className="text-2xl text-blue-100 font-light max-w-2xl mx-auto">
            Explore the latest in computer learning, web development, software engineering, and robotics.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        {/* Category Filter - Interactive */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-12 flex flex-wrap gap-2 justify-center border border-gray-100">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-blue-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col h-full"
              >
                {/* Blog Image Container */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={blog.photo}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4 text-sm text-gray-500 font-medium">
                    <span>{blog.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{blog.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed">
                    {blog.content}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                        {blog.author.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{blog.author}</span>
                    </div>
                    
                    <Link
                      href={`/blog/${blog.id}`}
                      className="text-blue-600 font-bold text-sm hover:text-blue-800 flex items-center gap-1 group/link"
                    >
                      Read More
                      <svg 
                        className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400">No blogs found in this category.</h3>
          </div>
        )}
      </section>
    </main>
  );
}
