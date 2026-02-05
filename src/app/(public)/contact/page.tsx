"use client"; // Enabling client-side features for this Next.js page component
// Importing the Image component from Next.js for optimized image rendering
import Image from 'next/image'; 
// Importing Link from Next.js for internal navigation
import Link from 'next/link';
// Importing React hooks for form handling
import { useState } from 'react';

// Exporting the ContactPage component as the default export for this route
export default function ContactPage() { 
  // State for managing form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for managing form response message
  const [formMessage, setFormMessage] = useState('');
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    // Preventing default form submission behavior
    e.preventDefault(); 
    // Setting loading state to true
    setIsSubmitting(true); 
    
    try {
      // Sending the form data to the API endpoint
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Displaying success message
        setFormMessage('Thank you! Your message has been sent successfully.'); 
        // Clearing the form data
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Handling error message from the API
        setFormMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormMessage('Failed to send message. Please check your connection.');
    } finally {
      // Setting loading state back to false
      setIsSubmitting(false); 
    }
  };

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Returning the JSX structure of the redesigned Contact Us page
  return ( 
    // Main container with minimum full screen height and top padding for the fixed header
    <main className="min-h-screen pt-20 bg-background text-foreground overflow-x-hidden"> 
      
      {/* --- HERO SECTION --- */}
      {/* Hero Section Container with centered content and dark theme */}
      <section className="relative py-24 flex items-center justify-center text-white overflow-hidden bg-secondary/50"> 
        {/* Animated background background decoration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Top-left animated blur effect */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          {/* Bottom-right animated blur effect */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>
        
        {/* Hero content container centered relative to the overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center"> 
          {/* Small badge-like text above the main heading */}
          <span className="inline-block py-1 px-4 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-semibold tracking-widest uppercase mb-6 animate-fade-in">
            Get In Touch
          </span>
          {/* Main heading with bold typography and gradient text effect */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight animate-fade-in-up">
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Conversation</span>
          </h1> 
          {/* Hero description with improved line height for better readability */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            Have questions about our courses or admissions? Our team is here to help you navigate your journey into the world of technology.
          </p> 
        </div>
      </section>

      {/* --- CONTACT INFO CARDS --- */}
      {/* Grid of information cards for quick access to contact details */}
      <section className="py-12 px-6 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          {/* Grid container for contact info cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Physical Address */}
            <div className="bg-background/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl hover:border-primary/40 transition-all group">
              {/* Icon for location */}
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              {/* Location heading */}
              <h3 className="text-lg font-bold text-white mb-2">Our Location</h3>
              {/* Address details */}
              <p className="text-gray-400 text-sm leading-relaxed">30 Ohafia Street, Umuahia, Abia State Nigeria</p>
            </div>

            {/* Card 2: Phone Numbers */}
            <div className="bg-background/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl hover:border-primary/40 transition-all group">
              {/* Icon for phone */}
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              {/* Phone heading */}
              <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
              {/* Phone number details */}
              <p className="text-gray-400 text-sm leading-relaxed">+234 8064305760<br/>+234 8055681843</p>
            </div>

            {/* Card 3: Email Addresses - updated to prevailing.edu */}
            <div className="bg-background/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl hover:border-primary/40 transition-all group">
              {/* Icon for email */}
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              {/* Email heading */}
              <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
              {/* Email address details */}
              <p className="text-gray-400 text-sm leading-relaxed">info@prevailing.edu<br/>admissions@prevailing.edu</p>
            </div>

            {/* Card 4: Working Hours */}
            <div className="bg-background/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl hover:border-primary/40 transition-all group">
              {/* Icon for working hours */}
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              {/* Hours heading */}
              <h3 className="text-lg font-bold text-white mb-2">Office Hours</h3>
              {/* Working hours details */}
              <p className="text-gray-400 text-sm leading-relaxed">Mon - Fri: 9am - 6pm<br/>Sat: 10am - 5pm</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT FORM & MAP SECTION --- */}
      {/* Two-column layout for the form and a map visual */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Contact Form */}
            <div className="bg-secondary/10 backdrop-blur-sm p-10 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Send us a Message</h2>
                <p className="text-gray-400 text-lg">We typically respond within 24 hours.</p>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Input Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-background/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-gray-600"
                    />
                  </div>
                  {/* Email Input Field (Optional) */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-background/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Subject Input Field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300 ml-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full bg-background/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-gray-600"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Your Message</label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full bg-background/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-gray-600 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </>
                  )}
                </button>

                {/* Form Status Message */}
                {formMessage && (
                  <div className={`p-4 rounded-xl text-center text-sm font-medium animate-fade-in ${
                    formMessage.includes('successfully') 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {formMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Right Column: Information & Visual */}
            <div className="lg:pt-12 space-y-12">
              <div>
                <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">Why reach out to us?</h2>
                <div className="space-y-6">
                  {[
                    { title: "Expert Guidance", desc: "Get personalized advice from our experienced instructors." },
                    { title: "Quick Response", desc: "Our dedicated support team is always ready to assist you." },
                    { title: "Campus Tours", desc: "Schedule a visit to see our state-of-the-art facilities." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5 group">
                      <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Element / Image */}
              <div className="relative rounded-[2.5rem] overflow-hidden group aspect-video lg:aspect-square">
                <Image 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                  alt="Student collaboration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                  <p className="text-white font-medium italic">"The instructors here are incredibly helpful and the community is very supportive."</p>
                  <p className="text-primary mt-2 font-bold">- Sarah J., Web Dev Student</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      {/* Accordion-style layout for frequently asked questions */}
      <section className="py-24 px-6 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          {/* FAQ heading container */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Common Questions</h2>
            <p className="text-gray-400">Everything you need to know before reaching out.</p>
          </div>
          {/* List of FAQ items */}
          <div className="space-y-4">
            {[
              { q: "How do I apply for a course?", a: "You can apply directly through our website by visiting the courses page and selecting 'Enroll Now', or visit our campus for assistance." },
              { q: "Are there any scholarship opportunities?", a: "Yes, we offer merit-based scholarships and financial aid for eligible students. Contact our admissions office for details." },
              { q: "Do you offer online classes?", a: "We provide hybrid learning options including both in-person practical sessions and live online lectures." }
            ].map((faq, idx) => (
              // Individual FAQ box
              <div key={idx} className="bg-background/50 border border-white/5 p-8 rounded-3xl hover:border-primary/20 transition-colors">
                {/* Question text */}
                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                  <span className="text-primary font-black">Q.</span> {faq.q}
                </h4>
                {/* Answer text */}
                <p className="text-gray-400 text-sm leading-relaxed pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      {/* Final nudge section */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary/10 border border-primary/20 p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
            {/* Background blur for the CTA box */}
            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 pointer-events-none" />
            {/* CTA Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 relative z-10">Ready to transform your future?</h2>
            {/* CTA link to registration */}
            <Link href="/register" className="inline-block py-4 px-10 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/30 relative z-10">
              Start Your Journey Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
