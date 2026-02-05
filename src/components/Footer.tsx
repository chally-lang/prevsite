// Importing Link component from Next.js for client-side navigation
import Link from 'next/link';

// Defining the Footer component to be used across the application
export default function Footer() {
  // Returning the JSX structure for the footer
  return (
    // Footer element with background color, top border, and auto top margin to push it down
    <footer className="bg-secondary border-t border-white/10 mt-auto">
      {/* Container to center content and apply padding for different screen sizes */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Grid layout for footer sections, switching from 1 to 4 columns on medium screens */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Main info section spanning 1 column normally and 2 columns on medium screens */}
          <div className="col-span-1 md:col-span-2">
            {/* Institute name heading - updated to Prevailing */}
            <h3 className="text-xl font-bold text-white mb-4">Prevailing Computer Institute</h3>
            {/* Short description of the institute's mission */}
            <p className="text-gray-400 max-w-md">
              Empowering students with cutting-edge computer education. Join us to master the skills of tomorrow.
            </p>
          </div>
          {/* Quick links navigation section */}
          <div>
            {/* Heading for quick links section */}
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Quick Links</h3>
            {/* List of navigational links */}
            <ul className="space-y-4">
              <li>
                {/* Link to the About Us page */}
                <Link href="/about" className="text-base text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                {/* Link to the Courses page */}
                <Link href="/courses" className="text-base text-gray-400 hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                {/* Link to the Blog page */}
                <Link href="/blog" className="text-base text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          {/* Legal links section */}
          <div>
            {/* Heading for legal information section */}
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Legal</h3>
            {/* List of legal document links */}
            <ul className="space-y-4">
              <li>
                {/* Link to Privacy Policy */}
                <Link href="#" className="text-base text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                {/* Link to Terms of Service */}
                <Link href="#" className="text-base text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom bar of the footer with copyright information */}
        <div className="mt-8 border-t border-white/10 pt-8">
          {/* Copyright text with dynamic current year - updated to Prevailing */}
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Prevailing Computer Institute. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
