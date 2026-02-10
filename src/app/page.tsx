// Importing Link component from Next.js for client-side navigation
import Link from "next/link";
// Importing HeroCarousel component to display a rotating banner
import HeroCarousel from "@/components/HeroCarousel";
// Importing the NewsletterSection component for user subscriptions
import NewsletterSection from "@/components/NewsletterSection";

// Defining the HomePage functional component
export default function HomePage() {
  // Returning the JSX structure for the home page
  return (
    // Main container for the home page content
    <main>
      {/* Rendering the Hero Section which includes the image carousel */}
      <HeroCarousel />

      {/* Courses Section: Showcasing the primary learning paths */}
      <section className="py-24 px-4 bg-white">
        {/* Centered container for the courses content */}
        <div className="max-w-7xl mx-auto text-center">
          {/* Main heading for the core courses section */}
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Core Courses</h2>
          {/* Subheading text explaining the goal of the courses */}
          <p className="text-gray-500 mb-16 max-w-2xl mx-auto">We provide industry-relevant training to help you master the most in-demand skills in today&apos;s tech market.</p>
          {/* Responsive grid for displaying course cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Course Card 1: Web/Mobile App Development */}
            <div className="bg-gray-50 rounded-3xl p-10 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 border border-gray-100 group">
              {/* Icon container with hover animation effects */}
              <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                {/* SVG icon representing code and development */}
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              {/* Course Title */}
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Web/Mobile App Development</h3>
              {/* Course Description */}
              <p className="text-gray-600 leading-relaxed">Master the art of building modern, responsive web & Mobile using Best Development and coding programming tools.</p>
            </div>
            {/* Course Card 2: Computer Training */}
            <div className="bg-gray-50 rounded-3xl p-10 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 border border-gray-100 group">
              {/* Icon container with hover animation effects */}
              <div className="h-14 w-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-500">
                {/* SVG icon representing computer basics and office work */}
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              {/* Course Title */}
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Computer Training</h3>
              {/* Course Description */}
              <p className="text-gray-600 leading-relaxed">Perfect for beginners. Learn fundamental computer operations, office suites, and internet essentials and Special Packages.</p>
            </div>
            {/* Course Card 3: Updated to Computer Repairs and Engineering */}
            <div className="bg-gray-50 rounded-3xl p-10 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 border border-gray-100 group">
              {/* Icon container with hover animation effects - updated color to purple */}
              <div className="h-14 w-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-500">
                {/* SVG icon representing engineering and repairs (wrench icon) */}
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z" /></svg>
              </div>
              {/* Updated Course Title */}
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Computer Repairs and engineering</h3>
              {/* Updated Course Description */}
              <p className="text-gray-600 leading-relaxed">Learn the hardware side of technology. Master troubleshooting, component replacement, and systems engineering for modern computers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section: Highlighting student experiences */}
      <section className="bg-gray-50 py-24 px-4 overflow-hidden relative">
        {/* Centered container for success stories */}
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Section Heading */}
          <h2 className="text-4xl font-bold mb-16 text-gray-900">Success Stories</h2>
          {/* Grid for testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Testimonial Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative">
              {/* Decorative quotation mark */}
              <div className="absolute -top-6 left-8 text-6xl text-blue-200">&quot;</div>
              {/* Testimonial text */}
              <p className="text-gray-700 italic text-lg mb-6 leading-relaxed">&quot;This institute transformed my career! The instructors are experts and the hands-on projects gave me the confidence I needed to land my first developer role.&quot;</p>
              {/* Student info container */}
              <div className="flex items-center gap-4">
                {/* Avatar placeholder with initials */}
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">JD</div>
                {/* Student name and job title */}
                <div className="text-left">
                  <p className="font-bold text-gray-900">Jerry Amazie</p>
                  <p className="text-sm text-gray-500">Frontend Developer at TechNova</p>
                </div>
              </div>
            </div>
            {/* Testimonial Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative">
              {/* Decorative quotation mark */}
              <div className="absolute -top-6 left-8 text-6xl text-blue-200">&quot;</div>
              {/* Testimonial text */}
              <p className="text-gray-700 italic text-lg mb-6 leading-relaxed">&quot;I landed a job immediately after learning here. The curriculum is perfectly aligned with what employers are looking for in 2026.&quot;</p>
              {/* Student info container */}
              <div className="flex items-center gap-4">
                {/* Avatar placeholder with initials */}
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">JS</div>
                {/* Student name and job title */}
                <div className="text-left">
                  <p className="font-bold text-gray-900">Miracle Rebecca John</p>
                  <p className="text-sm text-gray-500">IT Specialist at Global Systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Section: Big Animated Button only */}
      <section className="py-24 px-4 bg-white">
        {/* Main container for the blog section */}
        <div className="max-w-7xl mx-auto text-center">
          {/* Section heading */}
          <h2 className="text-4xl font-bold mb-8 text-gray-900">Latest from Our Blog</h2>
          {/* Big animated button */}
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-14 py-6 rounded-full font-bold hover:bg-blue-700 transition-all shadow-2xl hover:shadow-3xl shadow-blue-100 text-2xl animate-bounce"
          >
            Visit Our Blog
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Rendering the Newsletter Section at the bottom of the page */}
      <NewsletterSection />
    </main>
  );
}
