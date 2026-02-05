// Enabling client-side rendering features for this Next.js component
"use client"; 

// Importing Link from Next.js for efficient client-side routing
import Link from 'next/link'; 
// Importing session management and sign-out utilities from NextAuth
import { useSession, signOut } from "next-auth/react"; 
// Importing the useState hook from React to manage the mobile menu's visibility
import { useState } from 'react'; 

// Exporting the Navbar functional component
export default function Navbar() {
  // Destructuring session data from the useSession hook
  const { data: session } = useSession(); 
  // Initializing state for the mobile menu toggle (open or closed)
  const [isOpen, setIsOpen] = useState(false); 

  // Returning the JSX structure for the navigation bar
  return (
    // Navigation wrapper with glassmorphism effect, bottom border, and sticky positioning
    <nav className="bg-secondary/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"> 
      {/* Centered container with responsive horizontal padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
        {/* Main flex container to space out logo, desktop links, and mobile toggle */}
        <div className="flex items-center justify-between h-16"> 
          {/* Logo container area */}
          <div className="flex items-center"> 
            {/* Link to the home page containing the institute name */}
            <Link href="/" className="text-2xl font-bold text-white"> 
              {/* The brand name updated to reflect the new identity */}
              Prevailing Computers
            </Link>
          </div>
          {/* Desktop-only navigation menu (hidden on small screens) */}
          <div className="hidden md:block"> 
            {/* Horizontal list of navigation links with specified spacing */}
            <div className="ml-10 flex items-baseline space-x-4"> 
              {/* Link to the Home page */}
              <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"> 
                Home
              </Link>
              {/* Link to the About Us page */}
              <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"> 
                About
              </Link>
              {/* Link to the Courses page */}
              <Link href="/courses" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"> 
                Courses
              </Link>
              {/* Link to the Blog page */}
              <Link href="/blog" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"> 
                Blog
              </Link>
               {/* Link to the Blog page */}
               <Link href="/gallery" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"> 
                Gallery
              </Link>
              {/* Link to the Contact Us page */}
              <Link href="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"> 
                Contact Us
              </Link>
            </div>
          </div>
          {/* Authentication action buttons (hidden on mobile) */}
          <div className="hidden md:block"> 
            {/* Wrapper for login/register or dashboard/logout buttons */}
            <div className="ml-4 flex items-center md:ml-6 space-x-4"> 
              {/* Conditional rendering based on user session status */}
              {session ? ( 
                // Grouping links for logged-in users
                <>
                  {/* Link to user's personalized dashboard */}
                  <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"> 
                    Dashboard
                  </Link>
                  {/* Logout button with sign-out logic and redirection */}
                  <button 
                    onClick={() => signOut({ callbackUrl: "/" })} 
                    className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : ( 
                // Grouping links for guests
                <>
                  {/* Link to the login page */}
                  <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"> 
                    Login
                  </Link>
                  {/* Link to the registration page with primary brand styling */}
                  <Link href="/register" className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"> 
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Toggle button for the mobile menu (only visible on mobile) */}
          <div className="md:hidden flex items-center"> 
            {/* Button element that toggles the isOpen state */}
            <button
              onClick={() => setIsOpen(!isOpen)} 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
              aria-expanded="false"
            >
              {/* Invisible label for accessibility */}
              <span className="sr-only">Open main menu</span> 
              {/* Conditional rendering of the icon based on menu state */}
              {!isOpen ? ( 
                // Hamburger icon shown when menu is closed
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : ( 
                // Close icon shown when menu is open
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-specific navigation menu, toggled via state */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-secondary border-b border-white/10`}> 
        {/* Vertical list of mobile-friendly links with vertical spacing */}
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"> 
          {/* Mobile Home link */}
          <Link href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={() => setIsOpen(false)}> 
            Home
          </Link>
          {/* Mobile About link */}
          <Link href="/about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={() => setIsOpen(false)}> 
            About
          </Link>
          {/* Mobile Courses link */}
          <Link href="/courses" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={() => setIsOpen(false)}> 
            Courses
          </Link>
          {/* Mobile Blog link */}
          <Link href="/blog" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={() => setIsOpen(false)}> 
            Blog
          </Link>
           {/* Mobile Blog link */}
           <Link href="/gallery" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={() => setIsOpen(false)}> 
            Gallery
          </Link>
          {/* Mobile Contact Us link */}
          <Link href="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={() => setIsOpen(false)}> 
            Contact Us
          </Link>
          {/* Conditional rendering for authenticated mobile actions */}
          {session ? ( 
            // Wrapper for logged-in mobile links
            <>
              {/* Mobile Dashboard link */}
              <Link href="/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={() => setIsOpen(false)}> 
                Dashboard
              </Link>
              {/* Mobile logout button with full width */}
              <button 
                onClick={() => {
                  signOut({ callbackUrl: "/" }); 
                  setIsOpen(false); 
                }} 
                className="w-full text-left bg-primary hover:bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : ( 
            // Top border and container for mobile guest actions
            <div className="pt-4 pb-3 border-t border-white/10"> 
              {/* Mobile Login link */}
              <Link href="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={() => setIsOpen(false)}> 
                Login
              </Link>
              {/* Mobile Register link with primary styling and centering */}
              <Link href="/register" className="mt-1 bg-primary hover:bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors text-center" onClick={() => setIsOpen(false)}> 
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
