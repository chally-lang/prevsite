// Enabling client-side rendering for this component as it uses hooks
'use client';

// Importing React hooks for state management and side effects
import { useState, useEffect } from 'react';
// Importing Next.js Image component for optimized image loading
import Image from 'next/image';
// Importing Next.js Link component for navigation
import Link from 'next/link';

// Array of images and alt text to be displayed in the hero carousel
const carouselImages = [
  { url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&auto=format&fit=crop&q=80', alt: 'Computer lab' },
  { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80', alt: 'Teachers and students learning together' },
  { url: 'https://images.unsplash.com/photo-1516534775068-bb57b22e4a21?w=1200&auto=format&fit=crop&q=80', alt: 'Learning computer room' },
  { url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80', alt: 'Hands coding on computer' },
];

// Defining the HeroCarousel functional component
export default function HeroCarousel() {
  // State to track the currently active image index in the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Side effect to automatically rotate carousel images every 5 seconds
  useEffect(() => {
    // Setting up the interval for auto-rotation
    const interval = setInterval(() => {
      // Incrementing index and wrapping around to 0 if at the end
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);
    // Cleaning up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Function to manually switch to a specific slide when a dot is clicked
  const goToSlide = (index: number) => {
    // Setting the current index to the clicked index
    setCurrentIndex(index);
  };

  // Returning the JSX for the Hero section
  return (
    // Relative container for the hero section with dynamic height
    <section className="relative w-full h-96 md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background images container */}
      <div className="absolute inset-0">
        {/* Mapping through images to create slide elements */}
        {carouselImages.map((image, index) => (
          // Individual slide container with transition effects
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
            {/* Optimized background image */}
            <Image src={image.url} alt={image.alt} fill className="object-cover" priority={index === 0} />
          </div>
        ))}
      </div>

      {/* Dark overlay to improve text readability */}
      <div className="absolute inset-0 bg-black/50 z-5"></div>

      {/* Hero content container centered over the images */}
      <div className="relative z-10 text-white text-center px-4 py-32 md:py-0">
        {/* Main headline with heavy drop shadow for contrast */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-xl" style={{textShadow: '0 4px 8px rgba(0,0,0,0.8)'}}>Empowering Digital Skills</h1>
        {/* Sub-headline text - updated from Prevail to Prevailing */}
        <p className="text-xl md:text-2xl mb-10 font-light text-white max-w-3xl mx-auto drop-shadow-lg" style={{textShadow: '0 2px 6px rgba(0,0,0,0.8)'}}>Join Prevailing Computer Institute today and start your journey towards becoming a tech professional!</p>
        {/* Call to action buttons container */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Enrollment link button */}
          <Link href="/register" className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">Enroll Now</Link>
          {/* Secondary about us link button */}
          <Link href="/about" className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm">Learn More</Link>
        </div>
      </div>

      {/* Carousel navigation dots container */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {/* Mapping through images to create clickable dots */}
        {carouselImages.map((_, index) => (
          // Individual navigation dot button
          <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'}`} aria-label={`Go to slide ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}
