"use client"; // Enabling client-side features for this Next.js page component
// Importing the Image component from Next.js for optimized image rendering
import Image from 'next/image'; 
// Importing Link from Next.js for internal navigation
import Link from 'next/link';

// Exporting the AboutPage component as the default export for this route
export default function Gallery() { 
  // Returning the JSX structure of the redesigned About Us page
  return ( 
    // Main container with minimum full screen height and top padding for the fixed header
    <main className="min-h-screen pt-20 bg-background text-foreground overflow-x-hidden"> 
      
     

      {/* --- GALLERY SECTION --- */}
      {/* A visually appealing gallery showcasing our institute's environment and activities */}
      <section className="py-24 px-6 bg-background relative overflow-hidden"> 
        {/* Container for the gallery content with maximum width alignment */}
        <div className="max-w-7xl mx-auto relative z-10"> 
          {/* Section header for the gallery */}
          <div className="text-center mb-16"> 
            {/* Main title for the gallery section */}
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Vibrant Gallery</h2> 
            {/* Descriptive subtitle to provide context for the images */}
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">A glimpse into the life, culture, and learning environment at Prevailing.</p> 
          </div> 
          
          {/* Grid layout for the gallery items - Responsive columns for different screen sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
            {/* Mapping through a predefined list of gallery images to generate the grid items dynamically */}
            {[
              /* First gallery item: representing our modern technological laboratory */
              { id: 1, title: "Modern Tech Lab", src: "/assets/gallery/lab.jpeg", span: "md:col-span-1" },
              /* Second gallery item: showcasing students working together in a collaborative environment */
              { id: 2, title: "Collaborative Learning", src: "/assets/gallery/collab.jpeg", span: "md:col-span-1" },
              /* Third gallery item: a celebration of our students' achievements during graduation */
              { id: 3, title: "Graduation Ceremony", src: "/assets/gallery/graduation.jpeg", span: "md:col-span-1" },
              /* Fourth gallery item: highlighting intensive student workshops and practical sessions */
              { id: 4, title: "Student Workshops", src: "/assets/gallery/workshop.jpeg", span: "md:col-span-1" },
              /* Fifth gallery item: showing the high-quality computer equipment available to students */
              { id: 5, title: "High-End Equipment", src: "/assets/gallery/equipment.jpeg", span: "md:col-span-1" },
              { id: 6, title: "Graduation Ceremony", src: "/assets/gallery/graduation.jpeg", span: "md:col-span-1" },
              /* Fourth gallery item: highlighting intensive student workshops and practical sessions */
              { id: 7, title: "Student Workshops", src: "/assets/gallery/workshop.jpeg", span: "md:col-span-1" },
              /* Fifth gallery item: showing the high-quality computer equipment available to students */
              { id: 8, title: "High-End Equipment", src: "/assets/gallery/equipment.jpeg", span: "md:col-span-1" },
            ].map((image) => ( // Iterating over the image array to create JSX elements
              /* Individual gallery item container with hover animation and responsive span */
              <div 
                key={image.id} // Unique key for React's reconciliation process
                className={`relative h-[350px] rounded-3xl overflow-hidden group shadow-xl ${image.span} transform transition-all duration-500 hover:-translate-y-2`} // Styling for the card container
              >
                {/* Optimized Next.js image component for high performance and lazy loading */}
                <Image 
                  src={image.src} // Source path from the image object
                  alt={image.title} // Accessibility alt text for screen readers
                  fill // Makes the image fill the relative parent container
                  className="object-contain transition-transform duration-700 group-hover:scale-105" // Ensures full image is visible and adds subtle zoom on hover
                />
                {/* Gradient overlay that becomes visible when the user hovers over the card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8" />
                {/* Container for the text content that animates into view on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {/* Title of the specific gallery image */}
                  <p className="text-white text-xl font-bold">{image.title}</p>
                  {/* Branding tag for the gallery items */}
                  <p className="text-primary text-sm font-semibold uppercase tracking-wider">Prevailing Experience</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative background blur effect for elegance */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* --- FINAL CTA SECTION --- */}
      {/* Redesigned final call to action to wrap up the about page */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-tight">Your tech journey <span className="text-primary">starts here.</span></h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/register" className="w-full sm:w-auto px-12 py-5 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-primary/20">
              Apply Today
            </Link>
            <Link href="/blog" className="w-full sm:w-auto px-12 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-xl transition-all">
              Read Success Stories
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
