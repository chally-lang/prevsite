"use client"; // Enabling client-side features for this Next.js page component
// Importing the Image component from Next.js for optimized image rendering
import Image from 'next/image'; 
// Importing Link from Next.js for internal navigation
import Link from 'next/link';



// Exporting the AboutPage component as the default export for this route
export default function AboutPage() { 
  // Returning the JSX structure of the redesigned About Us page
  return ( 
    // Main container with minimum full screen height and top padding for the fixed header
    <main className="min-h-screen pt-20 bg-background text-foreground overflow-x-hidden"> 
      
      {/* --- HERO SECTION --- */}
      {/* Hero Section Container with relative positioning and full viewport height adjustment */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden"> 
        {/* Background image for the hero section with a high-quality tech visual */}
        <Image 
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" 
          alt="Students learning in a modern computer lab" // Descriptive alt text for SEO and accessibility
          fill // Making the image fill its relative container
          className="object-cover scale-105 animate-subtle-zoom" // Applying a subtle zoom animation for visual interest
          priority // Prioritizing the loading of this critical above-the-fold image
        />
        {/* Gradient overlay for a more modern and readable text backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-[1]" /> 
        {/* Animated background particles effect using CSS (simulated with multiple divs) */}
        <div className="absolute inset-0 z-[2] opacity-30 pointer-events-none">
          {/* Top-left animated blur effect */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          {/* Bottom-right animated blur effect */}
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>
        {/* Hero content container centered relative to the overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center"> 
          <div className="text-left animate-fade-in-up">
            {/* Small badge-like text above the main heading */}
            <span className="inline-block py-1 px-4 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-semibold tracking-widest uppercase mb-6">
              Establish Your Future
            </span>
            {/* Main heading with bold typography and gradient text effect */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Digital Pioneers</span> Since 2004
            </h1> 
            {/* Hero description with improved line height for better readability */}
            <p className="text-xl md:text-2xl text-gray-200 max-w-xl mb-10 leading-relaxed">
              We don't just teach; we nurture innovation and build the architects of tomorrow's digital landscape.
            </p> 
            {/* CTA buttons in the hero section */}
            <div className="flex flex-wrap gap-4">
              {/* Link to courses page */}
              <Link href="/courses" className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/25">
                Explore Our Courses
              </Link>
              {/* Link to contact page */}
              <Link href="/contact" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold transition-all">
                Contact Admissions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR STORY SECTION --- */}
      {/* New section detailing the institute's journey over the years */}
      <section className="py-24 px-6 bg-secondary/30 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side: Content about the history */}
            <div className="order-2 lg:order-1">
              {/* Heading with a decorative line */}
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-4">
                <span className="w-12 h-1 bg-primary rounded-full" />
                Our Remarkable Journey
              </h2>
              {/* Textual content of the story - updated to Prevailing */}
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded in 2004, <strong className="text-primary font-semibold">Prevailing Computer Institute</strong> started as a small vision in a single classroom with just 7 passionate students and a dream to bridge the digital divide.
                </p>
                <p>
                  Over the past decade, we have evolved into a premier tech hub, empowering over 5,000 graduates who are now leading innovation in top-tier tech companies globally.
                </p>
                <p>
                  Our growth is fueled by a relentless commitment to staying ahead of the curve, ensuring our curriculum evolves as fast as technology itself.
                </p>
              </div>
              {/* Key milestones grid */}
              <div className="grid grid-cols-2 gap-8 mt-12">
                {/* Milestone 1 */}
                <div className="p-6 bg-background rounded-2xl border border-primary/10">
                  <h4 className="text-3xl font-bold text-primary mb-1">2004</h4>
                  <p className="text-sm text-gray-400 uppercase tracking-widest">Inception</p>
                </div>
                {/* Milestone 2 */}
                <div className="p-6 bg-background rounded-2xl border border-primary/10">
                  <h4 className="text-3xl font-bold text-primary mb-1">5000+</h4>
                  <p className="text-sm text-gray-400 uppercase tracking-widest">Graduates</p>
                </div>
              </div>
            </div>
            {/* Right side: Visual representation of the journey */}
            <div className="order-1 lg:order-2 relative h-[450px] rounded-3xl overflow-hidden group shadow-2xl">
              {/* Image representing history */}
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                alt="Our History" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Bottom gradient and text on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white text-3xl font-bold">A Decade of Excellence</p>
                <p className="text-white/80">Transforming lives through digital literacy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION SECTION --- */}
      {/* Combined section with a modern side-by-side layout */}
      <section className="py-24 px-6 bg-background"> 
        <div className="max-w-7xl mx-auto"> 
          {/* Section heading */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Our Core Purpose</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Guided by a clear vision and a dedicated mission to serve our community.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8"> 
            {/* Mission Card with hover effects and distinct styling */}
            <div className="p-10 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/50 transition-all duration-500 group"> 
              {/* Mission icon */}
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform"> 
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              {/* Mission title */}
              <h3 className="text-3xl font-bold mb-6 text-white">Our Mission</h3> 
              {/* Mission description */}
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                To empower individuals by providing accessible, high-quality computer education that bridges the gap between theoretical knowledge and practical industry demands.
              </p> 
              {/* Key bullet points for mission */}
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400"><span className="text-primary">✔</span> Practical-first approach</li>
                <li className="flex items-center gap-3 text-gray-400"><span className="text-primary">✔</span> Industry-relevant curriculum</li>
                <li className="flex items-center gap-3 text-gray-400"><span className="text-primary">✔</span> Inclusive learning environment</li>
              </ul>
            </div> 

            {/* Vision Card with complementary styling */}
            <div className="p-10 rounded-3xl bg-gradient-to-br from-secondary/50 to-transparent border border-white/5 hover:border-primary/30 transition-all duration-500 group"> 
              {/* Vision icon */}
              <div className="w-16 h-16 bg-secondary/50 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform"> 
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              {/* Vision title */}
              <h3 className="text-3xl font-bold mb-6 text-white">Our Vision</h3> 
              {/* Vision description */}
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                To be the global benchmark in technology education, creating a world where every individual has the digital skills to participate and thrive in the future economy.
              </p> 
              {/* Key bullet points for vision */}
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400"><span className="text-primary">✔</span> Global recognition</li>
                <li className="flex items-center gap-3 text-gray-400"><span className="text-primary">✔</span> Technological leadership</li>
                <li className="flex items-center gap-3 text-gray-400"><span className="text-primary">✔</span> Lifelong learning community</li>
              </ul>
            </div> 
          </div> 
        </div> 
      </section>

      {/* --- CORE VALUES SECTION --- */}
      {/* New section showcasing what we stand for with a grid of cards */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          {/* Section heading - updated to Prevailing */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Our Core Values</h2>
            <p className="text-gray-400">The pillars that support everything we do at Prevailing.</p>
          </div>
          {/* Grid of values */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mapping through value items */}
            {[
              { title: "Integrity", desc: "Honesty and transparency in our teaching and operations.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.48l.343-.333a11.985 11.985 0 005.618-4.016L12 21.48z" },
              { title: "Innovation", desc: "Constant evolution of our methods and curriculum.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86 1.417l-1.885 1.885a2 2 0 01-1.58.79H8a2 2 0 01-2-2v-3a2 2 0 012-2h.729a2 2 0 001.417-.586l1.293-1.293a2 2 0 011.414-.586H15a2 2 0 012 2v.428a2 2 0 00.547 1.022l1.417 1.417a2 2 0 001.022.547l.428.428a2 2 0 010 2.828l-.428.428z" },
              { title: "Excellence", desc: "Striving for the highest quality in every aspect.", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.143-5.714L5 12l5.714-2.143L13 3z" },
              { title: "Community", desc: "Building a supportive network for our students.", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }
            ].map((value, idx) => (
              // Individual value card
              <div key={idx} className="bg-background p-8 rounded-2xl border border-white/5 hover:border-primary/40 transition-all hover:-translate-y-2 group">
                {/* Value icon */}
                <div className="text-primary mb-6">
                  <svg className="w-10 h-10 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={value.icon}></path></svg>
                </div>
                {/* Value title */}
                <h4 className="text-xl font-bold mb-3 text-white">{value.title}</h4>
                {/* Value description */}
                <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      {/* Visual-heavy section explaining our competitive advantages */}
      <section className="py-24 px-6 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side: Feature grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Mapping through feature items */}
              {[
                { title: "Expert Mentors", desc: "Learn from veterans who have built real products.", color: "bg-blue-500" },
                { title: "Live Projects", desc: "Work on actual industry problems, not just exercises.", color: "bg-purple-500" },
                { title: "Flexible Learning", desc: "Day, evening, and weekend batches available.", color: "bg-emerald-500" },
                { title: "Placement Cell", desc: "100% support until you land your dream job.", color: "bg-amber-500" }
              ].map((item, idx) => (
                // Individual feature box
                <div key={idx} className="p-6 rounded-2xl bg-secondary/50 border border-white/5 hover:bg-secondary transition-colors">
                  {/* Color strip decorator */}
                  <div className={`w-2 h-12 ${item.color} rounded-full mb-6`} />
                  {/* Feature title */}
                  <h4 className="text-lg font-bold mb-2 text-white">{item.title}</h4>
                  {/* Feature description */}
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            {/* Right side: Highlighted CTA/Trust card */}
            <div className="bg-primary/10 p-12 rounded-3xl border border-primary/20 backdrop-blur-sm relative">
              {/* Floating rank badge */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary rounded-full flex items-center justify-center rotate-12 shadow-xl animate-bounce">
                <span className="text-white font-black text-xl">Top Rank</span>
              </div>
              {/* Trust card heading */}
              <h3 className="text-4xl font-extrabold text-white mb-8 leading-tight"> 
                The Most Trusted Tech Academy in the Region
              </h3> 
              {/* Trust card description */}
              <p className="text-gray-300 text-lg mb-8 leading-relaxed"> 
                We've built our reputation on the success of our students. Our holistic approach combines technical mastery with soft skills, ensuring you stand out in any interview.
              </p> 
              {/* Sub-link to methods */}
              <Link href="/about" className="flex items-center gap-4 text-primary font-bold group">
                Learn more about our method
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      {/* Refined Team profiles with modern styling and bio snippets */}
      <section className="py-24 px-6 bg-secondary/30"> 
        <div className="max-w-7xl mx-auto"> 
          {/* Section heading */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Our Leadership</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Meet the visionaries dedicated to your success.</p>
          </div>
          {/* Grid of team members */}
          <div className="grid md:grid-cols-3 gap-10"> 
            {/* Mapping through team members */}
            {/* Defining an array of team members with their names, roles, and corrected image paths from the public directory */}
            {[
              { name: "Engr Ifeanyi Iro-Ogaranya", role: "Executive Director", image:  "/assets/gallery/graduation.jpeg" }, // Path corrected to absolute public path
              { name: "Engr Ifeanyi Iro-Ogaranya", role: "Head of Academics", image:  "/assets/gallery/lab.jpeg" }, // Using a different image for variety
              { name: "Charles Chimaobi", role: "Soft Developer & Instructor", image: "/assets/gallery/carles.jpg"} // Using a different image for variety
            ].map((member, idx) => ( // Mapping through each team member to render their profile card
              // Container for each individual team member's card
              <div key={idx} className="group flex flex-col items-center text-center"> 
                {/* Container for the team member's profile image with specific styling and hover effects */}
                <div className="relative w-48 h-48 rounded-[2rem] overflow-hidden mb-8 transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 shadow-2xl"> 
                  {/* Next.js optimized Image component for the team member's photo */}
                  <Image 
                    src={member.image} // Source URL for the image
                    alt={member.name} // Accessibility alt text
                    fill // Fills the parent container
                    className="object-cover" // Ensures the image covers the area without distortion
                  />
                  {/* Hover overlay that appears when the user interacts with the image container */}
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {/* LinkedIn icon or placeholder for social interaction */}
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors">in</div>
                  </div>
                </div> 
                {/* Heading displaying the team member's full name */}
                <h4 className="text-2xl font-bold text-white mb-2">{member.name}</h4> 
                {/* Paragraph displaying the team member's professional role or title */}
                <p className="text-primary font-semibold text-sm uppercase tracking-wider">{member.role}</p> 
              </div> 
            ))}
          </div> 
        </div> 
      </section>
      

      {/* --- GALLERY SECTION --- */}
      {/* A visually appealing gallery showcasing our institute's environment and activities */}
      <section className="py-24 px-6 bg-background relative overflow-hidden"> 
        {/* Container for the gallery content with maximum width alignment */}
        <div className="max-w-7xl mx-auto relative z-10"> 
          {/* Section header for the gallery */}
          <div className="text-center mb-16"> 
            {/* Main title for the gallery section */}
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">School Ads & Annoucemnt</h2> 
            {/* Descriptive subtitle to provide context for the images */}
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">package of what you can do with Our Institute.</p> 
          </div> 
          
          {/* Grid layout for the gallery items - Responsive columns for different screen sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
            {/* Mapping through a predefined list of gallery images to generate the grid items dynamically */}
            {[
              /* First gallery item: representing our modern technological laboratory */
              { id: 1, title: "Modern Tech Lab", src: "/assets/gallery/prev1.jpeg", span: "md:col-span-1" },
              /* Second gallery item: showcasing students working together in a collaborative environment */
              { id: 2, title: "Collaborative Learning", src: "/assets/gallery/prev2.jpeg", span: "md:col-span-1" },
              /* Third gallery item: a celebration of our students' achievements during graduation */
              { id: 3, title: "Graduation Ceremony", src: "/assets/gallery/prev3.jpeg", span: "md:col-span-1" },
              
            
              /* Fifth gallery item: showing the high-quality computer equipment available to students */
              { id: 5, title: "High-End Equipment", src: "/assets/gallery/prev5.jpeg", span: "md:col-span-1" },
              { id: 6, title: "Graduation Ceremony", src: "/assets/gallery/prev6.jpeg", span: "md:col-span-1" },
              
            
              /* Fifth gallery item: showing the high-quality computer equipment available to students */
              { id: 8, title: "High-End Equipment", src: "/assets/gallery/prev8.jpeg", span: "md:col-span-1" },
             
             
              
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
