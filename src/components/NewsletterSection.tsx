// Enabling client-side features for this React component
'use client';

// Importing the useState hook from React to manage local component state
import { useState } from 'react';

// Defining the NewsletterSection functional component
export default function NewsletterSection() {
  // State hook to store the email address entered by the user
  const [email, setEmail] = useState('');
  // State hook to track the current status of the form submission process
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  // State hook to store and display feedback messages to the user
  const [message, setMessage] = useState('');

  // Async function to handle the newsletter form submission
  const handleSubmit = async (e: React.FormEvent) => {
    // Preventing the default browser form submission behavior
    e.preventDefault();
    
    // Setting the status to loading to show a progress indicator
    setStatus('loading');
    // Clearing any previous feedback messages
    setMessage('');

    try {
      // Sending a POST request to the newsletter API endpoint
      const response = await fetch('/api/newsletter', {
        // Specifying the HTTP method as POST
        method: 'POST',
        // Setting the request headers to indicate JSON content
        headers: {
          'Content-Type': 'application/json',
        },
        // Converting the email state into a JSON string for the request body
        body: JSON.stringify({ email }),
      });

      // Variable to hold the parsed JSON response data
      let data;
      try {
        // Attempting to parse the response body as JSON
        data = await response.json();
      } catch (parseError) {
        // Logging an error if the response is not valid JSON
        console.error("Failed to parse response as JSON:", parseError);
        // Throwing an error to be caught by the outer catch block
        throw new Error("The server returned an invalid response. Please try again later.");
      }

      // Checking if the server responded with a success status code
      if (response.ok) {
        // Updating status to success
        setStatus('success');
        // Setting the success message from the API or a default message
        setMessage(data.message || 'Thank you for subscribing!');
        // Clearing the email input field upon successful subscription
        setEmail('');
      } else {
        // Updating status to error if the API returned an error
        setStatus('error');
        // Setting the error message from the API or a default fallback
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error: any) {
      // Catching any network errors or unexpected exceptions
      console.error("Newsletter submission error:", error);
      // Updating status to error
      setStatus('error');
      // Setting a user-friendly error message
      setMessage(error.message || 'Failed to connect to the server. Please try again later.');
    }
  };

  // Returning the JSX for the Newsletter section
  return (
    // Section wrapper with background color, padding, and relative positioning
    <section className="py-24 px-4 bg-gray-900 relative overflow-hidden">
      {/* Container for decorative background blur elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        {/* Top-left blue blur decoration */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]"></div>
        {/* Bottom-right purple blur decoration */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[120px]"></div>
      </div>

      {/* Main content container centered with a limited width */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Newsletter badge displayed above the title */}
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-wider">
          Newsletter
        </div>
        
        {/* Main section title with a highlighted word */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
          Stay Ahead in <span className="text-blue-500">Technology</span>
        </h2>
        
        {/* Section description explaining the benefits of subscribing */}
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Subscribe to our newsletter and get the latest updates on courses, tech trends, and exclusive student success stories delivered directly to your inbox.
        </p>

        {/* Subscription form element */}
        <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
          {/* Flexbox container for input and button */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Email input field */}
            <input
              // Setting input type to email for basic browser validation
              type="email"
              // Binding the input value to the email state
              value={email}
              // Updating the email state as the user types
              onChange={(e) => setEmail(e.target.value)}
              // Placeholder text for the input
              placeholder="Enter your email address"
              // Making the field required
              required
              // Applying styles and transitions for the input
              className="flex-grow px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg"
              // Disabling the input while the form is submitting
              disabled={status === 'loading'}
            />
            {/* Submit button */}
            <button
              // Setting button type to submit
              type="submit"
              // Disabling the button while the form is submitting
              disabled={status === 'loading'}
              // Applying styles and hover effects for the button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap text-lg"
            >
              {/* Conditional button text based on submission status */}
              {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </div>

          {/* Conditional rendering for feedback messages */}
          {message && (
            // Feedback message container with dynamic classes based on success or error
            <div 
              className={`mt-6 p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${
                status === 'success' 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {/* Displaying the feedback message text */}
              {message}
            </div>
          )}
        </form>

        {/* Footnote text below the subscription form */}
        <p className="mt-8 text-gray-500 text-sm">
          Join 5,000+ students already learning with us. No spam, ever.
        </p>
      </div>
    </section>
  );
}
